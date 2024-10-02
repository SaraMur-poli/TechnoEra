let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');

btn.onclick = function()
{
    sidebar.classList.toggle('active');
};

document.getElementById('subjects').addEventListener('click', function() {
    window.location.href = '../HTML/academic.html';
});

document.getElementById('logout').addEventListener('click', function() {
    window.location.href = '../HTML/login.html';
});
