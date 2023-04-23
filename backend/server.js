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
    addToDb(req.body, "users")
    res.send({status : 200});
})

app.get("/login", function(req, res) {
    db.collection("users").find({}).toArray(function(err, result) {
	if (err) throw err;
	res.json(result)
    });
});
