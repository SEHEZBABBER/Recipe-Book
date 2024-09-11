let credentials = document.getElementsByTagName('form');
credentials[0].addEventListener('submit',function(event){
    event.preventDefault();
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let data_password = localStorage.getItem('username');
    if(!data_password){
        alert("user does not exist");
    }
    else{
        if(password == data_password){
            alert("login Succesful");
            window.location.href = 'index.html';
        }
    }
})