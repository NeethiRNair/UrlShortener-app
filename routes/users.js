var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
const urls = require('../controllers/urls');

router.post('/shorten', urls.shorten);

module.exports = router;
