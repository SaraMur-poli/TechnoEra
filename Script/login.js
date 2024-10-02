const express = require('express');
const session = require('express-session');
const connection = require('./db');
const router = express.Router();

router.use(session({
  secret: 'mi_secreto',
  resave: false,
  saveUninitialized: true
}));

router.post('/login', (req, res) => {
  const { role, userName, password } = req.body;

  if (!role || !userName || !password) {
    return res.status(400).json({ error: 'Fields to be completed are missing' });
  }

  const roleNumber = parseInt(role, 10);
  let table;

  switch (roleNumber) {
    case 1: table = 'students'; break;
    case 2: table = 'teachers'; break;
    case 3: table = 'managers'; break;
    case 4: table = 'admins'; break;
    default: return res.status(400).json({ error: 'Invalid role' });
  }

  const sql = `SELECT * FROM ${table} WHERE userName = ?`;
  connection.query(sql, [userName], (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });

    if (results.length === 0) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }

    const user = results[0];

    if (user.password === password) {
      req.session.userId = user.id;
      req.session.userName = user.userName;
      req.session.role = roleNumber;
      
      switch (roleNumber) {
        case 1: res.redirect('http://127.0.0.1:5500/HTML/landing.html'); break;
        case 2: res.redirect('http://127.0.0.1:5500/HTML/landingTech.html'); break;
        case 3: res.redirect('http://127.0.0.1:5500/HTML/landingMan.html'); break;
        case 4: res.redirect('http://127.0.0.1:5500/HTML/landingAdmin.html'); break;
        default: res.status(400).json({ error: 'Inavalid role' });
      }
    } else {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }
  });
});

module.exports = router;
