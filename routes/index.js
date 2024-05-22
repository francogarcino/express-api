const express = require('express');
const router = express.Router();

router.get('/hello', function(req, res, next) {
  res.json({
    text: "Todo ok!"
  })
});

module.exports = router;
