const successSubmissionId = document.getElementById("successSubmissionId");
const successEmail = document.getElementById("successEmail");
const successHeadline = document.getElementById("successHeadline");

function applySuccessData(data) {
  successSubmissionId.textContent = data.submissionId || "-";
  successEmail.textContent = data.email || "-";
  if (data.fullName && successHeadline) {
    successHeadline.textContent = `Thank you, ${data.fullName}. See You In Qingdao.`;
  }
}

try {
  const params = new URLSearchParams(window.location.search);
  const dataFromQuery = {
    submissionId: params.get("submissionId") || "",
    email: params.get("email") || "",
    fullName: params.get("fullName") || ""
  };

  if (dataFromQuery.submissionId || dataFromQuery.email || dataFromQuery.fullName) {
    applySuccessData(dataFromQuery);
  } else {
    const raw = window.sessionStorage.getItem("registrationSuccess");
    if (raw) {
      applySuccessData(JSON.parse(raw));
    }
  }
} catch (_error) {
  successSubmissionId.textContent = "-";
  successEmail.textContent = "-";
}
