const successSubmissionId = document.getElementById("successSubmissionId");
const successEmail = document.getElementById("successEmail");
const successHeadline = document.getElementById("successHeadline");

try {
  const raw = window.sessionStorage.getItem("registrationSuccess");
  if (raw) {
    const data = JSON.parse(raw);
    successSubmissionId.textContent = data.submissionId || "-";
    successEmail.textContent = data.email || "-";
    if (data.fullName) {
      successHeadline.textContent = `Thank you, ${data.fullName}. See You In Qingdao.`;
    }
  }
} catch (_error) {
  successSubmissionId.textContent = "-";
  successEmail.textContent = "-";
}
