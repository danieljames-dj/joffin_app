var config = {
    apiKey: 'AIzaSyCvN9K2cdfUf4H8BIr8vqRhdtGV_ca2UIs',
    authDomain: 'drishti-bd782.firebaseapp.com',
    databaseURL: 'https://drishti-bd782.firebaseio.com',
    storageBucket: 'drishti-bd782.appspot.com',
    messagingSenderId: '37494669483',
};
var User;
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);
    console.log("SDD");
    if (user) {
        User = user;
        console.log(user);
    } else {
        console.log("Logged Out");
        delete localStorage.accessToken;
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }
    var url = window.location.href;
    var setID;
    for (var i = url.length - 1; i >= 0; i--) {
        if (url[i] == '=') {
            setID = url.substring(i+1);
        }
    }
    if (alreadyDone(User, setID)) {
        alert("Already Done");
    } else {
        extractQns();
    }
}, function(error) {
    console.log(error);
});

function alreadyDone(User, setID) {
    //
}

function extractQns() {
    console.log(User);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getQns", true);
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText);
        for (var i = 0; i < json.rows.length; i++) {
            document.getElementById("qns").innerHTML += ("<p>" + json.rows[i].qnNo + ". " + json.rows[i].qn + "</p>" +
                "<div class=\"radio\"><label><input type=\"radio\" name=\"optradio" + json.rows[i].qnNo + "\">" + json.rows[i].optA + "</label></div>" +
                "<div class=\"radio\"><label><input type=\"radio\" name=\"optradio" + json.rows[i].qnNo + "\">" + json.rows[i].optB + "</label></div>" +
                "<div class=\"radio\"><label><input type=\"radio\" name=\"optradio" + json.rows[i].qnNo + "\">" + json.rows[i].optC + "</label></div>" +
                "<div class=\"radio\"><label><input type=\"radio\" name=\"optradio" + json.rows[i].qnNo + "\">" + json.rows[i].optD + "</label></div>");
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send("{\"uid\":\""+User.uid+"\",\"setID\":\""+setID+"\"}");
}