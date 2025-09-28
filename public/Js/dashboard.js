// Load user session info and display in dashboard
function loadUserSession() {
  const userName = sessionStorage.getItem('userName') || 'Guest';
  const userEmail = sessionStorage.getItem('userEmail') || 'Not Provided';

  const greeting = document.getElementById('userGreeting');
  const emailDisplay = document.getElementById('userEmailDisplay');

  if (greeting) greeting.textContent = `Welcome back, ${userName}!`;
  if (emailDisplay) emailDisplay.textContent = `Your registered email is ${userEmail}.`;
}


// Logout logic
function setupLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = '../Pages/login.html';
    });
  }
}

// Reveal course container on Explore click
function setupCourseReveal() {
  const exploreBtn = document.getElementById('exploreBtn');
  const courseContainer = document.getElementById('courseContainer');

  if (exploreBtn && courseContainer) {
    exploreBtn.addEventListener('click', () => {
      courseContainer.classList.remove('d-none');
      courseContainer.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// Modal preview logic using modal-content.js
function setupCourseModals() {
  document.querySelectorAll('.preview-btn').forEach(button => {
    button.addEventListener('click', () => {
      const title = button.getAttribute('data-title');

      // Save selected course to sessionStorage
      sessionStorage.setItem('selectedCourse', title);

      // Update modal content
      document.getElementById('courseModalLabel').textContent = title;
      document.getElementById('courseDescription').innerHTML = courseContent[title] || "<p>Course details coming soon.</p>";
    });
  });
}

// Initialize all logic on page load
document.addEventListener('DOMContentLoaded', () => {
  loadUserSession();
  setupLogout();
  setupCourseReveal();
  setupCourseModals();
});

document.addEventListener('DOMContentLoaded', () => {
  const message = localStorage.getItem('adminReply');
  const badge = document.getElementById('messageBadge');
  if (!message) {
    badge.style.display = 'none';
  }
});
