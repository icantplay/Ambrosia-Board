

var ticketNum=localStorage.getItem("ticketNum");


window.onload = function() {
var ticket = document.getElementById("ticket-number");



ticket.innerHTML="O Número do Seu Pedido é o  :   "+ticketNum+"";
OrderStatus();
}

function OrderStatus() {
    var idOrder = localStorage.getItem("ticketNum");
    var currentStatus=document.getElementById("current-status");
    var orderPrice=document.getElementById("order-price");
    var statusImg=document.getElementById("status-img");
    var ticket = document.getElementById("ticket-number");
    $.ajax({
        url:"/api/orders/"+idOrder,
        method: "get",
        success: function(results,status) {
            if(results[0].orderStatus =="waiting"){
            currentStatus.innerHTML="Por favor dirija-se ao balcão para efetuar o pagamento";
            orderPrice.innerHTML="O Valor Total a Pagar é :  "+results[0].orderPrice+"€";
            statusImg.src="https://cdn2.iconfinder.com/data/icons/finances/512/payment-512.png"
            }else if(results[0].orderStatus =="pago"){
            currentStatus.innerHTML="Estamos a preparar o seu pedido.";
            statusImg.src="http://pluspng.com/img-png/black-chef-png-chef-is-cooking-512.png";
            orderPrice.innerHTML="Por Favor Aguarde.";
            }else if(results[0].orderStatus =="pronto"){
                currentStatus.innerHTML="O seu pedido está pronto.";
                statusImg.src="https://images.vexels.com/media/users/3/157931/isolated/preview/604a0cadf94914c7ee6c6e552e9b4487-curved-check-mark-circle-icon-by-vexels.png";
                orderPrice.innerHTML="Por favor dirija-se ao balcão.";
            }else if(results[0].orderStatus =="entregue"){
                ticket.innerHTML="Compra Finalizada";
                currentStatus.innerHTML="Obrigado pela sua compra!";
                statusImg.src="https://cdn3.iconfinder.com/data/icons/interaction-design/512/Form2-512.png";
                orderPrice.innerHTML="Deixe-nos a sua opinião.";
            }
            
            
            
            console.log(results[0].orderStatus,results[0].orderPrice);
           
        },
        error: function() {
            console.log("Error");
        }
    })
}
