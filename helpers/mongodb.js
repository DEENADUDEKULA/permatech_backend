const MongoClient = require('mongodb').MongoClient;
const config = require(__dirname +'/../configs/env.js');

const url = config.mongodb.host+":"+config.mongodb.port

const client = new MongoClient(url,{ });

client.connect(function(err, client) {
    console.log("Mongo DB Connected!")
});

module.exports = client;