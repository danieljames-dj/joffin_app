var xhttp = new XMLHttpRequest();
xhttp.open("POST", "/leaderboard", true);
xhttp.onload = function() {
	var json = JSON.parse(xhttp.responseText);
    if (json.success == true) {
        localStorage.setItem("tkmce_token", json.token);
        window.location.href = "./index.html"
    } else {
        console.log("LOL");
        alert("Invalid credentials");
    }
}
xhttp.setRequestHeader('Content-Type', 'application/json');
xhttp.send("{\"email\":\""+document.getElementById('form-username').value+"\",\"password\":\""+document.getElementById('form-password').value+"\"}");