const express = require('express')
const bodyparser = require('body-parser')
const config = require("./configs/env")

var MongoDb = require('./helpers/mongodb')
global.MongoDb = MongoDb;

const app = express()
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

app.use((req, res, next) => {

	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Headers", "*")
	let origin = req.headers.origin
	res.header("Access-Control-Allow-Origin", req.headers.origin)
	next()

})

//Routes
const router = require('./routes/index') 
app.use("/",router) 

// app.all('*', (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://localhost:3000");
//     next();
// });

app.listen(config.port,() => {
	console.log("Permatechs APIs running")
})