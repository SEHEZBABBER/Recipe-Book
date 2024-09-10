let user_data = document.getElementsByTagName('form');
user_data[0].addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if(localStorage.getItem(username)){
        alert("username does not exist");
    }
    else{
        localStorage.setItem(username,password);
        alert("registration Succesful");
    }
    window.location.href = 'index.html';
})