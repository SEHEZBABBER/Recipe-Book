document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // In a real application, you should use a secure authentication method
        // This is just a simple example and is not secure for production use
        const storedPassword = localStorage.getItem(username);
        
        if (!storedPassword) {
            showMessage('User does not exist', 'error');
        } else if (password === storedPassword) {
            showMessage('Login Successful', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showMessage('Incorrect password', 'error');
        }
    });
});

function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
    document.body.appendChild(messageElement);

    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}