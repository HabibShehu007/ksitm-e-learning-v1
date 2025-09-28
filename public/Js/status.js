document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(sessionStorage.getItem('applicationData'));

  if (!data) {
    document.getElementById('statusCard').innerHTML = `
      <div class="card-body text-center">
        <p class="text-muted">No application found. Please apply first.</p>
        <a href="application.html" class="btn btn-primary">Go to Application</a>
      </div>
    `;
    return;
  }

  // Display summary
  document.getElementById('cardName').textContent = `Applicant: ${data.name}`;
  document.getElementById('cardCourse').textContent = `Course: ${data.course}`;
  document.getElementById('cardStatus').textContent = `Status: ${data.status}`;

  // Display details
  const details = `
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Date of Birth:</strong> ${data.dob}</p>
    <p><strong>Gender:</strong> ${data.gender}</p>
    <p><strong>Start Date:</strong> ${data.startDate}</p>
    <p><strong>Address:</strong> ${data.address}</p>
    <p><strong>Motivation:</strong> ${data.motivation}</p>
  `;
  document.getElementById('detailsContainer').innerHTML = details;
});
