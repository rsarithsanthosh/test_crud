var express = require('express');
const createError = require('http-errors');
var router = express.Router();

/* GET users listing. */
router.get('/asdf', function(req, res, next) {
  res.send('respond with a resource');
  // next(createError('dfgdf'))
});

module.exports = router;
