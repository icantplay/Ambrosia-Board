function login() {
    var username = document.getElementById("name").value
    var password = document.getElementById("pass").value
    if (username == "santos" && password == "123") {
        alert("Login sucess!")
        window.location = "org.html"

    } else {
        alert("Your Username or Password is incorrect")
    }
}