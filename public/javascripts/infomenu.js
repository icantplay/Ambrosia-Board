var total = 0;
var idOrga;

window.onload = function() {
  var idOrga;
  var starter = document.getElementById("starters");
  var main = document.getElementById("mids");
  var dessert = document.getElementById("desserts");
  var drink = document.getElementById("drinks");
  var eventId = sessionStorage.getItem("chosenEventId");
  var eventDescription = document.getElementById("eventdescription");
  var infoOrganization = document.getElementById("OrgInformation");

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
            '<h4 class="item-name ">' + result[i].dishName + "</h4>";
          starterStr +=
            '<p class="item-price ">' + result[i].dishPrice + "€ </p>";
          starterStr +=
            '<p class="item-desc">' + result[i].dishDescription + "</p>";
          starterStr +=
            '<button class="btn btn-primary buy-btn" type="button">ADD TO CART</button>';
          starterStr += "</div>";
        } else if (
          result[i].dishType == "main" &&
          result[i].idEvent == eventId
        ) {
          mainStr += ' <div class="dish-info-grid ">';
          mainStr += '<h4 class="item-name">' + result[i].dishName + "</h4>";
          mainStr += '<p class="item-price">' + result[i].dishPrice + "€ </p>";
          mainStr +=
            '<p class="item-desc">' + result[i].dishDescription + "</p>";
          mainStr +=
            '<button class="btn btn-primary buy-btn" type="button">ADD TO CART</button>';
          mainStr += "</div>";
        } else if (
          result[i].dishType == "dessert" &&
          result[i].idEvent == eventId
        ) {
          dessertStr += ' <div class="dish-info-grid ">';
          dessertStr += '<h4 class="item-name">' + result[i].dishName + "</h4>";
          dessertStr +=
            '<p class="item-price">' + result[i].dishPrice + "€ </p>";
          dessertStr +=
            '<p class="item-desc">' + result[i].dishDescription + "</p>";
          dessertStr +=
            '<button class="btn btn-primary buy-btn" type="button">ADD TO CART</button>';
          dessertStr += "</div>";
        } else if (
          result[i].dishType == "drink" &&
          result[i].idEvent == eventId
        ) {
          drinkStr += ' <div class="dish-info-grid ">';
          drinkStr += '<h4 class="item-name">' + result[i].dishName + "</h4>";
          drinkStr += '<p class="item-price">' + result[i].dishPrice + "€ </p>";
          drinkStr +=
            '<p class="item-desc">' + result[i].dishDescription + "</p>";
          drinkStr +=
            '<button class="btn btn-primary buy-btn" type="button">ADD TO CART</button>';
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
      var descStr = "";
      for (i in result) {
        if (result[i].idEvent == eventId) {
          idOrga = result[i].idOrg;

          descStr += "<a>" + result[i].eventDescriprition + "</a>";
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
            infoStr += "<h1>Company Info </h1>"
            infoStr += "<p> Phone: " + result[i].orgContact + "</p>";
            infoStr += "<p> Email: " + result[i].orgEmail + "</p>";
            infoStr += "<h1>About us </h1>"
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
  console.log(unique);
  orderPrice = total;

  $.ajax({
    url: "/api",
    method: "post",
    data: {
      orderPrice,
      idEvent,
      unique
    },
    success: function(res, status) {
      $.ajax({
        url: "/api/orders",
        method: "get",
        success: function(results, status) {
          console.log(results);
          for (i in results) {
            if (results[i].uniqu3 == unique) {
              document.getElementById("ticket-number").innerHTML ="O número do seu pedido é :"+results[i].idOrder+"";
                
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

  addItemToCart(title, price);
  updateCartTotal();
}

function addItemToCart(title, price) {
  //defaultvalue
  /*var defaultValue = defaultValue;
    defaultValue=1;*/
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");

  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      /*defaultValue += 1;*/
      console.log("Item já adiconado ao carrinho");
      return;
    }
  }
  var cartRowContents = `
        <div class="cart-item cart-column">
            
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" > 
            <button class="btn remove-btn" type="button">REMOVE</button>
        </div>`; // value="${defaultValue}"
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
  for (var i = 0; i < cartRows.length; i++) {
    
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
   
  }

  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
