var xhttp = new XMLHttpRequest();
xhttp.open("POST", "/getLeaderBoard", true);
xhttp.onload = function() {
	var json = JSON.parse(xhttp.responseText);
    if (json.success) {
        console.log(json.rows);
        for (var i = 0; i < json.rows.length; i++) {
            document.getElementById('tablecontent').innerHTML += '<tr>' +
            '<td>' + (i+1) + '</td><td>' + json.rows[i].displayName + '</td><td>' + json.rows[i].score + '</td>'
            + '</tr>';
        }
    }
}
xhttp.setRequestHeader('Content-Type', 'application/json');
xhttp.send();