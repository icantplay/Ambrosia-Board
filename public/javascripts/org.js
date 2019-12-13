window.onload = function(){
var orderHtml=document.getElementById("order");   
var nomeEmpregado = document.getElementById("nome");


    $.ajax({
        url:"/api/empregados",
            method: "get",
            success: function(result,status) {
                 var nomeStr = "";
                for( i in result){
                   nomeStr += '<p>' + result[i].empName + '</p>';
                    
    
                }
                nomeEmpregado.innerHTML = nomeStr;
            },
            error: function() {
                console.log("Error");
            }
    })
    
    $.ajax({
        url: "/api/orders",
        method: "get",
        success: function (result, status) {
            var orderStr = "";
            
            for (i in result){ 
                
               orderStr+=' <div id="order">';
               orderStr+=' <span>Pedido Número '+result[i].idOrder+'</span>';
               orderStr+='<span> Data:'+result[i].orderDate+' </span> </div>';
               orderStr+='<div class="checkout-btns">';
               orderStr+='<span> Estado do Pedido </span>';
               orderStr+='<label class="checkbox-container">Waiting';
               orderStr+= '<input type="checkbox" checked="checked">';
               orderStr+= '<span class="checkmark"></span>';
               orderStr+='</label>';
               orderStr+='<label class="checkbox-container">Pago';
               orderStr+='<input type="checkbox">';
               orderStr+= '<span class="checkmark"></span>';
               orderStr+= '</label>';
               orderStr+= '<label class="checkbox-container">Pronto';
               orderStr+= '<input type="checkbox">';
               orderStr+= '<span class="checkmark"></span>';
               orderStr+= '</label>';
               orderStr+= '<label class="checkbox-container">Entregue';
               orderStr+= '<input type="checkbox">';
               orderStr+= '<span class="checkmark"></span>';
               orderStr+= '</label> </div> ';
               
            }
         
            orderHtml.innerHTML = orderStr + order.innerHTML; 
            console.log('sucesso ao imprimir os pedidos');

            
        },
        error: function () {
            console.log("Erro nos pedidos");
        }

    })
   

         
}