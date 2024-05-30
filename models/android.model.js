const mongoose = require('mongoose');

const androidSchema = new mongoose.Schema({
    serial_name: String,
    request_timestamp: { type: Date, default: Date.now }
}, {versionKey: false});

const Android = mongoose.model('Android', androidSchema)
module.exports = Android;