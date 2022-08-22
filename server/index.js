const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")

const app = express();

dotenv.config({path: ".env"})

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("conected to Mongo"))
.catch(err => console.log(err))// we conected to database that are inside cloude aws in mongoDB

const port = process.env.PORT
const url = process.env.SERVER_URL

app.listen(port, url, ()=>{
    console.log(`listening on ${url}:${port}`)
})