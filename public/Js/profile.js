document.addEventListener('DOMContentLoaded', () => {
  const userName = sessionStorage.getItem('userName') || 'Guest';
  const userEmail = sessionStorage.getItem('userEmail') || 'Not Provided';
  const applicationData = JSON.parse(sessionStorage.getItem('applicationData')) || {};

  document.getElementById('profileName').textContent = userName;
  document.getElementById('profileEmail').textContent = userEmail;
  document.getElementById('emailDisplay').textContent = userEmail;
  document.getElementById('phoneDisplay').textContent = applicationData.phone || 'Not Provided';
  document.getElementById('dobDisplay').textContent = applicationData.dob || 'Not Provided';
  document.getElementById('addressDisplay').textContent = applicationData.address || 'Not Provided';
  document.getElementById('courseDisplay').textContent = applicationData.course || 'No Course Selected';
});
