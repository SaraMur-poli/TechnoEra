const express = require('express');
const connection = require('./db'); 

const router = express.Router();

router.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'You have not log in' });
  }

  const roleNumber = req.session.role;
  let table;

  switch (roleNumber) {
    case 1: table = 'students'; break;
    case 2: table = 'teachers'; break;
    case 3: table = 'managers'; break;
    case 4: table = 'admins'; break;
    default: return res.status(400).json({ error: 'Invalide role' });
  }

  const sql = `SELECT * FROM ${table} WHERE id = ?`;
  connection.query(sql, [req.session.userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];
    

    if (roleNumber === 1) {
        const {
            names,
            lastNames,
            idType,
            id,
            email,
            gender,
            address,
            cellNumber,
            academicProgram,
            dateOfAdmission,
            numberOfCredits
        } = user;
    
        const dateOfBirth = new Date(user.dateOfBirth).toLocaleDateString();
    
        res.render('profile', { 
            user, 
            role: 'student',
            info: { 
                names,
                lastNames,
                idType,
                id,
                email,
                gender,
                dateOfBirth,
                address,
                cellNumber,
                academicProgram,
                dateOfAdmission,
                numberOfCredits
            }
        });
    } else if (roleNumber === 2) {
      const {
          names,
          lastNames,
          idType,
          id,
          email,
          gender,
          address,
          cellNumber,
          typeOfContract
      } = user;
  
      const dateOfBirth = new Date(user.dateOfBirth).toLocaleDateString();
  
      res.render('profile', { 
          user, 
          role: 'teacher',
          info: { 
              names,
              lastNames,
              idType,
              id,
              email,
              gender,
              dateOfBirth,
              address,
              cellNumber,
              typeOfContract
          }
      });
  } else if (roleNumber === 3) {
    const {
      names,
      lastNames,
      idType,
      id,
      email,
      gender,
      address,
      cellNumber,
      office
  } = user;

  const dateOfBirth = new Date(user.dateOfBirth).toLocaleDateString();

  res.render('profile', { 
      user, 
      role: 'manager',
      info: { 
          names,
          lastNames,
          idType,
          id,
          email,
          gender,
          dateOfBirth,
          address,
          cellNumber,
          office
      }
  });
      } else if (roleNumber === 4) {
        const {
          names,
          lastNames,
          idType,
          id,
          email,
          gender,
          address,
          cellNumber
      } = user;
    
      const dateOfBirth = new Date(user.dateOfBirth).toLocaleDateString();
    
      res.render('profile', { 
          user, 
          role: 'admin',
          info: { 
              names,
              lastNames,
              idType,
              id,
              email,
              gender,
              dateOfBirth,
              address,
              cellNumber
          }
      });
      }
    });
  });

module.exports = router;
