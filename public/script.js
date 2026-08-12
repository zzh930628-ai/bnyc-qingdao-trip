const form = document.getElementById("registrationForm");
const submitButton = document.getElementById("submitButton");
const formMessage = document.getElementById("formMessage");
const successTemplate = document.getElementById("successTemplate");
const isFilePreview = window.location.protocol === "file:";
const invoiceInputs = Array.from(document.querySelectorAll('input[name="requireInvoice"]'));
const invoiceNameInput = document.querySelector('input[name="invoiceName"]');
const appConfig = window.APP_CONFIG || {};
const supabaseUrl = appConfig.supabaseUrl || "";
const supabaseAnonKey = appConfig.supabaseAnonKey || "";
const supabaseBucket = appConfig.supabaseBucket || "payment-proofs";
const supabaseClient =
  supabaseUrl && supabaseAnonKey && window.supabase
    ? window.supabase.createClient(supabaseUrl, supabaseAnonKey)
    : null;

function setMessage(message, state) {
  formMessage.textContent = message;
  if (state) {
    formMessage.dataset.state = state;
  } else {
    delete formMessage.dataset.state;
  }
}

function createSubmissionId() {
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `BNYC-${Date.now()}-${randomPart}`;
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
      trip_name: "BNYC Qingdao Trip",
      amount_sgd: 1600,
      payee: "Sing-China",
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

    setMessage(result.message, "success");

    const successBox = successTemplate.content.firstElementChild.cloneNode(true);
    successBox.querySelector("[data-submission-id]").textContent = result.submissionId;
    const previousSuccess = document.querySelector(".success-box");
    if (previousSuccess) {
      previousSuccess.remove();
    }
    formMessage.after(successBox);

    form.reset();
    syncInvoiceField();
  } catch (error) {
    setMessage(error.message || "Submission failed. Please try again.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Register";
  }
});
