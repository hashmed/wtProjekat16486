const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

const defaultRouter = require('./routes/default-router');
const loginRouter = require('./routes/login-router');
const statistikaRouter = require('./routes/statistika-router');
const unoskomentaraRouter = require('./routes/unoskomentara-router');
const unosspiskaRouter = require('./routes/unosspiska-router');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'content')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'styles')));

//default route, GET and POST handlers for main state
app.use('/', defaultRouter);

//navigation routes (route handlers)
app.use('/login', loginRouter);
app.use('/statistika', statistikaRouter);
app.use('/unoskomentara', unoskomentaraRouter);
app.use('/unosspiska', unosspiskaRouter);

http.createServer(app).listen(port, hostname, () => {
    console.log('Server up and running.')
});





