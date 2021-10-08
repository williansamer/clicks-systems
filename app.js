const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const routerLink = require("./routes/linkroutes");

mongoose.connect("mongodb://127.0.0.1:27017/users")
    .then(()=>{
        app.set("view engine", "ejs");
        app.set("views", path.join(__dirname, "templates"));
        app.use("/", routerLink);
    })
    .catch((error)=>{
        console.log(error);
    })

app.listen(3000, ()=>{
    console.log("Server running..")
})