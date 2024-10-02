let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');

btn.onclick = function()
{
    sidebar.classList.toggle('active');
};

document.getElementById('sForm').addEventListener('submit', function(event) {
    const checkboxes = document.querySelectorAll('input[name="option"]:checked');
    const errorMessage = document.getElementById('error-message');
  
    if (checkboxes.length !== 1) {
      event.preventDefault();
      errorMessage.textContent = "Debe seleccionar exactamente 1 día.";
    } else {
      errorMessage.textContent = "";
    }
});

document.getElementById('timeForm').addEventListener('submit', function(event) {
    const inputTime = document.getElementById('sTime').value;
    const errorMessage = document.getElementById('error-message');
  
    if (!inputTime) {
      errorMessage.textContent = "Por favor ingrese una hora válida.";
      event.preventDefault();
      return;
    }
});