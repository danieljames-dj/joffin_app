var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(express.static('public'));
app.use(bodyparser.json());
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "dany",
  password: "emmaus",
  database: "joffin"
});
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Database Connection established');
});
app.listen(8081, function() {
	console.log("Server listening to port 8081");
});

app.post('/getQns',function(req,res) {
	console.log(req.body);
	con.query('select qnNo,qn,optA,optB,optC,optD from questions where setNo='+req.body.setID,function(err,rows){
		console.log(rows);
		if (!err && rows.length > 0) {
	        res.json({
	          success: true,
	          rows: rows
	        });
		}
	});
});

app.post('/checkUser', function(req,res) {
	console.log(req.body.User.uid + " " + req.body.setID);
	con.query('select * from users where uid=\''+req.body.User.uid + '\'',function(err,rows){
		console.log(rows);
		if (!err) {
			if (rows.length == 0) {
				con.query('insert into users (uid, displayName, email, qnStat, score) values (\'' + req.body.User.uid + '\',\'' +
					req.body.User.displayName + '\',\'' + req.body.User.email + '\',\'0000000000000000\',0)',function(err,rows){
					if (!err) {
						var qnStat = '0000000000000000';
						qnStat = qnStat.substr(0,parseInt(req.body.setID)) + '1' + qnStat.substr(parseInt(req.body.setID) + 1);
						con.query('update users set qnStat = \'' + qnStat + '\' where uid = \'' + req.body.User.uid + '\'', function(err,rows){
							if (!err) {
								res.json({success: true, message: "success"});
							}
						});
					}
				});
			} else {
				var qnStat = rows[0].qnStat;
				if (qnStat[req.body.setID] == '0') {
					qnStat = qnStat.substr(0,parseInt(req.body.setID)) + '1' + qnStat.substr(parseInt(req.body.setID) + 1);
					con.query('update users set qnStat = \'' + qnStat + '\' where uid = \'' + req.body.User.uid + '\'', function(err,rows){
						if (!err) {
							res.json({success: true, message: "success"});
						}
					});
				} else {
					res.json({success: false, message: "Already done"});
				}
			}
		}
	});
});

app.post('/postAns', function(req,res) {
	console.log(req.body);
	con.query('select qnNo,ans from questions where setNo='+req.body.setID,function(err,rows){
		// console.log(rows);
		var score = 0;
		if (!err && rows.length > 0) {
	        for (var i = 0; i < rows.length; i++) {
	        	if (rows[i].ans == req.body.answers[i+1])
	        		score++;
	        }
		}
		console.log(score);
		con.query('update users set score = score + '+score + ' where uid = \'' + req.body.uid + '\'',function(err,rows){
			if (!err) {
				res.json({
					success: true
				});
			}
		});
	});
});

app.post('/getLeaderBoard', function(req, res) {
	con.query('select displayName,score from users order by score desc,lastUp asc',function(err,rows){
			if (!err && rows.length > 0) {
				res.json({
					success: true,
					rows: rows
				});
			} else {
				res.json({
					success: false
				});
			}
		});
});