const { generateInvoicePdf } = require("../lib/invoice-pdf");

async function fetchRegistrationBySubmissionId(submissionId) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY for invoice lookup.");
  }

  const url = new URL(`${supabaseUrl}/rest/v1/registrations`);
  url.searchParams.set("submission_id", `eq.${submissionId}`);
  url.searchParams.set("select", "*");
  url.searchParams.set("limit", "1");

  const response = await fetch(url, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`
    }
  });

  const rows = await response.json().catch(() => []);
  if (!response.ok) {
    throw new Error(rows.message || "Unable to load registration for invoice generation.");
  }

  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("Registration not found.");
  }

  return rows[0];
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false, message: "Method not allowed." });
    return;
  }

  const adminToken = process.env.INVOICE_ADMIN_TOKEN || "";
  const providedToken = req.headers["x-invoice-admin-token"] || req.headers.authorization?.replace(/^Bearer\s+/i, "") || "";

  if (!adminToken || providedToken !== adminToken) {
    res.status(401).json({ ok: false, message: "Unauthorized invoice generation request." });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const registration = body.registration || (body.submissionId ? await fetchRegistrationBySubmissionId(body.submissionId) : null);

    if (!registration) {
      res.status(400).json({ ok: false, message: "registration or submissionId is required." });
      return;
    }

    const pdfBytes = await generateInvoicePdf(registration, body.clientSlug || "bnyc-qingdao");
    const fileName = `${registration.submission_id || body.submissionId || "invoice"}-invoice.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.status(200).send(Buffer.from(pdfBytes));
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message || "Unable to generate invoice PDF."
    });
  }
};
