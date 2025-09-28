document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) return showModal('error', 'All fields are required.');
  if (!email.includes('@')) return showModal('error', 'Invalid email format.');

  showModal('info', 'Logging you in...');

  try {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json(); // Expecting { name, email, message }

    if (res.ok) {
      // Store user info in sessionStorage
      sessionStorage.setItem('userName', data.name || 'User');
      sessionStorage.setItem('userEmail', data.email);
      showModal('success', data.message || 'Login successful!');
      setTimeout(() => window.location.href = 'dashboard.html', 2000);
    } else {
      showModal('error', data.message || 'Login failed.');
    }
  } catch (err) {
    showModal('error', 'Something went wrong.');
  }
});

function showModal(type, message) {
  const title = type === 'success' ? 'Success' :
                type === 'error' ? 'Error' :
                type === 'info' ? 'Please Wait' : 'Message';

  const iconClass = type === 'success' ? 'fa-check-circle text-success' :
                    type === 'error' ? 'fa-times-circle text-danger' :
                    'fa-info-circle text-warning';

  document.getElementById('modalTitleText').textContent = title;
  document.getElementById('modalIcon').className = `fas ${iconClass}`;
  document.getElementById('modalMessage').textContent = message;

  const modalElement = document.getElementById('feedbackModal');
  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
  modal.show();
}
