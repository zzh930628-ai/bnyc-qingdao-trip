const invoiceAdminForm = document.getElementById("invoiceAdminForm");
const submissionIdInput = document.getElementById("submissionIdInput");
const clientSlugInput = document.getElementById("clientSlugInput");
const adminTokenInput = document.getElementById("adminTokenInput");
const generateInvoiceButton = document.getElementById("generateInvoiceButton");
const loadRegistrationsButton = document.getElementById("loadRegistrationsButton");
const registrationSearchInput = document.getElementById("registrationSearchInput");
const invoiceFilterInput = document.getElementById("invoiceFilterInput");
const registrationList = document.getElementById("registrationList");
const invoiceAdminMessage = document.getElementById("invoiceAdminMessage");

let registrationsCache = [];

function setAdminMessage(message, state) {
  invoiceAdminMessage.textContent = message;
  if (state) {
    invoiceAdminMessage.dataset.state = state;
  } else {
    delete invoiceAdminMessage.dataset.state;
  }
}

function formatDate(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString();
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function renderRegistrationList(items) {
  if (!registrationList) {
    return;
  }

  if (!Array.isArray(items) || items.length === 0) {
    registrationList.innerHTML = '<div class="empty-state">No registrations found for the current filter.</div>';
    return;
  }

  registrationList.innerHTML = items
    .map((item) => {
      const invoiceTone = item.require_invoice === "Yes" ? "default" : "muted";
      const invoiceLabel = item.require_invoice === "Yes" ? "Invoice Requested" : "No Invoice";
      return `
        <article class="registration-card">
          <div class="registration-card__top">
            <div>
              <h3 class="registration-card__title">${item.full_name || "-"}</h3>
              <p class="message">${item.submission_id || "-"}</p>
            </div>
            <span class="pill" data-tone="${invoiceTone}">${invoiceLabel}</span>
          </div>
          <div class="registration-card__meta">
            <p><strong>Email:</strong> ${item.email || "-"}</p>
            <p><strong>Submitted:</strong> ${formatDate(item.created_at)}</p>
            <p><strong>Invoice Name:</strong> ${item.invoice_name || "-"}</p>
            <p><strong>Status:</strong> ${item.status || "-"}</p>
            <p><strong>Company / Designation:</strong> ${item.company_designation || "-"}</p>
            <p><strong>Contact:</strong> ${item.contact_number || "-"}</p>
          </div>
          <div class="registration-card__actions">
            <button type="button" data-action="fill" data-submission-id="${item.submission_id || ""}">Use This ID</button>
            <button type="button" class="button-secondary" data-action="generate" data-submission-id="${item.submission_id || ""}">Generate PDF</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function getFilteredRegistrations() {
  const keyword = normalizeText(registrationSearchInput?.value);
  const filter = invoiceFilterInput?.value || "all";

  return registrationsCache.filter((item) => {
    const matchesInvoice = filter === "invoice-only" ? item.require_invoice === "Yes" : true;
    if (!matchesInvoice) {
      return false;
    }

    if (!keyword) {
      return true;
    }

    const haystack = normalizeText([
      item.submission_id,
      item.full_name,
      item.email,
      item.invoice_name,
      item.company_designation
    ].join(" "));

    return haystack.includes(keyword);
  });
}

function refreshRegistrationList() {
  renderRegistrationList(getFilteredRegistrations());
}

async function generateInvoice(submissionId, adminToken, clientSlug) {
  const response = await fetch("/api/generate-invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-invoice-admin-token": adminToken
    },
    body: JSON.stringify({
      submissionId,
      clientSlug
    })
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.message || "Unable to generate invoice PDF.");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${submissionId}-invoice.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

async function loadRegistrations() {
  const adminToken = adminTokenInput.value.trim();
  const clientSlug = clientSlugInput.value;

  if (!adminToken) {
    setAdminMessage("Please enter the admin token first.", "error");
    adminTokenInput.focus();
    return;
  }

  loadRegistrationsButton.disabled = true;
  loadRegistrationsButton.textContent = "Loading...";
  setAdminMessage("Loading registrations from Supabase.", "");

  try {
    const response = await fetch(`/api/admin-registrations?clientSlug=${encodeURIComponent(clientSlug)}&limit=50`, {
      headers: {
        "x-invoice-admin-token": adminToken
      }
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error(result.message || "Unable to load registrations.");
    }

    const result = await response.json();
    registrationsCache = Array.isArray(result.registrations) ? result.registrations : [];
    refreshRegistrationList();
    setAdminMessage(`Loaded ${registrationsCache.length} registrations from Supabase.`, "success");
  } catch (error) {
    registrationsCache = [];
    refreshRegistrationList();
    setAdminMessage(error.message || "Unable to load registrations.", "error");
  } finally {
    loadRegistrationsButton.disabled = false;
    loadRegistrationsButton.textContent = "Load Registrations";
  }
}

invoiceAdminForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!adminTokenInput.value.trim() || !submissionIdInput.value.trim()) {
    setAdminMessage("Please enter both admin token and submission ID.", "error");
    return;
  }

  const submissionId = submissionIdInput.value.trim();
  const clientSlug = clientSlugInput.value;
  const adminToken = adminTokenInput.value.trim();

  generateInvoiceButton.disabled = true;
  generateInvoiceButton.textContent = "Generating...";
  setAdminMessage("Generating invoice PDF, please wait.", "");

  try {
    await generateInvoice(submissionId, adminToken, clientSlug);
    setAdminMessage("Invoice PDF generated successfully.", "success");
  } catch (error) {
    setAdminMessage(error.message || "Unable to generate invoice PDF.", "error");
  } finally {
    generateInvoiceButton.disabled = false;
    generateInvoiceButton.textContent = "Generate PDF";
  }
});

loadRegistrationsButton?.addEventListener("click", loadRegistrations);
registrationSearchInput?.addEventListener("input", refreshRegistrationList);
invoiceFilterInput?.addEventListener("change", refreshRegistrationList);

registrationList?.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const action = target.dataset.action;
  const submissionId = target.dataset.submissionId || "";

  if (!action || !submissionId) {
    return;
  }

  if (action === "fill") {
    submissionIdInput.value = submissionId;
    setAdminMessage(`Submission ID ${submissionId} filled into the manual field.`, "success");
    return;
  }

  if (action === "generate") {
    const adminToken = adminTokenInput.value.trim();
    if (!adminToken) {
      setAdminMessage("Please enter the admin token first.", "error");
      adminTokenInput.focus();
      return;
    }

    const originalText = target.textContent;
    target.disabled = true;
    target.textContent = "Generating...";
    try {
      await generateInvoice(submissionId, adminToken, clientSlugInput.value);
      submissionIdInput.value = submissionId;
      setAdminMessage(`Invoice PDF generated for ${submissionId}.`, "success");
    } catch (error) {
      setAdminMessage(error.message || "Unable to generate invoice PDF.", "error");
    } finally {
      target.disabled = false;
      target.textContent = originalText;
    }
  }
});

renderRegistrationList([]);
