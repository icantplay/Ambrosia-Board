window.onload = function()  {
    this.sessionStorage.setItem("chosenEventId",1);
    var eventCards = document.getElementById("card-list");
    $.ajax({
        url: "/api/event",
        method: "get",
        success: function (result, status) {
            var event = "";
            for (i in result) {

                event += "<div class='card '"+result[i].idEvent+" onclick='chosenEvent("+result[i].idEvent+")'>";
                event += "<div class='card_image'> <img src='https://static.thenounproject.com/png/368899-200.png' /> </div>";
                event +="<div class='card_title'>";
                event += "<p>"+result[i].eventName+"</p>";
                event +="</div></div>";
                

            }
            eventCards.innerHTML = event;
        },
        error: function () {
            console.log("erro");
        }


    })

}



function chosenEvent(s){
    sessionStorage.setItem("chosenEventId",s);
    location.replace("eventpage.html");
}