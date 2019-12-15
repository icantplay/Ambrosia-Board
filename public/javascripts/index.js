window.onload = function()  {
    this.sessionStorage.setItem("chosenEventId",1);
    var eventOption = document.getElementById("event");
    $.ajax({
        url: "/api/event",
        method: "get",
        success: function (result, status) {
            var optionStr = "";
            for (i in result) {

                optionStr += '<option id="'+result[i].idEvent +'">' + result[i].eventName + '</option>';

            }
            eventOption.innerHTML = optionStr;
        },
        error: function () {
            console.log("erro");
        }


    })

}



function chosenEvent(s){
    sessionStorage.setItem("chosenEventId", s[s.selectedIndex].id);
}