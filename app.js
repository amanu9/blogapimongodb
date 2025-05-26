const express = require("express");
const bodyParser = require("body-parser");// to parse url body part
const dotenv=require("dotenv")// to set enviroment variable of config 
dotenv.config();// set enviroment put it at the top  before your connection
const connectMongodb=require("./init/mongodbconnection");



const app= express();

connectMongodb();// calling the connection 
app.use(express.json({limit:"500mb"}));//set the limit on our json
app.use(bodyParser.urlencoded({limit:"500mb",extended:true}));

 module.exports=app;// exporting to use in another file