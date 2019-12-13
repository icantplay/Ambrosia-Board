var db= require('./dbConn').pool;

module.exports.getDishes = function (callback, next) {
    db.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        } 
        else conn.query("select * from dish", function (err, rows) {
            conn.release();
            callback(rows);
            
        })
    })
}

module.exports.postOrder = function (orderPrice,callback, next) {
    db.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("insert into oorder (orderDate,orderStatus, orderPrice) values (CURDATE(),'waiting', "+orderPrice+")", function (err) {
            conn.release();
            callback({msg:"ola"});
            
        })
    })
}




module.exports.getEvent = function (callback, next) {
    db.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select * from event", function (err, rows) {
            conn.release();
            callback(rows);
        })

    })
}


module.exports.getOrgaznizationInfo = function (callback, next) {
    db.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select * from org", function (err, rows) {
            conn.release();
            callback(rows);
        })

    })
}
module.exports.getEmpregados = function (callback, next) {
    db.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select * from employee", function (err, rows) {
            conn.release();
            callback(rows);
        })

    })
}

module.exports.getOrders = function (callback, next) {
    db.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select * from oorder", function (err, rows) {
            conn.release();
            callback(rows);
        })

    })
}