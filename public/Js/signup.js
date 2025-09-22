// public/js/signup.js
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!name || !email || !password) return showModal('error', 'All fields are required.');
  if (!email.includes('@')) return showModal('error', 'Invalid email format.');
  if (password.length < 6) return showModal('error', 'Password must be at least 6 characters.');

  showModal('info', 'Signing you up...');

  try {
    const res = await fetch('/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const text = await res.text();
    if (res.ok) {
      showModal('success', text);
      setTimeout(() => window.location.href = 'login.html', 2000);
    } else {
      showModal('error', text);
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
