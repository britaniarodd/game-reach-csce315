var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/get/by-email/:email', function(req, res, next) {
  res.json({ email: req.params.email });
});

module.exports = router;
