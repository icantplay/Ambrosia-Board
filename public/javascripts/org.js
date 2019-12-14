var pending;
var pago;
var pronto;
var entregue;

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
                
                
                orderStr+=' <div class="order">';
                orderStr+=' <span>Pedido Número '+result[i].idOrder+'</span>';
                orderStr+='<span> Data:  '+result[i].orderDate+' </span>';
                orderStr+='<div class="checkout-btns">';
                orderStr+='<span id="orderStatus"> Estado do Pedido </span>';
                orderStr+='<label class="checkbox-container >Pending';
                orderStr+= '<input id="pending" type="radio" name="'+result[i].idOrder+'" value="waiting" onclick="'+isChecked(this.name,this.value)+'">';
                orderStr+= '<span class="checkmark"></span>';
                orderStr+='</label>';
                orderStr+='<label class="checkbox-container" >Pago';
                orderStr+='<input id="pago" type="radio" name="'+result[i].idOrder+'" value="pago" onclick="'+isChecked(this.name,this.value)+'">';
                orderStr+= '<span class="checkmark"></span>';
                orderStr+= '</label>';
                orderStr+= '<label class="checkbox-container" >Pronto';
                orderStr+= '<input id="pronto" type="radio" name="'+result[i].idOrder+'" value="pronto" onclick="'+isChecked(this.name,this.value)+'">';
                orderStr+= '<span class="checkmark"></span>';
                orderStr+= '</label>';
                orderStr+= '<label class="checkbox-container" >Entregue';
                orderStr+= '<input id="entregue" type="radio" name="'+result[i].idOrder+'" value="entregue" onclick="'+isChecked(this.name,this.value)+'">';
                orderStr+= '<span class="checkmark"></span>';
                orderStr+= '</label> </div> </div> ';
            
            }
            
            orderHtml.innerHTML = orderStr + order.innerHTML; 
            console.log('sucesso ao imprimir os pedidos');

            
        },
        error: function () {
            console.log("Erro nos pedidos");
        }

    }) 
    
   
         
}



function isChecked(orderId,orderStatus){
    pending= document.getElementById("pending");
    pago= document.getElementById("pago");
    pronto= document.getElementById("pronto");
    entregue= document.getElementById("entregue");
   

    console.log(pago)
    if(pago.checked){
        $.ajax({
            url:"/api/changeStatus",
            method: "post",
            data: { 
              orderId,
              orderStatus

            },
            success: function (res,status) {
                console.log('funciona o checked')
            },
            error: function() {
                console.log("Erro no checked")
            }
        });


    }else if(pronto.checked){

    }else if(entregue.checked){

    }
     
    // Por mais na funcao onclcik para nao passsar tudo 

    

}

