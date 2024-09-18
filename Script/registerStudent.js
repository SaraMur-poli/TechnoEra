let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');
let container = document.querySelector('.container');

btn.onclick = function()
{
    sidebar.classList.toggle('active');
    container.classList.toggle('active');
};

const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0');
    const maxDate = `${yyyy}-${mm}-${dd}`;

    document.getElementById('DateOfBirth').setAttribute('max', maxDate);