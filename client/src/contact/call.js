// const express = require("express");
// require("./db/conn"); 
// const User = require("./models/usermessge")
// const app = express();

// app.use(express.urlencoded({extended:false})); 

// app.get("/contact",(req, res)=>{
//     res.render("/contact");
// })

// app.post("/contact", async(req, res)=>{
//     try {
//         const userData = new User(req.body);
//         await userData.save();
//         window.alert("submitted successfully");
//         res.status(201).render("/contact");
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })