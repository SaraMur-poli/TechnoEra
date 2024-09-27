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
    database: 'prueba'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.post('/register', (req, res) => {
    const { name, lastName, idType, ID, email, role } = req.body;

    console.log('Datos recibidos:', req.body);

   

    const sql = 'INSERT INTO usuario (name, lastName, idType, ID, email, role) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, lastName, idType, ID, email, role], (err, result) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            res.status(500).send('Error al registrar el usuario');
        } else {
            res.send('Usuario registrado correctamente');
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
