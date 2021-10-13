const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const routerLink = require("./routes/linkroutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.set("view engine", "ejs");
        app.set("views", path.join(__dirname, "templates"));
        app.use("/", routerLink);
    })
    .catch((error)=>{
        console.log(error);
    })

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server running..")
})

//MONGO EM PRODUÇÃO: mongodb+srv://deploy:redirectlinks@cluster0.ggg3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority