const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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

app.get("/api/submissions", (_req, res) => {
  const raw = fs.readFileSync(submissionsPath, "utf8");
  res.type("application/json").send(raw);
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
