const express = require('express');
const path = require('path');
const logger = require('morgan');
let session = require("express-session");



const indexRouter = require('./routes/index');
const circleRouter = require('./routes/circles');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/dist')));

app.use(session({ secret: "6170", resave: true, saveUninitialized: true }));

app.use('/', indexRouter);
app.use('/api/circles', circleRouter);



module.exports = app;
