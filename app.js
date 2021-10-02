const express = require('express');

const bodyParser = require('body-parser');
const db= require("./config/db")
const path = require("path")

const app  = express();
const userRoute= require("./router/userRoutes"); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')));
 
app.use(userRoute);

app.listen(3000,()=>{
    console.log("PORT NO: 3000\nHost: 127.0.0.1")
});
