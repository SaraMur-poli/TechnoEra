let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');

btn.onclick = function()
{
    sidebar.classList.toggle('active');
};

document.getElementById('profile').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/profile';
});

document.getElementById('registration').addEventListener('click', function() {
    window.location.href = '../HTML/subjects.html';
});

document.getElementById('enrollment').addEventListener('click', function() {
    window.location.href = '../HTML/registerCreate.html';
});

document.getElementById('user-image').addEventListener('click', function() {
    window.location.href = '../HTML/landingMan.html';
});

document.getElementById('logout').addEventListener('click', function() {
    window.location.href = '../HTML/login.html';
});