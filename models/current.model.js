const mongoose = require('mongoose');

const spiritSchema = new mongoose.Schema({
    name: String,
    found_at: { type: Date, default: Date.now }
}, {versionKey: false});

const Espiritus = mongoose.model('Espiritus', spiritSchema)
module.exports = Espiritus;