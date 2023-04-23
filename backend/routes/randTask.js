const express = require("express");
const axios = require('axios');
const { application } = require("express")
application.use(express.json())
const ObjectId = require("mongodb").ObjectId;

const randTaskRoute = express.Router();

randTaskRoute.route("/getRandTask").get(function(req, res) {
    console.log("/GET RANDOM TASK");

    axios.get('https://www.boredapi.com/api/activity?participants=1')
    .then(response => {
        //console.log(response.data);
        //console.log(response.data.activity);
        res.send(response.data)
    })
    .catch(error => {
        console.log(error);
    });
})


module.exports = randTaskRoute;