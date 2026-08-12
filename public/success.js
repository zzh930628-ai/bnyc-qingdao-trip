const successSubmissionId = document.getElementById("successSubmissionId");
const successEmail = document.getElementById("successEmail");

try {
  const raw = window.sessionStorage.getItem("registrationSuccess");
  if (raw) {
    const data = JSON.parse(raw);
    successSubmissionId.textContent = data.submissionId || "-";
    successEmail.textContent = data.email || "-";
  }
} catch (_error) {
  successSubmissionId.textContent = "-";
  successEmail.textContent = "-";
}
