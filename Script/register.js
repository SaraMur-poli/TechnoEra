let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');
let container = document.querySelector('.container');

btn.onclick = function()
{
    sidebar.classList.toggle('active');
};

document.getElementById('profile').addEventListener('click', function() {
    window.location.href = 'http://127.0.0.1:5500/profile';
});

document.getElementById('registration').addEventListener('click', function() {
    window.location.href = '../HTML/register.html';
});

document.getElementById('logout').addEventListener('click', function() {
    window.location.href = '../HTML/login.html';
});

document.getElementById('btnS').addEventListener('click', function() {
    window.location.href = '../HTML/registerStudent.html';
});

document.getElementById('btnT').addEventListener('click', function() {
    window.location.href = '../HTML/registerTeacher.html';
});

document.getElementById('btnM').addEventListener('click', function() {
    window.location.href = '../HTML/registerManager.html';
});

document.getElementById('btnA').addEventListener('click', function() {
    window.location.href = '../HTML/registerAdmins.html';
});