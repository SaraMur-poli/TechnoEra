let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');

btn.onclick = function()
{
    sidebar.classList.toggle('active');
};

document.getElementById('download').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('University schedule', 14, 20);
    
    const table = document.getElementById('schedule');
    const rows = Array.from(table.querySelectorAll('tr')).map(row => {
        return Array.from(row.querySelectorAll('th, td')).map(cell => cell.innerText);
    });
    
    doc.autoTable({
        head: [rows[0]],
        body: rows.slice(1),
        startY: 30,
        theme: 'striped'
    });

    doc.save('Uni-schedule.pdf');
});
