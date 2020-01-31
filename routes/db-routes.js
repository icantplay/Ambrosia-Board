var express = require('express');
var router = express.Router();
var DAO = require('../Models/dbDao')

/* GET users listing. */
router.get('/dishes', function(req, res, next) {
  DAO.getDishes(function(result){
      res.send(result);
  })

});


router.post('/', function (req, res, next) {
  
  DAO.postOrder(req.body.orderPrice,req.body.idEvent,req.body.unique, function (result) {
          res.send(result);
      });
})
router.post('/orderDetails', function (req, res, next) {
  
  DAO.postOrderDetails(req.body.orderList,req.body.idOrder, function (result) {
    
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

router.get('/orderDetails/:order', function (req, res, next) {
  DAO.getOrderDetails(req.params.order,function (result) {
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


router.get('/orders/:idOrder', function (req, res, next) {
  DAO.getOrderStatus(req.params.idOrder,function (result) {
    res.send(result);
  })
});

router.get('/empregado/:idEmpregado', function (req, res, next) {
  DAO.getEmpregadosById(req.params.idEmpregado,function (result) {
    res.send(result);
  })
});

router.get('/empregados/:evento', function (req, res, next) {
  DAO.getEmpregadoEvento(req.params.evento,function (result) {
    res.send(result);
  })
});

router.get('/District', function (req, res, next) { 
  DAO.getDistrict(function (result) { 
    res.send(result); }, next); });

    router.post('/removeEmployee/:id', function (req, res, next) {
  
      DAO.changeStatus(req.body.id, function (result) {
              res.send(result);
          });
    })

module.exports = router;
