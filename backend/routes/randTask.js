

const express = require("express");
const randTaskRoute = express.Router();
const dbo = require("../db/conn");
const { application } = require("express")
application.use(express.json())
const ObjectId = require("mongodb").ObjectId;

tasksRoutes.route("getRandTask").get(function(req, res) {
    console.log("/GET RANDOM TASK");
    let db_connect = dbo.getDb();

    const axios = require('axios');

    axios.get('http://www.boredapi.com/api/activity?participants=1')
    .then(response => {
        console.log(response.data.url);
        console.log(response.data.explanation);
    })
    .catch(error => {
        console.log(error);
    });

    db_connect.collection("test").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
})