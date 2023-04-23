express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

const axios = require("axios");
const ObjectID = require('mongodb').ObjectID;

const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

var db = require("./mongo.js");

const { MinKey } = require("mongodb");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


function addToDb(item, col) {
  var tempdb = db.collection(col);
  tempdb.insertOne(item, function (err, res) {
    if (err) console.log(err);
  });
}

function getFromDb(item, col, process) {
    db.collection(col).find(item).toArray().then(process);
}

app.post("/login/add", function(req, res){
    req.body["tasks"] = []
	req.body["points"] = 0
    addToDb(req.body, "users")
    res.send({status : 200});
})

app.get("/login", function(req, res) {
    db.collection("users").find().toArray(function(err, result) {
	if (err) throw err;
	res.send(result)
    });
});

app.post("/task/add", function(req, res) {
    var usr = req.body.username
    db.collection("users").find({}).toArray(function(err, result) {
	var lst = []
	for (const user of result) {
	    console.log(user)
	    if (user.username === usr) {
		lst = user["tasks"]
		lst.push(req.body.task)
	    }
	}
	console.log(req.body.task)
	console.log(lst)
	myquery = {"username" : usr}
	newvalues = { $set: {"tasks" : lst}}
	db.collection("users").updateOne(myquery, newvalues, function(err, res) {
	    if (err) throw err;
	    console.log("1 document updated");
	});
	res.send({status : 200})
    });					    
});

app.post("/points/add", function(req, res) {
    var usr = req.body.username
    db.collection("users").find({}).toArray(function(err, result) {
	var points = 0
	for (const user of result) {
	    console.log(user)
	    if (user.username === usr) {
		points = user["points"]
		points += req.body.points
	    }
	}
	console.log(req.body.points)
	console.log(points)
	myquery = {"username" : usr}
	newvalues = { $set: {"points" : points}}
	db.collection("users").updateOne(myquery, newvalues, function(err, res) {
	    if (err) throw err;
	    console.log("1 document updated");
	});
	res.send({status : 200})
    });					    
});

app.post("/task/remove", function(req, res) {
    var usr = req.body.username
    db.collection("users").find({}).toArray(function(err, result) {
	var lst = []
	for (const user of result) {
	    console.log(user)
	    if (user.username === usr) {
		lst = user["tasks"]
	    }
	}
	console.log(lst)
	lst.splice(req.body.tasknum,1)
	// console.log(req.body.task)
	console.log(lst)
	myquery = {"username" : usr}
	newvalues = { $set: {"tasks" : lst}}
	db.collection("users").updateOne(myquery, newvalues, function(err, res) {
	    if (err) throw err;
	    console.log("1 document updated");
	});
	res.send({status : 200})
    });					    
});

app.post("/task/get", function(req, res) {
    var usr = req.body.username
    console.log(usr)
    db.collection("users").find({}).toArray(function(err, result) {
	for (const user of result) {
    console.log(user)
	    if (user.username == usr) {
		res.send(user)
		// res.send(user["points"])
	    }
	}
    });   
});

app.post("/points/get", function(req, res) {
    var usr = req.body.username
    console.log(usr)
    db.collection("users").find({}).toArray(function(err, result) {
	for (const user of result) {
    console.log(user)
	    if (user.username == usr) {
		res.send(user["points"])
	    }
	}
    });   
});