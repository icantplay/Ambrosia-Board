var db = require("./dbConn").pool;

module.exports.getDishes = function(callback, next) {
  db.getConnection(function(err, conn) {
    if (err) {
      conn.release();
      next(err);
    } else
      conn.query("select * from dish", function(err, rows) {
        conn.release();
        callback(rows);
      });
  });
};

module.exports.postOrder = function(
  orderPrice,
  idEvent,
  unique,
  callback,
  next
) {
  db.getConnection(function(err, conn) {
    if (err) {
      conn.release();
      next(err);
    } else
      conn.query(
        "insert into oorder (orderDate,orderStatus,orderPrice,idEvent,uniqu3) values (CURDATE(),'waiting', " +
          orderPrice +
          "," +
          idEvent +
          ",'" +
          unique +
          "')",
        function(err) {
          conn.release();
          callback({ msg: "olá" });
        }
      );
  });
};

module.exports.postOrderDetails = function(orderList, idOrder, callback, next) {
  db.getConnection(function(err, conn) {
    if (err) {
      conn.release();
      next(err);
    } else {
      var id;
      var qtd;
      
     
      for (i = 0; i < orderList.length - 1; i += 2) {
        id = orderList[i];
        qtd = orderList[i + 1];
        
        
        
        conn.query(
          "insert into orderDetails (quantity, idDish, idOrder) values (" +
            qtd +
            "," +
            id +
            "," +
            idOrder +
            ")"
        );
      }
      conn.release();
      callback({ msg: "boas" });
    }
  });
};

module.exports.getEvent = function(callback, next) {
  db.getConnection(function(err, conn) {
    if (err) {
      conn.release();
      next(err);
    } else
      conn.query("select * from event", function(err, rows) {
        conn.release();
        callback(rows);
      });
  });
};

module.exports.getOrderDetails = function(order,callback, next) {
    db.getConnection(function(err, conn) {
      if (err) {
        conn.release();
        next(err);
      } else 
        conn.query("SELECT dish.dishName, orderDetails.idOrder, orderDetails.quantity FROM dish INNER JOIN orderDetails ON dish.idDish = orderDetails.idDish WHERE orderDetails.idOrder = ?",order, function(err, rows) {
          conn.release();
          callback(rows);
        });
    });
  };

module.exports.getOrgInfo = function(callback, next) {
  db.getConnection(function(err, conn) {
    if (err) {
      conn.release();
      next(err);
    } else
      conn.query("select * from org", function(err, rows) {
        conn.release();
        callback(rows);
      });
  });
};
module.exports.getEmpregados = function(callback, next) {
  db.getConnection(function(err, conn) {
    if (err) {
      conn.release();
      next(err);
    } else
      conn.query("select * from employee", function(err, rows) {
        conn.release();
        callback(rows);
      });
  });
};

module.exports.getEmpregadosById = function(idEmpregado,callback, next) {
  db.getConnection(function(err, conn) {
    if (err) {
      conn.release();
      next(err);
    } else
      conn.query("select empName from employee where idEmployee="+idEmpregado+"", function(err, rows) {
        conn.release();
        callback(rows);
      });
  });
};

module.exports.getOrders = function(callback, next) {
  db.getConnection(function(err, conn) {
    if (err) {
      conn.release();
      next(err);
    } else
      conn.query("select * from oorder", function(err, rows) {
        conn.release();
        callback(rows);
      });
  });
};

module.exports.changeStatus = function(orderStatus, orderId, callback, next) {
  db.getConnection(function(err, conn) {
    if (err) {
      conn.release();
      next(err);
    } else
      conn.query(
        "update oorder set orderStatus='" +
          orderStatus +
          "' where idOrder=" +
          orderId +
          "",
        function(err) {
          conn.release();
          callback({ msg: "ola" });
        }
      );
  });
};

module.exports.getHas = function(callback, next) {
  db.getConnection(function(err, conn) {
    if (err) {
      conn.release();
      next(err);
    } else
      conn.query("select * from event_has_employee", function(err, rows) {
        conn.release();
        callback(rows);
      });
  });
};

module.exports.getDistrict = function (callback) {
  db.getConnection(function (err, conn) {
      if (err) {
          conn.release();
          callback(err, { code: 500, status: "Error connecting to database." }) 
          return
      } else conn.query("SELECT Distrito, COUNT(*) AS usersFromDistrict FROM customer GROUP BY Distrito", function (err, rows) {
          conn.release();
          callback(rows);

      })
  })
}

module.exports.getOrderStatus = function(idOrder, callback, next) {
  db.getConnection(function(err, conn) {
    if (err) {
      conn.release();
      next(err);
    } else
      conn.query("select * from oorder where idOrder=" + idOrder + "", function(
        err,
        rows
      ) {
        conn.release();
        callback(rows);
      });
  });
};

module.exports.getEmpregadoEvento = function(evento, callback, next) {
  db.getConnection(function(err, conn) {
    if (err) {
      conn.release();
      next(err);
    } else
      conn.query("select empName, empType from employee inner join event_has_employee on employee.idEmp=event_has_employee.idEmployee where idEvent="+evento+"", function(
        err,
        rows
      ) {
        conn.release();
        callback(rows);
      });
  });
};


module.exports.changeStatus = function(id, callback, next) {
  db.getConnection(function(err, conn) {
    if (err) {
      conn.release();
      next(err);
    } else
      conn.query(
        "delete from event_has_employee where idEmployee="+id+"",
        function(err) {
          conn.release();
          callback({ msg: "ola" });
        }
      );
  });
};