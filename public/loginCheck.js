var config = {
    apiKey: 'AIzaSyCvN9K2cdfUf4H8BIr8vqRhdtGV_ca2UIs',
    authDomain: 'drishti-bd782.firebaseapp.com',
    databaseURL: 'https://drishti-bd782.firebaseio.com',
    storageBucket: 'drishti-bd782.appspot.com',
    messagingSenderId: '37494669483',
};
var User, answers = [], qnCount, setID;
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);
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
    for (var i = url.length - 1; i >= 0; i--) {
        if (url[i] == '=') {
            setID = url.substring(i+1);
        }
    }
    alreadyDone(User, setID);
}, function(error) {
    console.log(error);
});

function alreadyDone(User, setID) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/checkUser", true);
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText);
        if (json.success) {
            extractQns(setID);
        } else {
            alert(json.message);
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    var test = {};
    test.User = User;
    test.setID = setID;
    xhttp.send(JSON.stringify(test));
}

function extractQns(setID) {
    console.log(User);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getQns", true);
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText);
        qnCount = json.rows.length;
        for (var i = 0; i < json.rows.length; i++) {
            document.getElementById("qns").innerHTML += ("<p>" + json.rows[i].qnNo + ". " + json.rows[i].qn + "</p>" +
                "<div class=\"radio\"><label><input type=\"radio\" name=\"optradio" + json.rows[i].qnNo + "\" value=\"" + json.rows[i].optA + "\">" + json.rows[i].optA + "</label></div>" +
                "<div class=\"radio\"><label><input type=\"radio\" name=\"optradio" + json.rows[i].qnNo + "\" value=\"" + json.rows[i].optB + "\">" + json.rows[i].optB + "</label></div>" +
                "<div class=\"radio\"><label><input type=\"radio\" name=\"optradio" + json.rows[i].qnNo + "\" value=\"" + json.rows[i].optC + "\">" + json.rows[i].optC + "</label></div>" +
                "<div class=\"radio\"><label><input type=\"radio\" name=\"optradio" + json.rows[i].qnNo + "\" value=\"" + json.rows[i].optD + "\">" + json.rows[i].optD + "</label></div>");
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send("{\"uid\":\""+User.uid+"\",\"setID\":\""+setID+"\"}");
}

document.getElementById('button').onclick = function() {
    for (var i = 1; i <= qnCount; i++) {
        var x = document.getElementsByName('optradio' + i);
        for (var j = 0; x[j]; j++) {
            if (x[j].checked) {
                answers[i] = x[j].value;
                break;
            }
        }
    }
    var xhttp = new XMLHttpRequest();
    var json = {};
    json.uid = User.uid;
    json.setID = setID;
    json.answers = answers;
    xhttp.open("POST", "/postAns", true);
    xhttp.onload = function() {
        window.location.replace("http://drishticet.org");
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(json));
    console.log(answers);
}