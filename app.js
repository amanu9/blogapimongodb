const express = require("express");
const bodyParser = require("body-parser");// to parse url body part
const dotenv=require("dotenv")// to set enviroment variable of config 
const morgan=require("morgan");
const notfound=require("./controllers/notfound");// importing not found controller


dotenv.config();// set enviroment put it at the top  before your connection

const connectMongodb=require("./init/mongodbconnection");
const {authRoute,categoryRooute,fileroutes}=require("./routes")// all route inport here
const {errorHandler}=require("./middleware");


const app= express();

connectMongodb();// calling the connection 
app.use(express.json({limit:"500mb"}));//set the limit on our json
app.use(bodyParser.urlencoded({limit:"500mb",extended:true}));

app.use(morgan("dev"));// morgan is third party module third part that help us to print the response to the console



// routes section

// auth routes
app.use("/api/auth", authRoute);// using the route
// category routes
app.use("/api/category",categoryRooute);// using the category route

// files routes 
app.use("/api/files",fileroutes);// using the  file route


// middle ware error handler
app.use(errorHandler); // using middle ware here

app.use(notfound); //passing not found controller to all routes

 module.exports=app;// exporting to use in another file