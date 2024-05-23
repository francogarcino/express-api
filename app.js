const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const androidRouter = require('./routes/android');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/android', androidRouter);

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a MongoDB Atlas');
    })
    .catch((error) => {
        console.error(error);
    });


module.exports = app;
