const form = document.getElementById("registrationForm");
const submitButton = document.getElementById("submitButton");
const formMessage = document.getElementById("formMessage");
const isFilePreview = window.location.protocol === "file:";
const invoiceInputs = Array.from(document.querySelectorAll('input[name="requireInvoice"]'));
const invoiceNameInput = document.querySelector('input[name="invoiceName"]');
const appConfig = window.APP_CONFIG || {};
const clientConfig = window.ACTIVE_CLIENT_CONFIG || window.getClientConfig?.(window.DEFAULT_CLIENT_SLUG) || null;
const supabaseUrl = appConfig.supabaseUrl || "";
const supabaseAnonKey = appConfig.supabaseAnonKey || "";
const supabaseBucket = appConfig.supabaseBucket || "payment-proofs";
const supabaseClient =
  supabaseUrl && supabaseAnonKey && window.supabase
    ? window.supabase.createClient(supabaseUrl, supabaseAnonKey)
    : null;

function setText(id, value) {
  const element = document.getElementById(id);
  if (element && typeof value === "string") {
    element.textContent = value;
  }
}

function resolveAssetPath(src) {
  if (typeof src !== "string" || src.length === 0) {
    return src;
  }

  if (window.location.protocol === "file:" && src.startsWith("/")) {
    return `.${src}`;
  }

  return src;
}

function setImage(id, src, alt) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  if (!src) {
    element.hidden = true;
    return;
  }

  element.hidden = false;

  element.src = resolveAssetPath(src);

  if (alt) {
    element.alt = alt;
  }
}

function renderTextList(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(items)) {
    return;
  }

  container.innerHTML = "";
  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    container.appendChild(listItem);
  });
}

function renderItinerary(items) {
  const container = document.getElementById("itineraryList");
  if (!container || !Array.isArray(items)) {
    return;
  }

  container.innerHTML = "";
  items.forEach((item) => {
    const article = document.createElement("article");
    const heading = document.createElement("h4");
    heading.textContent = item.title || "";
    article.appendChild(heading);

    if (item.description) {
      const description = document.createElement("p");
      description.textContent = item.description;
      article.appendChild(description);
    }

    container.appendChild(article);
  });
}

function renderBankTransfer(bankTransfer) {
  const card = document.getElementById("paymentBankTransfer");
  if (!card) {
    return;
  }

  if (!bankTransfer) {
    card.hidden = true;
    return;
  }

  card.hidden = false;
  setText("bankTransferTitle", bankTransfer.title || "Bank Transfer");
  setText("bankTransferIntro", bankTransfer.intro || "");
  setText("bankTransferAccountHolderLabel", bankTransfer.accountHolderLabel || "Name of Account Holder");
  setText("bankTransferAccountHolderValue", bankTransfer.accountHolderValue || "-");
  setText("bankTransferBankNameLabel", bankTransfer.bankNameLabel || "Bank Name");
  setText("bankTransferBankNameValue", bankTransfer.bankNameValue || "-");
  setText("bankTransferAccountNumberLabel", bankTransfer.accountNumberLabel || "Bank Account No");
  setText("bankTransferAccountNumberValue", bankTransfer.accountNumberValue || "-");
  setText("bankTransferSwiftCodeLabel", bankTransfer.swiftCodeLabel || "SWIFT Code");
  setText("bankTransferSwiftCodeValue", bankTransfer.swiftCodeValue || "-");
}

function renderPaymentExtraInfo(payment) {
  const uenRow = document.getElementById("paymentUenRow");
  if (!uenRow) {
    return;
  }

  if (!payment?.uenValue) {
    uenRow.hidden = true;
    return;
  }

  uenRow.hidden = false;
  setText("paymentUenLabel", `${payment.uenLabel || "UEN"}:`);
  setText("paymentUenValue", payment.uenValue);
}

function applyClientContent(config) {
  if (!config) {
    return;
  }

  const { brand, programme, payment, registration } = config;
  document.title = programme.pageTitle || document.title;
  setText("brandName", brand.name);
  setText("brandSubtitle", brand.subtitle);
  setImage("brandLogo", brand.logoSrc, brand.logoAlt);

  setImage("programmePoster", programme.posterSrc, programme.posterAlt);
  setText("itinerary-title", programme.itineraryTitle);
  renderItinerary(programme.itineraryItems);

  setText("programmeEyebrow", programme.eyebrow);
  setText("programmeName", programme.name);
  setText("programmePrice", programme.priceDisplay);
  setText("programmeSummary", programme.summary);
  setText("programmeDatesLabel", programme.datesLabel);
  setText("programmeDatesValue", programme.datesValue);
  setText("programmeIncludesLabel", programme.includesLabel);
  renderTextList("programmeIncludesList", programme.includesItems);

  setText("paymentTitle", payment.title);
  setText("paymentDescription", payment.description);
  setText("paymentReferenceNote", payment.referenceNote);
  setImage("paynowQr", payment.qrSrc, payment.qrAlt);
  setText("paymentPayeeName", payment.payeeName);
  setText("paymentAmount", payment.amountDisplay);
  renderPaymentExtraInfo(payment);
  renderBankTransfer(payment.bankTransfer);
  setText("detailNote", registration.detailNote);

  setText("registrationEyebrow", registration.eyebrow);
  setText("registrationTitle", registration.title);
  setText("registrationIntro", registration.intro);
  setText("invoiceTitle", registration.invoiceTitle);
  setText("invoiceHelp", registration.invoiceHelp);
  setText("invoiceNameLabel", registration.invoiceNameLabel);
  setText("consentText", registration.consentText);
  if (Object.prototype.hasOwnProperty.call(registration, "invoiceNamePlaceholder")) {
    invoiceNameInput.placeholder = registration.invoiceNamePlaceholder;
  }
  submitButton.textContent = registration.submitButtonLabel || submitButton.textContent;
  submitButton.dataset.idleLabel = registration.submitButtonLabel || submitButton.textContent;
}

applyClientContent(clientConfig);

function setMessage(message, state) {
  formMessage.textContent = message;
  if (state) {
    formMessage.dataset.state = state;
  } else {
    delete formMessage.dataset.state;
  }
}

function createSubmissionId() {
  const prefix = (clientConfig?.submissionPrefix || "TRIP").replace(/[^A-Za-z0-9]/g, "").toUpperCase() || "TRIP";
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${Date.now()}-${randomPart}`;
}

async function notifyDingTalk(payload) {
  const response = await fetch("/api/dingtalk-notify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.message || "DingTalk notification failed.");
  }
}

async function uploadPaymentProof(file, submissionId) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const storagePath = `${submissionId}/${Date.now()}-${safeName}`;
  const { error } = await supabaseClient.storage.from(supabaseBucket).upload(storagePath, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || "application/octet-stream"
  });

  if (error) {
    throw error;
  }

  return {
    path: storagePath,
    name: file.name,
    type: file.type || null,
    size: file.size || null
  };
}

function syncInvoiceField() {
  const selected = form.querySelector('input[name="requireInvoice"]:checked')?.value;
  const required = selected === "Yes";

  invoiceNameInput.disabled = !required;
  invoiceNameInput.required = required;

  if (!required) {
    invoiceNameInput.value = "";
  }
}

invoiceInputs.forEach((input) => {
  input.addEventListener("change", syncInvoiceField);
});

syncInvoiceField();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (isFilePreview) {
    setMessage("This is preview mode only. To submit the form, please deploy it with Supabase configured.", "error");
    return;
  }

  if (!supabaseClient) {
    setMessage("Supabase is not configured yet. Please complete public/config.js before going live.", "error");
    return;
  }

  if (!form.reportValidity()) {
    setMessage("Please complete all required fields before submitting.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";
  setMessage("Saving your registration, please wait.", "");

  try {
    const formData = new FormData(form);
    const paymentProof = formData.get("paymentProof");
    if (!(paymentProof instanceof File) || paymentProof.size === 0) {
      throw new Error("Payment proof is required.");
    }

    const submissionId = createSubmissionId();
    const uploadedProof = await uploadPaymentProof(paymentProof, submissionId);

    const payload = {
      submission_id: submissionId,
      trip_name: clientConfig?.programme?.name || "Programme Registration",
      amount_sgd: clientConfig?.programme?.amountValue || 0,
      payee: clientConfig?.payment?.payeeName || "",
      full_name: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      contact_number: String(formData.get("contactNumber") || "").trim(),
      company_designation: String(formData.get("companyDesignation") || "").trim(),
      require_invoice: String(formData.get("requireInvoice") || "").trim(),
      invoice_name: String(formData.get("invoiceName") || "").trim() || null,
      payment_proof_path: uploadedProof.path,
      payment_proof_name: uploadedProof.name,
      payment_proof_type: uploadedProof.type,
      payment_proof_size: uploadedProof.size,
      status: "pending_payment_verification"
    };

    const { error } = await supabaseClient.from("registrations").insert(payload);
    if (error) {
      throw error;
    }

    const result = {
      ok: true,
      message: "Registration submitted successfully. We will verify your PayNow payment and contact you by email.",
      submissionId
    };

    window.sessionStorage.setItem(
      "registrationSuccess",
      JSON.stringify({
        submissionId: result.submissionId,
        email: payload.email,
        fullName: payload.full_name,
        clientSlug: clientConfig?.slug || window.DEFAULT_CLIENT_SLUG || "bnyc-qingdao"
      })
    );

    try {
      await notifyDingTalk({
        tripName: payload.trip_name,
        submissionId: result.submissionId,
        fullName: payload.full_name,
        email: payload.email,
        contactNumber: payload.contact_number,
        companyDesignation: payload.company_designation,
        requireInvoice: payload.require_invoice,
        invoiceName: payload.invoice_name || "-"
      });
    } catch (notificationError) {
      console.error(notificationError);
    }

    form.reset();
    syncInvoiceField();
    const successPath = clientConfig?.routes?.successPath || "/success.html";
    const successUrl = new URL(successPath, window.location.origin);
    successUrl.searchParams.set("submissionId", result.submissionId);
    successUrl.searchParams.set("email", payload.email);
    successUrl.searchParams.set("fullName", payload.full_name);
    successUrl.searchParams.set("client", clientConfig?.slug || window.DEFAULT_CLIENT_SLUG || "bnyc-qingdao");
    window.location.href = successUrl.toString();
  } catch (error) {
    setMessage(error.message || "Submission failed. Please try again.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = submitButton.dataset.idleLabel || "Register";
  }
});
