function login(){
    var username = document.getElementById("name").value;
    var pw = document.getElementById("pass").value;
$.ajax({
    
    url:"/api/empregados",
    method: "get",
    success: function(result,status) {
        for ( i in result){
            console.log(username);
            if(username == result[i].empName && pw == result[i].password){
                alert("Login sucess!")
                window.location = "org.html"
                
            }
         }
        
    },
    error: function() {
        alert("Your Username or Password is incorrect");
    }

})
}