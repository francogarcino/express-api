const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    text: "Todo ok!"
  })
});

module.exports = router;
