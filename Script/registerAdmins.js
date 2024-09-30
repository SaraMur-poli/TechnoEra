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

app.post('/registerAdmins', (req, res) => {
    const { names, lastNames, idType, id, email, gender, dateOfBirth, address, cellNumber, userName, password } = req.body;

    console.log('Data received', req.body);

    let search = `SELECT * FROM admins WHERE userName = ? OR id = ?`;
    db.query(search, [userName, id], function(error,row){
        if(error){
            throw error;
        }else{
            if(row.length>0){
                console.log("The user already exists");
                return res.status(400).json('The user already exists');
            }else{
                const sql = 'INSERT INTO admins ( names, lastNames, idType, id, email, gender, dateOfBirth, address, cellNumber, userName, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                db.query(sql, [ names, lastNames, idType, id, email, gender, dateOfBirth, address, cellNumber, userName, password], (err, result) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        return res.send(500).json('Error registering user');

                    } else {
                        return res.send('User successfully registered');
                    }
                });
            }
        }
    });

    
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});