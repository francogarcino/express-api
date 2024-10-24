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
const Spirit = require('./models/current.model');
const http = require("http");

router.get('/', function(req, res) {
    res.status(200).json("Connected with e[P]ers")
});

router.get('/espiritus', async (req, res) => {
    try {
        const response = await Spirit.find({})
        const espiritus = response.map(doc => {
            return { ...doc.toObject(), found_at: formatDate(doc.found_at) }
        })
        res.status(200).json(espiritus)
    } catch (error) {
        res.status(500).json({ "fallo_astral" : error.message })
    }
})

router.get('/:name', async (req, res) => {
    try {
        const name = req.params.name
        const espiritu = await Spirit.findOne({
            name: name
        })
        if (!espiritu) {
            return res.status(404).json({ "fallo_astral": "El espiritu " + name + " no se invocó"});
        }
        res.status(200).json(
            { ...espiritu.toObject(), found_at: formatDate(espiritu.found_at) }
        )
    } catch (error) {
        res.status(500).json({ "fallo_astral": error.message });
    }
})

router.post('/descubrir/:name', async (req, res) => {
    const name = req.params.name
    try {
        const trimmed = name.trim()
        if (trimmed.length > 20 || trimmed.length < 1) {
            return res.status(400).json({
                "fallo_astral" : "Un espiritu puede llamarse con un maximo de 20 caracteres"
            })
        }

        const exists = await Spirit.exists({ name: trimmed })
        if (exists) {
            return res.status(400).json({
                "fallo_astral" : "Ya existe el espiritu " + trimmed + " en la base"
            })
        }

        const spirit = Spirit({ name: trimmed })
        await spirit.save()
        res.status(201).json({ ...spirit.toObject(), found_at: formatDate(spirit.found_at) })
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
