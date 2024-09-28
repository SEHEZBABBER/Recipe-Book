document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessageElement = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // In a real application, you should use a secure authentication method
        // This is just a simple example and is not secure for production use
        const storedPassword = localStorage.getItem(username);
        
        if (!storedPassword) {
            showErrorMessage('User does not exist');
        } else if (password === storedPassword) {
            // Directly redirect to index.html without showing a success message
            window.location.href = 'index.html';
        } else {
            showErrorMessage('Incorrect password');
        }
    });

    function showErrorMessage(message) {
        errorMessageElement.textContent = message;
        errorMessageElement.style.display = 'block';
        
        // Optionally, hide the message after a few seconds
        setTimeout(() => {
            errorMessageElement.style.display = 'none';
        }, 3000);
    }
});