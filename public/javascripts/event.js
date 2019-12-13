window.onload = function()  {
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
    localStorage.setItem("chosenEventnId", s[s.selectedIndex].id);
}