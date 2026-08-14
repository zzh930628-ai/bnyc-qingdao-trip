const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { generateInvoicePdf } = require("./lib/invoice-pdf");

const app = express();
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, "public");
const uploadsDir = path.join(__dirname, "uploads");
const dataDir = path.join(__dirname, "data");
const submissionsPath = path.join(dataDir, "submissions.json");

for (const dir of [publicDir, uploadsDir, dataDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

if (!fs.existsSync(submissionsPath)) {
  fs.writeFileSync(submissionsPath, "[]\n", "utf8");
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const stamp = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname || "").toLowerCase();
    cb(null, `${stamp}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = new Set([
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf"
    ]);

    if (allowedTypes.has(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(new Error("Only JPG, PNG, WEBP, and PDF files are allowed."));
  }
});

app.use(express.static(publicDir));
app.use("/uploads", express.static(uploadsDir));
app.use(express.json({ limit: "1mb" }));

app.get("/api/submissions", (_req, res) => {
  const raw = fs.readFileSync(submissionsPath, "utf8");
  res.type("application/json").send(raw);
});

app.get("/api/admin-registrations", (req, res) => {
  const adminToken = process.env.INVOICE_ADMIN_TOKEN || "";
  const providedToken = req.headers["x-invoice-admin-token"] || (req.headers.authorization || "").replace(/^Bearer\s+/i, "");

  if (!adminToken || providedToken !== adminToken) {
    res.status(401).json({
      ok: false,
      message: "Unauthorized registration list request."
    });
    return;
  }

  const current = JSON.parse(fs.readFileSync(submissionsPath, "utf8"));
  const rows = current.map((item) => ({
    submission_id: item.submission_id || item.id,
    created_at: item.created_at || item.createdAt,
    full_name: item.full_name || item.fullName,
    email: item.email,
    contact_number: item.contact_number || item.contactNumber,
    company_designation: item.company_designation || item.companyDesignation,
    require_invoice: item.require_invoice || item.requireInvoice,
    invoice_name: item.invoice_name || item.invoiceName,
    status: item.status,
    trip_name: item.trip_name || item.tripName
  }));

  res.json({ ok: true, registrations: rows });
});

app.post("/api/generate-invoice", async (req, res) => {
  try {
    const adminToken = process.env.INVOICE_ADMIN_TOKEN || "";
    const providedToken = req.headers["x-invoice-admin-token"] || (req.headers.authorization || "").replace(/^Bearer\s+/i, "");

    if (!adminToken || providedToken !== adminToken) {
      res.status(401).json({
        ok: false,
        message: "Unauthorized invoice generation request."
      });
      return;
    }

    const body = req.body || {};
    const current = JSON.parse(fs.readFileSync(submissionsPath, "utf8"));
    const registration = body.registration || current.find((item) => item.id === body.submissionId || item.submission_id === body.submissionId);

    if (!registration) {
      res.status(404).json({
        ok: false,
        message: "Registration not found for invoice generation."
      });
      return;
    }

    const normalizedRegistration = {
      submission_id: registration.submission_id || registration.id,
      created_at: registration.created_at || registration.createdAt,
      amount_sgd: registration.amount_sgd || registration.amountSgd,
      full_name: registration.full_name || registration.fullName,
      invoice_name: registration.invoice_name || registration.invoiceName,
      email: registration.email,
      contact_number: registration.contact_number || registration.contactNumber,
      company_designation: registration.company_designation || registration.companyDesignation
    };

    const pdfBytes = await generateInvoicePdf(normalizedRegistration, body.clientSlug || "bnyc-qingdao");
    const fileName = `${normalizedRegistration.submission_id}-invoice.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message || "Unable to generate invoice PDF."
    });
  }
});

app.post("/api/register", upload.single("paymentProof"), (req, res) => {
  try {
    const requiredFields = [
      "fullName",
      "email",
      "contactNumber",
      "companyDesignation",
      "requireInvoice"
    ];

    const missing = requiredFields.filter((field) => !String(req.body[field] || "").trim());
    if (missing.length > 0) {
      res.status(400).json({
        ok: false,
        message: `Missing required fields: ${missing.join(", ")}`
      });
      return;
    }

    if (req.body.requireInvoice === "Yes" && !String(req.body.invoiceName || "").trim()) {
      res.status(400).json({
        ok: false,
        message: "Invoice name is required when invoice is requested."
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        ok: false,
        message: "Payment proof is required."
      });
      return;
    }

    const current = JSON.parse(fs.readFileSync(submissionsPath, "utf8"));
    const submission = {
      id: `REG-${Date.now()}`,
      createdAt: new Date().toISOString(),
      tripName: "BNYC China Immersion Trip-Qingdao",
      amountSgd: 1600,
      payee: "Sing-China",
      ...req.body,
      paymentProof: {
        originalName: req.file.originalname,
        storedName: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    };

    current.unshift(submission);
    fs.writeFileSync(submissionsPath, JSON.stringify(current, null, 2) + "\n", "utf8");

    res.json({
      ok: true,
      message: "Registration submitted successfully.",
      submissionId: submission.id
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message || "Unable to save registration."
    });
  }
});

app.use((error, _req, res, _next) => {
  res.status(400).json({
    ok: false,
    message: error.message || "Request failed."
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
