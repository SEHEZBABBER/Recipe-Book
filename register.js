document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const errorMessageElement = document.getElementById('errorMessage');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            showErrorMessage('Passwords do not match');
            return;
        }
        
        // In a real application, you should use a secure method to store user data
        // This is just a simple example and is not secure for production use
        if (localStorage.getItem(username)) {
            showErrorMessage('Username already exists');
        } else {
            localStorage.setItem(username, password);
            // Redirect to login page after successful registration
            window.location.href = 'login.html';
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