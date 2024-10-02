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

app.post('/subjects', (req, res) => {
    const { sID, sName, tName, days, sTime, sClassroom} = req.body;

    const daysString = Array.isArray(days) ? days.join(', ') : '';

    console.log('Data received', req.body);

    let search = `SELECT * FROM subjects WHERE sID = ?`;
    db.query(search, [sID], function(error,row){
        if(error){
            throw error;
        }else{
            if(row.length>0){
                console.log("The user already exists");
                return res.status(400).json('The subject already exists');
            }else{
                const sql = 'INSERT INTO subjects ( sID, sName, tName, days, sTime, sClassroom ) VALUES (?, ?, ?, ?, ?, ?)';
                db.query(sql, [ sID, sName, tName, daysString, sTime, sClassroom], (err, result) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        return res.send(500).json('Error creating subject');

                    } else {
                        return res.send('Subject successfully created');
                    }
                });
            }
        }
    });

    
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
