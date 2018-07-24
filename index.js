const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

// Desafio

app.use(['/major', '/minor'], (req, res, next) => {
  if (!req.query.nome) {
    res.redirect('/');
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/major', (req, res) => {
  res.render('major');
});

app.get('/minor', (req, res) => {
  res.render('minor');
});

app.post('/check', (req, res) => {
  const { nome, dataNascimento } = req.body;
  const idade = moment().diff(moment(dataNascimento, 'YYYY-MM-DD'), 'years');
  console.log(idade);
  console.log(dataNascimento);
  console.log(nome);
  if (idade > 18) {
    res.redirect(`/major?nome=${nome}`);
  } else {
    res.redirect(`/minor?nome=${nome}`);
  }
});

// Final Desafio

app.listen(3000);
