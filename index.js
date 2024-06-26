const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const day = (dateObj.getDate()).toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return "["+day+"/"+month+"/"+year+" at "+hours+":"+minutes+"]"
}

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGODB_URI)
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
    res.status(200).json("Connected with e[P]ers")
});

router.get('/androides', async (req, res) => {
    try {
        const response = await Android.find({})
        const androides = response.map(doc => {
            return { ...doc.toObject(), request_timestamp: formatDate(doc.request_timestamp) }
        })
        res.status(200).json(androides)
    } catch (error) {
        res.status(500).json({ "msg_from_bunker" : error.message })
    }
})

router.get('/serial/:serial_name', async (req, res) => {
    try {
        const name = req.params.serial_name
        const androide = await Android.findOne({
            serial_name: name
        })
        if (!androide) {
            return res.status(404).json({ "msg_from_bunker": "El androide " + name + "no esta registrado"});
        }
        res.status(200).json(
            { ...androide.toObject(), request_timestamp: formatDate(androide.request_timestamp) }
        )
    } catch (error) {
        res.status(500).json({ "msg_from_bunker": error.message });
    }
})

router.post('/registrar/:serial_name', async (req, res) => {
    const name = req.params.serial_name
    try {
        const trimmed = name.trim()
        if (trimmed.length > 20 || trimmed.length < 1) {
            return res.status(400).json({
                "msg_from_bunker" : "La consciencia debe a persistir debe tener una longitud de max. 20 caracteres"
            })
        }

        const exists = await Android.exists({ serial_name: trimmed })
        if (exists) {
            return res.status(400).json({
                "msg_from_bunker" : "Ya se registro previamente al androide " + trimmed + " en la base"
            })
        }

        const androide = Android({ serial_name: trimmed })
        await androide.save()
        res.status(201).json({ ...androide.toObject(), request_timestamp: formatDate(androide.request_timestamp) })
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
