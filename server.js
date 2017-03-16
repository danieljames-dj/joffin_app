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
	con.query('select qnNo,qn,optA,optB,optC,optD from questions where setNo=\''+req.body.setID+'\'',function(err,rows){
		console.log(rows);
		if (!err && rows.length > 0) {
	        res.json({
	          success: true,
	          rows: rows
	        });
		}
	});
});

// app.post('/checkUser')