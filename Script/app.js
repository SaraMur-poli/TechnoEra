const express = require('express');
const session = require('express-session');
const loginRouter = require('./login'); 
const perfilRouter = require('./profile'); 
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
  secret: 'mi_secreto',
  resave: false,
  saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(loginRouter);
app.use(perfilRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
