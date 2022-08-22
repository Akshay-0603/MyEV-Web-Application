const dotenv = require("dotenv");
const express = require('express');
const app = express();
const mongoose = require("mongoose");
dotenv.config({path:'./config.env'});
require('./db/conn');
// const User = require('./model/userSchema');
var cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(require('./router/auth.jsx'));
const DB=process.env.DATABASE;
const PORT=process.env.PORT;

// app.get('/',(req,res)=>{
//   res.send("index page should be here");
// });

// app.get('/contact',(req,res)=>{
//   res.cookie("test",'thapa');
//   res.send("this is your conatct page");
// });



app.get('/login',(req,res)=>{
  res.send("this is your login page");
});



// app.get('/register',(req,res)=>{
//   res.set({
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
// });
// res.send("this is registration page");
// });

app.listen(PORT, ()=>{
  console.log(`server is running at ${PORT}`);
})
