var pending;
var pago;
var pronto;
var entregue;
var resultHas;
var estado;


window.onload = function() {
  var orderHtml = document.getElementById("order");
  var nomeEmpregado = document.getElementById("nome");
  var orgId = localStorage.getItem("orgid");
  var empregadoType = localStorage.getItem("empType");
  var idEmp = localStorage.getItem("idEmp");
  var orderNumber;
  

  $.ajax({
    url: "/api/empregados",
    method: "get",
    success: function(result, status) {
      var nomeStr = "";
      for (i in result) {
        if (result[i].idOrg == orgId && result[i].empType == empregadoType) {
          nomeStr += "<p>" + result[i].empName + "</p>";
          nomeStr += "<p> Cargo :   " + result[i].empType + "</p>";
        }
      }
      nomeEmpregado.innerHTML = nomeStr;
    },
    error: function() {
      console.log("Error");
    }
  });

  $.ajax({
    url: "/api/has",
    method: "get",
    success: function(result, status) {
      for (i in result) {
        if (result[i].idEmployee == idEmp) 
        resultHas = result[i].idEvent; //id do evento do empregado
      }
    },
    error: function() {
      console.log("Error");
    }
  });

  

  
  
  $.ajax({
    url: "/api/orders",
    method: "get",
    success: function(result, status) {
      var orderStr = "";
      
      
      for (i in result) {
        if (result[i].idEvent == resultHas && empregadoType=="gestor") {
          orderStr += ' <div class="order">';
          orderStr +='<button class="open-Order" onClick="getOrderId(this)"id='+result[i].idOrder+'><a href="#ex1" rel="modal:open">Ver Pedido</a></button>'
          orderStr += '<div id="ex1" class="modal"></div> ';
          
          orderStr += "<span class='order-number' >Pedido Número " + result[i].idOrder + "</span>";
          orderStr += "<span> Data:  " + result[i].orderDate + " </span>";
          orderStr += "<span> Preço:  " + result[i].orderPrice + " </span>";
          orderStr += '<div class="checkout-btns">';
          orderStr += '<span id="orderStatus"> Estado do Pedido </span>';
          orderStr += '<label class="checkbox-container">Em Espera';
          orderStr +=
            '<input id="waiting' +
            result[i].idOrder +
            '" type="radio" name="' +
            result[i].idOrder +
            '" value="waiting" onClick="isChecked(this)">';
          orderStr += '<span class="checkmark"></span>';
          orderStr += "</label>";
          orderStr += '<label class="checkbox-container" >Pago';
          orderStr +=
            '<input id="pago' +
            result[i].idOrder +
            '" type="radio" name="' +
            result[i].idOrder +
            '" value="pago"  onClick="isChecked(this)">';
          orderStr += '<span class="checkmark"></span>';
          orderStr += "</label>";
          orderStr += '<label class="checkbox-container" >Pronto';
          orderStr +=
            '<input id="pronto' +
            result[i].idOrder +
            '" type="radio" name="' +
            result[i].idOrder +
            '" value="pronto" onClick="isChecked(this)">';
          orderStr += '<span class="checkmark"></span>';
          orderStr += "</label>";
          orderStr += '<label class="checkbox-container" >Entregue';
          orderStr +=
            '<input id="entregue' +
            result[i].idOrder +
            '" type="radio" name="' +
            result[i].idOrder +
            '" value="entregue" onClick="isChecked(this)">';
          orderStr += '<span class="checkmark"></span>';
          orderStr += "</label></div></div>";
          
          
        }else if(result[i].idEvent == resultHas && empregadoType=="caixa" && result[i].orderStatus == "waiting"){
            orderStr += ' <div class="order">';
            orderStr +='<button class="open-Order" onClick="getOrderId(this)"id='+result[i].idOrder+'><a href="#ex1" rel="modal:open">Ver Pedido</a></button>'
            orderStr += '<div id="ex1" class="modal"></div> ';
            orderStr += " <span class='order-number'>Pedido Número " + result[i].idOrder + "</span>";
            orderStr += "<span> Data:  " + result[i].orderDate + " </span>";
            orderStr += '<div class="checkout-btns">';
            orderStr += '<span id="orderStatus"> Estado do Pedido </span>';
            orderStr += '<label class="checkbox-container">Em Espera';
            orderStr +=
              '<input id="waiting' +
              result[i].idOrder +
              '" type="radio" name="' +
              result[i].idOrder +
              '" value="waiting" onClick="isChecked(this)">';
            orderStr += '<span class="checkmark"></span>';
            orderStr += "</label>";
            orderStr += '<label class="checkbox-container" >Pago';
            orderStr +=
              '<input id="pago' +
              result[i].idOrder +
              '" type="radio" name="' +
              result[i].idOrder +
              '" value="pago"  onClick="isChecked(this)">';
            orderStr += '<span class="checkmark"></span>';
            orderStr += "</label></div></div>";
            

        }else if(result[i].idEvent == resultHas && empregadoType=="chef" && result[i].orderStatus == "pago"){
            orderStr += ' <div class="order">';
            orderStr +='<button class="open-Order" onClick="getOrderId(this)"id='+result[i].idOrder+'><a href="#ex1" rel="modal:open">Ver Pedido</a></button>'
            orderStr += '<div id="ex1" class="modal"></div> ';
            orderStr += " <span class='order-number'>Pedido Número " + result[i].idOrder + "</span>";
            orderStr += "<span> Data:  " + result[i].orderDate + " </span>";
            orderStr += '<div class="checkout-btns">';
            orderStr += '<span id="orderStatus"> Estado do Pedido </span>';
            orderStr += '<label class="checkbox-container" >Pago';
            orderStr +=
              '<input id="pago' +
              result[i].idOrder +
              '" type="radio" name="' +
              result[i].idOrder +
              '" value="pago"  onClick="isChecked(this)">';
            orderStr += '<span class="checkmark"></span>';
            orderStr += "</label>";
            orderStr += '<label class="checkbox-container" >Pronto';
            orderStr +=
              '<input id="pronto' +
              result[i].idOrder +
              '" type="radio" name="' +
              result[i].idOrder +
              '" value="pronto" onClick="isChecked(this)">';
            orderStr += '<span class="checkmark"></span>';
            orderStr += "</label></div></div>";

        }else if(result[i].idEvent == resultHas && empregadoType=="entrega" && result[i].orderStatus == "pronto"){
            orderStr += ' <div class="order">';
            orderStr +='<button class="open-Order" onClick="getOrderId(this)"id='+result[i].idOrder+'><a href="#ex1" rel="modal:open">Ver Pedido</a></button>'
            orderStr += '<div id="ex1" class="modal"></div> ';
            orderStr += " <span class='order-number'>Pedido Número " + result[i].idOrder + "</span>";
            orderStr += "<span> Data:  " + result[i].orderDate + " </span>";
            orderStr += '<div class="checkout-btns">';
            orderStr += '<span id="orderStatus"> Estado do Pedido </span>';
            orderStr += '<label class="checkbox-container" >Pronto';
            orderStr +=
              '<input id="pronto' +
              result[i].idOrder +
              '" type="radio" name="' +
              result[i].idOrder +
              '" value="pronto" onClick="isChecked(this)">';
            orderStr += '<span class="checkmark"></span>';
            orderStr += "</label>";
            orderStr += '<label class="checkbox-container" >Entregue';
            orderStr +=
              '<input id="entregue' +
              result[i].idOrder +
              '" type="radio" name="' +
              result[i].idOrder +
              '" value="entregue" onClick="isChecked(this)">';
            orderStr += '<span class="checkmark"></span>';
            orderStr += "</label></div></div>";
             
        }
      }
      
      orderHtml.innerHTML = orderStr + order.innerHTML;
      for (i in result) {
        estado = result[i].orderStatus;
        id = result[i].idOrder;
        if (document.getElementById(estado + id) != null) {
          document.getElementById(estado + id).checked = true;
        } else {
          
        }
      }
      console.log("sucesso ao imprimir os pedidos");
    },
    error: function() {
      console.log("Erro nos pedidos");
    }
  });
};

function getOrderId(btn){
  orderNumber=btn.id;
  
  $.ajax({
    url: "/api/orderDetails/"+orderNumber,
    method: "get",
    success: function(result, status) {
      
      for(i in result){
        
          document.getElementById("ex1").innerHTML += "<p> Prato: "+result[i].dishName+"   Quantidade: "+result[i].quantity+"</p>";
        
      }
     
    

      console.log(document.getElementById("ex1"));
    },
    error: function() {
      console.log("Error");
    }
  });



}

function ativar(estado, orderId) {
  document.getElementById(estado + orderId).checked = true;
}

function isChecked(data) {
  pending = document.getElementById("pending");
  pago = document.getElementById("pago");
  pronto = document.getElementById("pronto");
  entregue = document.getElementById("entregue");

  var orderId = data.name;
  var orderStatus = data.value;

  $.ajax({
    url: "/api/changeStatus",
    method: "post",
    data: {
      orderStatus,
      orderId
    },
    success: function(res, status) {
      console.log("funciona o checked");
    },
    error: function() {
      console.log("Erro no checked");
    }
  });
}
