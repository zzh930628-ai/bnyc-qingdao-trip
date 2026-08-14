function getClientTripName(clientSlug) {
  const tripNames = {
    "bnyc-qingdao": "BNYC Qingdao Trip",
    "business-china-ylp-shenzhen": "Business China YLP Immersion Programme - Shenzhen"
  };

  return tripNames[clientSlug] || tripNames["bnyc-qingdao"];
}

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ ok: false, message: "Method not allowed." });
    return;
  }

  const adminToken = process.env.INVOICE_ADMIN_TOKEN || "";
  const providedToken = req.headers["x-invoice-admin-token"] || req.headers.authorization?.replace(/^Bearer\s+/i, "") || "";

  if (!adminToken || providedToken !== adminToken) {
    res.status(401).json({ ok: false, message: "Unauthorized registration list request." });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!supabaseUrl || !serviceRoleKey) {
    res.status(500).json({ ok: false, message: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY." });
    return;
  }

  try {
    const clientSlug = String(req.query.clientSlug || "bnyc-qingdao");
    const tripName = getClientTripName(clientSlug);
    const limit = Math.min(Math.max(Number(req.query.limit || 30), 1), 100);

    const url = new URL(`${supabaseUrl}/rest/v1/registrations`);
    url.searchParams.set("select", "submission_id,created_at,full_name,email,contact_number,company_designation,require_invoice,invoice_name,status,trip_name");
    url.searchParams.set("trip_name", `eq.${tripName}`);
    url.searchParams.set("order", "created_at.desc");
    url.searchParams.set("limit", String(limit));

    const response = await fetch(url, {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`
      }
    });

    const rows = await response.json().catch(() => []);
    if (!response.ok) {
      throw new Error(rows.message || "Unable to load registrations from Supabase.");
    }

    res.status(200).json({
      ok: true,
      registrations: Array.isArray(rows) ? rows : []
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message || "Unable to load registrations."
    });
  }
};
