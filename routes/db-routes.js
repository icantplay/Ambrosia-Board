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
  
  DAO.postOrder(req.body.orderPrice,req.body.idEvent, function (result) {
          res.send(result);
      });
})

router.get('/event', function (req, res, next) {
  DAO.getEvent(function (result) {
    res.send(result);
  })
});
router.get('/organization', function (req, res, next) {
  DAO.getOrgInfo(function (result) {
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

router.post('/changeStatus', function (req, res, next) {
  
  DAO.changeStatus(req.body.orderStatus,req.body.orderId, function (result) {
          res.send(result);
      });
})
router.get('/has', function (req, res, next) {
  DAO.getHas(function (result) {
    res.send(result);
  })
});
module.exports = router;
