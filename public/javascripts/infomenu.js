
var total1;
var idOrga;
var ticketNum;
var orderList=[];

window.onload = function() {
  var idOrga;
  var starter = document.getElementById("starters");
  var main = document.getElementById("mids");
  var dessert = document.getElementById("desserts");
  var drink = document.getElementById("drinks");
  var eventId = sessionStorage.getItem("chosenEventId");
  var eventDescription = document.getElementById("event-description");
  var infoOrganization = document.getElementById("OrgInformation");
  var eventName= document.getElementById("event-name");





  var els = document.querySelectorAll('.speak');
[].forEach.call(els, function(el) {
	el.addEventListener('click', function() {
		[].forEach.call(els, function(clk) {
			clk.classList.remove('active');
		});
		el.classList.add('active');
	});
});

  getLocation();

  $.ajax({
    url: "/api/dishes",
    method: "get",
    success: function(result, status) {
      var starterStr = "";
      var mainStr = "";
      var dessertStr = "";
      var drinkStr = "";
      for (i in result) {
        if (result[i].dishType == "starter" && result[i].idEvent == eventId) {
          starterStr += ' <div class="dish-info-grid ">';
          starterStr +=
            '<h4 class="item-name " id="'+result[i].idDish+'" value="'+result[i].idDish+'">' + result[i].dishName + "</h4>";
          starterStr +=
            '<p class="item-price ">' + result[i].dishPrice + "€ </p>";
          starterStr +=
            '<p class="item-desc">' + result[i].dishDescription + "</p>";
          starterStr +=
            '<button class="btn btn-primary buy-btn" type="button">Adicionar ao Carrinho</button>';
          starterStr += "</div>";
        } else if (
          result[i].dishType == "main" &&
          result[i].idEvent == eventId
        ) {
          mainStr += ' <div class="dish-info-grid ">';
          mainStr += '<h4 class="item-name" id="id-Dish"  value="'+result[i].idDish+'">' + result[i].dishName + "</h4>";
          mainStr += '<p class="item-price">' + result[i].dishPrice + "€ </p>";
          mainStr +=
            '<p class="item-desc">' + result[i].dishDescription + "</p>";
          mainStr +=
            '<button class="btn btn-primary buy-btn" type="button">Adicionar ao Carrinho</button>';
          mainStr += "</div>";
        } else if (
          result[i].dishType == "dessert" &&
          result[i].idEvent == eventId
        ) {
          dessertStr += ' <div class="dish-info-grid ">';
          dessertStr += '<h4 class="item-name" id="id-Dish"  value="'+result[i].idDish+'">' + result[i].dishName + "</h4>";
          dessertStr +=
            '<p class="item-price">' + result[i].dishPrice + "€ </p>";
          dessertStr +=
            '<p class="item-desc">' + result[i].dishDescription + "</p>";
          dessertStr +=
            '<button class="btn btn-primary buy-btn" type="button">Adicionar ao Carrinho</button>';
          dessertStr += "</div>";
        } else if (
          result[i].dishType == "drink" &&
          result[i].idEvent == eventId
        ) {
          drinkStr += ' <div class="dish-info-grid " >';
          drinkStr += '<h4 class="item-name" id="id-Dish"  value="'+result[i].idDish+'">' + result[i].dishName + "</h4>";
          drinkStr += '<p class="item-price">' + result[i].dishPrice + "€ </p>";
          drinkStr +=
            '<p class="item-desc">' + result[i].dishDescription + "</p>";
          drinkStr +=
            '<button class="btn btn-primary buy-btn" type="button">Adicionar ao Carrinho</button>';
          drinkStr += "</div>";
        }
      }
        
      starter.innerHTML = starterStr + starter.innerHTML;
      main.innerHTML = mainStr + main.innerHTML;
      dessert.innerHTML = dessertStr + dessert.innerHTML;
      drink.innerHTML = drinkStr + drink.innerHTML;
      
      ready();
      
    },
    error: function() {
      console.log("erro!!");
    }
  });
  $.ajax({
    url: "/api/event",
    method: "get",
    success: function(result, status) {
      var eventName= document.getElementById("event-name");
      var descStr = "";
      for (i in result) {
        if (result[i].idEvent == eventId) {
          idOrga = result[i].idOrg;

          descStr +=""+result[i].eventDescriprition+"";
          eventName.innerHTML=result[i].eventName;
          
        }
        
      }
      
      eventDescription.innerHTML = descStr;
      
    },
    error: function() {
      console.log("Error");
    }
  });

  $(document).ready(function() {
    $.ajax({
      url: "/api/organization",
      method: "get",
      success: function(result, status) {
        var infoStr = "";

        for (i in result) {
          if (result[i].idOrg == idOrga) {
            infoStr += "<h2>Company Info </h2>"
            infoStr += "<p> Phone: " + result[i].orgContact + "</p>";
            infoStr += "<p> Email: " + result[i].orgEmail + "</p>";
            infoStr += "<h2>About us </h2>"
          }
        }
        infoOrganization.innerHTML = infoStr;
      },
      error: function() {
        console.log("Error");
      }
    });
    console.log("ready!");
  });
};

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("remove-btn");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("buy-btn");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function getUnique() {
  var unique = "";
  for (counter = 0; counter <= 9; counter++) {
    var randomNum = 0 + parseInt(Math.random() * 127);
    if (randomNum > 33) {
      unique += String.fromCharCode(randomNum);
    } else {
      counter--;
    }
  }
  return unique;
}

function purchaseClicked() {
  var eventId = sessionStorage.getItem("chosenEventId");
  var idEvent = eventId;
  var unique = getUnique();
  
  orderPrice = total1;

  $.ajax({
    url: "/api",
    method: "post",
    data: {
      orderPrice,
      idEvent,
      unique
    },
    success: function(res, status) {
      console.log("sucesso funciona")
      
      $.ajax({
        url: "/api/orders",
        method: "get",
        success: function(results, status) {
          console.log("Sucesso funciona");
          for (i in results) {
            if (results[i].uniqu3 == unique) {
              console.log("estaria a funcionar")
              
             localStorage.setItem("ticketNum",results[i].idOrder);
             console.log(localStorage.getItem("ticketNum"));
             var idOrder=results[i].idOrder;

              $.ajax({
              url: "/api/orderDetails",
              method: "post",
              traditional:true,
              data: {
                orderList:orderList,
                idOrder
              },
              success: function(res, status) {
                console.log("postORderDetails funciona")
                location.replace("order.html");
                
                 },
              error: function() {
                console.log("Error on post");
              }
            });
             
             
             
             
            }
          } 
        },
        error: function() {
          console.log("Error");
        }
      });
    },
    error: function() {
      console.log("Error on post");
    }
  });

  
  updateCartTotal();
 
  
  
}


  




function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement;
 

  var title = shopItem.getElementsByClassName("item-name")[0].innerText;
  var price = shopItem.getElementsByClassName("item-price")[0].innerText;
  var idDish=shopItem.getElementsByClassName("item-name")[0].id;

  addItemToCart(title, price,idDish);
  updateCartTotal();
}

function addItemToCart(title, price,idDish) {
  //defaultvalue
  /*var defaultValue = defaultValue;
    defaultValue=1;*/
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  //cartRow.id="idDish";
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");

  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      
      alert("Item já adiconado ao carrinho");
      return;
    }
  }
  var cartRowContents = `
        <div class="cart-item cart-column">
            
            <span class="cart-item-title" id="${idDish}">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" > 
            <button class="btn remove-btn" type="button">REMOVE</button>
        </div>`; 
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("remove-btn")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
  updateCartTotal();
  
 

}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  orderList=[];
  for (var i = 0; i < cartRows.length; i++) {
    
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
    var idDish=cartRow.getElementsByClassName("cart-item-title")[0].id;
    orderList.push(idDish);  
    orderList.push(quantity);
    
  }
  total = Math.round(total * 100) / 100
  total1=total;

  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;

    
    
}
