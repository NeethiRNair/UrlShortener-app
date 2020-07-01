var express = require('express');
var router = express.Router();
const models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:code',(req, res) => {
  models.Url.findOne({urlCode : req.params.code}).then(url => {
    if(url){
      return res.redirect(url.longUrl);
    }
    else{
      return res.status(404).json("No Url found")
    }
  });
  
})

module.exports = router;
