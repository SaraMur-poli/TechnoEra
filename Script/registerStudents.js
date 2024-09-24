const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'technoera'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting the database: ', err);
        return;
    }
    console.log('Conecting MySQL database ');
});

app.post('/registerStudents', (req, res) => {
    const { names, lastNames, idType, id, email, gender, dateOfBirth, address, cellNumber, academicProgram, dateOfAdmission,numberOfCredits, userName, password } = req.body;

    console.log('Data received', req.body);

   

    const sql = 'INSERT INTO students ( names, lastNames, idType, id, email, gender, dateOfBirth, address, cellNumber, academicProgram, dateOfAdmission,numberOfCredits, userName, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [ names, lastNames, idType, id, email, gender, dateOfBirth, address, cellNumber, academicProgram, dateOfAdmission,numberOfCredits, userName, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error registering user');
        } else {
            res.send('User successfully registered');
        }
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});