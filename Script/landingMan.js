let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');

btn.onclick = function()
{
    sidebar.classList.toggle('active');
};

document.getElementById('registration').addEventListener('click', function() {
    window.location.href = '../HTML/subjects.html';
});