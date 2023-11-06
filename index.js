

const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const app = express()
const port = 8080


app.listen(port,()=>{
    console.log(`server is runing at https://localhot:${port}`)
})