document.addEventListener('DOMContentLoaded', () => {
  const replies = JSON.parse(localStorage.getItem('adminReplies')) || [];
  const list = document.getElementById('messageList');

  if (replies.length === 0) {
    list.innerHTML = '<li class="list-group-item text-muted">No messages received yet.</li>';
  } else {
    replies.forEach((msg, index) => {
      const item = document.createElement('li');
      item.className = 'list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row';
      item.innerHTML = `
        <div>
          <strong>Message ${index + 1}:</strong> ${msg.message}<br>
          <small class="text-muted">${msg.timestamp}</small>
        </div>
        <button class="btn btn-sm btn-outline-primary mt-2 mt-md-0" onclick="openReplyModal(${index})">
          <i class="fas fa-reply me-1"></i> Reply
        </button>
      `;
      list.appendChild(item);
    });
  }
});

function openReplyModal(index) {
  document.getElementById('studentReplyLabel').textContent = `Reply to Message ${index + 1}`;
  const modal = new bootstrap.Modal(document.getElementById('studentReplyModal'));
  modal.show();
}

document.getElementById('studentReplyForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const replyText = this.querySelector('textarea').value.trim();
  const fileInput = this.querySelector('input[type="file"]');
  const file = fileInput.files[0];

  const reply = {
    message: replyText,
    timestamp: new Date().toLocaleString(),
    attachment: file ? file.name : null
  };

  const existing = JSON.parse(localStorage.getItem('studentReplies')) || [];
  existing.push(reply);
  localStorage.setItem('studentReplies', JSON.stringify(existing));

  alert("Your reply has been sent to the admin.");
  bootstrap.Modal.getInstance(document.getElementById('studentReplyModal')).hide();
  this.reset();
});

