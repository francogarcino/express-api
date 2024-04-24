const express = require('express');
const router = express.Router();
const Android = require('../models/android.model');

router.get('/', async (req, res) => {
    try {
        const androids = await Android.find();
        res.json(androids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
