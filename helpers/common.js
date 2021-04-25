const request = require('request').defaults({
    encoding: null
});
const config = require('../configs/env.js')
const fs = require("fs")
const moment = require("moment")

const { ObjectId } = require('mongodb');

module.exports = {
    mangoDBQuery: async (db="", collection_name="", query={},projection={},cache=false, offset, limit, sort={}) => {
        let result = new Promise(async (resolve, reject) => {
            let collection = MongoDb.db(db).collection(collection_name)
            if((offset==0 || offset) && limit){
                collection.find(query).project(projection).skip(offset).limit(limit).sort(sort).toArray(function(err, docs) {
                    if(err){
                        resolve({success:0})
                    }else{
                        resolve(docs)
                    }
                })
            }else{
                collection.find(query).project(projection).sort(sort).toArray(function(err, docs) {
                    if(err){
                        resolve({success:0})
                    }else{
                        resolve(docs)
                    }
                })
            }
        })
        return await result
    },

    updateOne : async(db,collection_name,where_query,data) =>{
        return new Promise(async (resolve, reject) => {
            let collection = MongoDb.db(db).collection(collection_name)
            collection.updateOne( where_query, { $set : data },{ upsert:true }, function(err, result) {
                if(err){
                    resolve({success : 0})
                }else{
                    resolve({success : 1, result : result})
                }
          })
    
        })
    }, 

    getOrderQuery :async (db="", collection_name="", query={},projection={},cache=false, offset, limit, sort={}) => {
        let result = new Promise(async (resolve, reject) => {
            let collection = MongoDb.db(db).collection(collection_name)
                collection.aggregate(query).toArray(function(err, docs) {
                    if(err){
                        resolve({success:0})
                    }else{
                        resolve(docs)
                    }
                })
        })
        return await result
    },
    
    insertMongo : async(db, collection_name,data) =>{
        return new Promise(async (resolve, reject) => {
            let collection = MongoDb.db(db).collection(collection_name)
            if(!data.hasOwnProperty("_id")){
                let mongoID = await this.generateID();
                data._id = mongoID;
            }
            collection.insertOne(data , function(err, result) {
                if(err){
                    resolve({success:0})
                }else{
                    resolve(result)
                }
          })
        })
    },

}
