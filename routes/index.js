var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Visitor.create({
    user_agent: req.get('User-Agent'),
    ip: req.ip,
  }).then(() => {
    models.Visitor.findAll({limit: 10, order: [['createdAt', 'DESC']]}).then((visitors) => {
      res.render('index', { title: 'PEVN Stack!', visitors: visitors });
    })
  });
});

module.exports = router;
