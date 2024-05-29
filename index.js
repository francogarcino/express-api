const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a MongoDB Atlas');
    })
    .catch((error) => {
        console.error(error);
    });

const router = express.Router()
const Android = require('./models/android.model');
const http = require("http");

router.get('/', function(req, res) {
    res.json({
        text: "Todo ok!"
    })
});

router.get('/all', async (req, res) => {
    try {
        const androids = await Android.find({})
        res.json(androids)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/serial/:serial_name', async (req, res) => {
    try {
        const android = await Android.find({
            serial_name: req.params.serial_name
        })
        res.json(android)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/create/:serial_name', async (req, res) => {
    const name = req.params.serial_name
    try {
        const exists = await Android.exists({ serial_name: name })
        if (exists) {
            return res.status(400).json("Ya se registro previamente al androide " + name + " en la base")
        }
        android = Android({ serial_name: name })
        console.log("⚙ Creando androide con nombre " + name)
        await android.save()
        console.log("🤖 " + name + " creado correctamente en la base")
        res.status(201).json(android)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.use('/', router);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
