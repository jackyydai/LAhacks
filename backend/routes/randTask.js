

const express = require("express");
const tasksRoutes = express.Router();
const dbo = require("../db/conn");
const { application } = require("express")
application.use(express.json())
const ObjectId = require("mongodb").ObjectId;


const axios = require('axios');

axios.get('http://www.boredapi.com/api/activity?participants=1')
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });