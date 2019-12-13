var express = require('express');
var router = express.Router();
var DAO = require('../models/dbDao')

/* GET users listing. */
router.get('/dishes', function(req, res, next) {
  DAO.getDishes(function(result){
      res.send(result);
  })

});


router.post('/', function (req, res, next) {
  
  DAO.postOrder(req.body.orderPrice, function (result) {
          res.send(result);
      });
})

router.get('/event', function (req, res, next) {
  DAO.getEvent(function (result) {
    res.send(result);
  })
});
router.get('/organization', function (req, res, next) {
  DAO.getOrgaznizationInfo(function (result) {
    res.send(result);
  })
});

router.get('/empregados', function (req, res, next) {
  DAO.getEmpregados(function (result) {
    res.send(result);
  })
});
router.get('/orders', function (req, res, next) {
  DAO.getOrders(function (result) {
    res.send(result);
  })
});

module.exports = router;
