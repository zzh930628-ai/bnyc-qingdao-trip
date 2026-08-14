const fs = require("fs");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const { getInvoiceConfig } = require("./invoice-config");

function formatDate(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
}

function formatMoney(amount, currency) {
  const value = Number(amount || 0);
  return `${currency} ${value.toFixed(2)}`;
}

function sanitizeText(value) {
  return String(value || "-").replace(/[\r\n]+/g, " ").trim() || "-";
}

function getRegistrationDescription(registration, config) {
  const lines = [
    `${config.programmeName} Registration`,
    `Full Name / Company Name: ${sanitizeText(registration.invoice_name || registration.full_name)}`,
    `Email Address: ${sanitizeText(registration.email)}`,
    `Contact Number: ${sanitizeText(registration.contact_number)}`,
    `Booking Reference: ${sanitizeText(registration.submission_id)}`,
    `Programme Date(s): 20-24 September 2026`
  ];

  if (registration.company_designation) {
    lines.splice(1, 0, `Company / Designation: ${sanitizeText(registration.company_designation)}`);
  }

  return lines;
}

async function embedLogo(pdfDoc, config) {
  if (!config.logoPath || !fs.existsSync(config.logoPath)) {
    return null;
  }

  const imageBytes = fs.readFileSync(config.logoPath);
  const lowerPath = config.logoPath.toLowerCase();
  if (lowerPath.endsWith(".jpg") || lowerPath.endsWith(".jpeg")) {
    return pdfDoc.embedJpg(imageBytes);
  }
  return pdfDoc.embedPng(imageBytes);
}

function drawWrappedText(page, text, options) {
  const {
    font,
    fontSize,
    color,
    x,
    y,
    lineHeight,
    maxWidth
  } = options;

  const words = String(text || "").split(/\s+/);
  let line = "";
  let cursorY = y;

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
      line = candidate;
      continue;
    }

    if (line) {
      page.drawText(line, { x, y: cursorY, font, size: fontSize, color });
      cursorY -= lineHeight;
    }
    line = word;
  }

  if (line) {
    page.drawText(line, { x, y: cursorY, font, size: fontSize, color });
    cursorY -= lineHeight;
  }

  return cursorY;
}

async function generateInvoicePdf(registration, clientSlug) {
  const config = getInvoiceConfig(clientSlug);
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const logo = await embedLogo(pdfDoc, config);
  const black = rgb(0, 0, 0);
  const gray = rgb(0.35, 0.35, 0.35);
  const lightGray = rgb(0.93, 0.93, 0.93);
  const borderGray = rgb(0.75, 0.75, 0.75);

  page.drawText(config.invoiceTitle, {
    x: 50,
    y: 540,
    font: fontBold,
    size: 24,
    color: black
  });

  if (logo) {
    const scaled = logo.scale(0.42);
    page.drawImage(logo, {
      x: 640,
      y: 506,
      width: scaled.width,
      height: scaled.height
    });
  }

  page.drawRectangle({ x: 32, y: 374, width: 778, height: 168, color: lightGray, borderColor: borderGray, borderWidth: 1 });
  page.drawRectangle({ x: 32, y: 520, width: 778, height: 22, color: rgb(0.82, 0.82, 0.82), borderColor: borderGray, borderWidth: 1 });
  page.drawText("Summary", { x: 40, y: 526, font, size: 11, color: black });

  const paymentDate = formatDate(registration.created_at || registration.createdAt);
  const refNumber = sanitizeText(registration.submission_id || registration.submissionId);
  const invoiceNumber = refNumber;
  const total = Number(registration.amount_sgd || config.amount || config.unitAmount || 0);
  const summaryRows = [
    ["Payment Date:", paymentDate],
    ["Total Value:", formatMoney(total, config.currency)],
    ["Payment Processed:", formatMoney(total, config.currency)],
    ["Payment/Invoice No:", invoiceNumber],
    ["Ref Number:", refNumber],
    ["Payment Method:", sanitizeText(config.paymentMethod)]
  ];

  let summaryY = 490;
  for (const [label, value] of summaryRows) {
    page.drawText(label, { x: 48, y: summaryY, font: fontBold, size: 10.5, color: black });
    page.drawText(value, { x: 265, y: summaryY, font, size: 10.5, color: black });
    summaryY -= 22;
  }

  const companyLines = [
    config.companyDisplayName,
    ...config.companyAddress,
    `${config.companyIdLabel} ${config.companyIdValue}`
  ];
  let companyY = 492;
  for (const line of companyLines) {
    const width = font.widthOfTextAtSize(line, 10.5);
    page.drawText(line, { x: 798 - width, y: companyY, font, size: 10.5, color: black });
    companyY -= 22;
  }

  page.drawRectangle({ x: 32, y: 105, width: 778, height: 236, color: lightGray, borderColor: borderGray, borderWidth: 1 });
  page.drawRectangle({ x: 32, y: 318, width: 778, height: 23, color: rgb(0.82, 0.82, 0.82), borderColor: borderGray, borderWidth: 1 });
  page.drawText("Receipt Description", { x: 40, y: 324, font, size: 11, color: black });
  page.drawText("Quantity", { x: 456, y: 324, font, size: 11, color: black });
  page.drawText("Unit Amount", { x: 592, y: 324, font, size: 11, color: black });
  page.drawText("Amount", { x: 768, y: 324, font, size: 11, color: black });

  const descriptionLines = getRegistrationDescription(registration, config);
  let descY = 292;
  for (const line of descriptionLines) {
    descY = drawWrappedText(page, line, {
      font,
      fontSize: 10,
      color: black,
      x: 40,
      y: descY,
      lineHeight: 18,
      maxWidth: 360
    });
  }

  page.drawText("1", { x: 492, y: 292, font, size: 10.5, color: black });
  page.drawText(formatMoney(config.unitAmount || total, config.currency), { x: 610, y: 292, font, size: 10.5, color: black });
  page.drawText(formatMoney(total, config.currency), { x: 764 - font.widthOfTextAtSize(formatMoney(total, config.currency), 10.5), y: 292, font, size: 10.5, color: black });

  page.drawText("Total Amount Before GST", { x: 40, y: 164, font, size: 10.5, color: black });
  page.drawText(formatMoney(total, config.currency), { x: 764 - font.widthOfTextAtSize(formatMoney(total, config.currency), 10.5), y: 164, font, size: 10.5, color: black });
  page.drawText("* Subject to GST (9%)", { x: 40, y: 142, font, size: 10.5, color: black });
  page.drawText(formatMoney(0, config.currency), { x: 764 - font.widthOfTextAtSize(formatMoney(0, config.currency), 10.5), y: 142, font, size: 10.5, color: black });
  page.drawText("Total Amount", { x: 40, y: 120, font: fontBold, size: 10.5, color: black });
  page.drawText(formatMoney(total, config.currency), { x: 764 - fontBold.widthOfTextAtSize(formatMoney(total, config.currency), 10.5), y: 120, font: fontBold, size: 10.5, color: black });

  page.drawText("This is a system generated document. No signature is required. All amounts in SGD.", {
    x: 32,
    y: 84,
    font,
    size: 9.5,
    color: black
  });
  page.drawText("*Subject to GST 9% | ^ Out of Scope for GST | #Zero Rated for GST", {
    x: 32,
    y: 64,
    font,
    size: 8,
    color: gray
  });

  return pdfDoc.save();
}

module.exports = {
  generateInvoicePdf
};
