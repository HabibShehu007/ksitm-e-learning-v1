document.addEventListener('DOMContentLoaded', () => {
  const userName = sessionStorage.getItem('userName') || 'Guest';
  const userEmail = sessionStorage.getItem('userEmail') || 'Not Provided';
  const selectedCourse = sessionStorage.getItem('selectedCourse') || 'No Course Selected';

  // Display in hero
  document.getElementById('heroGreeting').textContent = `Hello, ${userName}!`;
  document.getElementById('heroDescription').textContent = `You're applying for ${selectedCourse}. Let’s get you started.`;
  document.getElementById('selectedCourse').textContent = `Course: ${selectedCourse}`;

  // Pre-fill form
  document.getElementById('fullName').value = userName;
  document.getElementById('email').value = userEmail;

  // Submit logic
  document.getElementById('applicationForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect all form data
    const applicationData = {
      name: document.getElementById('fullName').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      dob: document.getElementById('dob').value,
      gender: document.getElementById('gender').value,
      startDate: document.getElementById('startDate').value,
      address: document.getElementById('address').value.trim(),
      motivation: document.getElementById('motivation').value.trim(),
      course: selectedCourse,
      status: 'Pending' // default status
    };

    // Store in sessionStorage
    sessionStorage.setItem('applicationData', JSON.stringify(applicationData));

    // Show confirmation modal
    const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    document.getElementById('confirmationMessage').textContent = `Thank you, ${userName}! Your application for ${selectedCourse} has been received.`;
    modal.show();

    // Redirect after delay
    setTimeout(() => {
      window.location.href = '../Pages/status.html';
    }, 2500);
  });
});
