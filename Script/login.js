const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'technoera' 
});

connection.connect((err) => {
  if (err) {
    console.error('Error conecting to database: ' + err.stack);
    return;
  }
  console.log('Conecting to the database');
});

const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/login', (req, res) => {
  const { role, userName, password } = req.body;

  console.log('Data received', req.body);

  if (!role || !userName || !password) {
    return res.status(400).json({ error: 'Faltan campos por completar' });
  }

  const roleNumber = parseInt(role, 10);

  if(roleNumber === 1){
        const sql = 'SELECT * FROM students WHERE userName = ?';
        connection.query(sql, [userName], (err, results) => {
        if (err) {
        return res.status(500).json({ error: 'Server error' });
        }

        if (results.length === 0) {
        return res.status(401).json({ error: 'Incorrect username o password' });
        }

        const user = results[0];

        if (user.password === password) {
            return res.redirect('http://127.0.0.1:5500/HTML/landing.html');
        } else {
            return res.status(401).json({ error: 'Incorrect username o password' });
        }
        });
    } else if(roleNumber === 2){
            const sql = 'SELECT * FROM teachers WHERE userName = ?';
            connection.query(sql, [userName], (err, results) => {
            if (err) {
            return res.status(500).json({ error: 'Server error' });
            }
    
            if (results.length === 0) {
            return res.status(401).json({ error: 'Incorrect username or password' });
            }
    
            const user = results[0];
    
            if (user.password === password) {
                return res.redirect('http://127.0.0.1:5500/HTML/landingTech.html');
            } else {
                return res.status(401).json({ error: 'Incorrect username o password' });
            }
            });
    } else if(roleNumber === 3){
        const sql = 'SELECT * FROM managers WHERE userName = ?';
        connection.query(sql, [userName], (err, results) => {
        if (err) {
        return res.status(500).json({ error: 'Server error' });
        }
        if (results.length === 0) {
        return res.status(401).json({ error: 'Incorrect username o password' });
        }

        const user = results[0];

        if (user.password === password) {
            return res.redirect('http://127.0.0.1:5500/HTML/landingMan.html');
        } else {
            return res.status(401).json({ error: 'Incorrect username o password' });
        }
        });

    } else{
        if(roleNumber === 4){
            const sql = 'SELECT * FROM admins WHERE userName = ?';
            connection.query(sql, [userName], (err, results) => {
            if (err) {
            return res.status(500).json({ error: 'Server error' });
            }
            if (results.length === 0) {
            return res.status(401).json({ error: 'Incorrect username o password' });
            }
    
            const user = results[0];
    
            if (user.password === password) {
                return res.redirect('http://127.0.0.1:5500/HTML/landingAdmin.html');
            } else {
                return res.status(401).json({ error: 'Incorrect username o password' });
            }
            });
        }
    }

});

app.listen(3000, () => {
  console.log('Server running on port 3000');
}); 