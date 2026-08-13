const successSubmissionId = document.getElementById("successSubmissionId");
const successEmail = document.getElementById("successEmail");
const successHeadline = document.getElementById("successHeadline");

function setText(id, value) {
  const element = document.getElementById(id);
  if (element && typeof value === "string") {
    element.textContent = value;
  }
}

function setHeadline(lines) {
  if (!successHeadline || !Array.isArray(lines) || lines.length === 0) {
    return;
  }

  successHeadline.innerHTML = "";
  lines.forEach((line, index) => {
    successHeadline.appendChild(document.createTextNode(line));
    if (index < lines.length - 1) {
      successHeadline.appendChild(document.createElement("br"));
    }
  });
}

function renderBadgeList(items) {
  const container = document.getElementById("successBadges");
  if (!container || !Array.isArray(items)) {
    return;
  }

  container.innerHTML = "";
  items.forEach((item) => {
    const badge = document.createElement("span");
    badge.textContent = item;
    container.appendChild(badge);
  });
}

function renderSimpleList(containerId, items) {
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

function renderDiscoverItems(items) {
  const container = document.getElementById("successDiscoverList");
  if (!container || !Array.isArray(items)) {
    return;
  }

  container.innerHTML = "";
  items.forEach((item) => {
    const article = document.createElement("article");
    const heading = document.createElement("h3");
    const paragraph = document.createElement("p");

    heading.textContent = item.title || "";
    paragraph.textContent = item.description || "";

    article.appendChild(heading);
    article.appendChild(paragraph);
    container.appendChild(article);
  });
}

function applySuccessContent(config) {
  if (!config) {
    return;
  }

  document.title = config.success.pageTitle || document.title;
  setText("successBrandName", config.brand.name);
  setText("successBrandSubtitle", config.brand.subtitle);
  setText("successEyebrow", config.success.eyebrow);
  setHeadline(config.success.headlineLines);
  setText("successIntro", config.success.intro);
  renderBadgeList(config.success.badges);
  setText("successPaymentStatus", config.success.paymentStatus);
  setText("successNextStepsTitle", config.success.nextStepsTitle);
  renderSimpleList("successNextStepsList", config.success.nextStepsItems);
  setText("successDiscoverEyebrow", config.success.discoverEyebrow);
  setText("successDiscoverTitle", config.success.discoverTitle);
  setText("successDiscoverIntro", config.success.discoverIntro);
  renderDiscoverItems(config.success.discoverItems);
}

function applySuccessData(data) {
  successSubmissionId.textContent = data.submissionId || "-";
  successEmail.textContent = data.email || "-";
}

function getStoredSuccessData() {
  try {
    const raw = window.sessionStorage.getItem("registrationSuccess");
    return raw ? JSON.parse(raw) : {};
  } catch (_error) {
    return {};
  }
}

try {
  const params = new URLSearchParams(window.location.search);
  const storedData = getStoredSuccessData();
  const dataFromQuery = {
    submissionId: params.get("submissionId") || "",
    email: params.get("email") || "",
    fullName: params.get("fullName") || "",
    clientSlug: params.get("client") || storedData.clientSlug || window.DEFAULT_CLIENT_SLUG || "bnyc-qingdao"
  };
  const successClientConfig = window.getClientConfig?.(dataFromQuery.clientSlug) || window.ACTIVE_CLIENT_CONFIG;

  applySuccessContent(successClientConfig);

  if (dataFromQuery.submissionId || dataFromQuery.email || dataFromQuery.fullName) {
    window.sessionStorage.setItem("registrationSuccess", JSON.stringify(dataFromQuery));
    applySuccessData(dataFromQuery);
  } else {
    applySuccessData(storedData);
  }
} catch (_error) {
  successSubmissionId.textContent = "-";
  successEmail.textContent = "-";
}
