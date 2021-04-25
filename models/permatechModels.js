var common = require("../helpers/common")
const moment = require("moment")
const fs = require("fs")
const logger = require(__dirname + '/../helpers/logger.js');
const config_name = require(__dirname + '/../configs/env.js')
const { ObjectId } = require('mongodb')

module.exports = {
    getCustomer: async (data) => {
        logger.info("getCustomer data ==>", data)
        let query = {
                "company_id": data.query.auth_company_id
            }
        if(data.query.auth_user_id){
            query._id = data.query.auth_user_id
        }
        logger.info("getCustomer query ==>", query )
        
        let result = await common.mangoDBQuery("Permatech", "customer",query)
        if(result && result.length) return {success : 1, result : result}
        return { success : 0 ,message : "Unable to fetch the users", result : []}
    },

    createCustomer: async (data) => {
        logger.info("createCustomer data ==>", data)
        let id = await ObjectId().toString()
        let obj = {
            _id: id,
            company_id: data.body.auth_company_id,
            name :  data.body.name
        }
        logger.info("createCustomer creating", obj)
        let result = await common.insertMongo("Permatech", "customer",obj )
        if(result.result && result.result.ok){
            return({success : 1, user_id : id})
        }else{
            return ({success : 0, message : "Not able to insert into mongo"})
        }
    },

    getOrders: async (data)=>{
        logger.info("getCustomer data ==>", data)
        let query = [
            {
              $lookup: {
                    from: "products",
                    localField: "product_ids.product_id",
                    foreignField: "_id",
                    as: "product_list"
                }
            },
            { 
                $match: {
                     $and: [ 
                        { user_id : data.query.auth_user_id },
                        { company_id : data.query.auth_company_id }
                     ]
                }
            },
            {
                $addFields:{
                "products":{
                  "$map":{
                    "input":"$product_ids",
                    "in":{
                      "$mergeObjects":[
                        "$$this",
                        {"$arrayElemAt":[
                          "$product_list",
                          {"$indexOfArray":["$product_list._id","$$this.product_id"]}
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            }
        ]
        logger.info("getCustomer query ==>", query )
        let result = await common.getOrderQuery("Permatech", "orders",query)
        if(result) return {success : 1, result : result}
        return { success : 0 ,message : "Unable to fetch the users", result : []}
    },

    createOrder : async(data)=>{
        logger.info("createOrder data ==>", data)
        let id = await ObjectId().toString()
        let obj = {
            _id: id,
            product_ids: data.body.product_ids,
            company_id : data.query.auth_company_id,
            user_id : data.query.auth_user_id,
            date_created : Date.now(),
            date_modified : Date.now()
        }
        logger.info("createOrder creating", obj)
        let result = await common.insertMongo("Permatech", "orders",obj )
        if(result.result && result.result.ok){
            return({success : 1, order_id : id})
        }else{
            return ({success : 0, message : "Not able to insert into mongo"})
        }
    },

    editOrder : async(data)=>{
        logger.info("editOrder data ==>", data)
        let obj = {
            _id: data.body.order_id,
            company_id : data.query.auth_company_id,
            user_id : data.query.auth_user_id
        }
        let result = await common.mangoDBQuery("Permatech", "orders",obj)
        let product_ids = result[0].product_ids.map((key)=>{
            if(key.product_id == data.body.product_id){
                key.status = data.body.status
                key.quantity = data.body.quantity
            }
            return key
        })
        result[0].product_ids = product_ids;
        result[0].date_modified =  Date.now()
        let update =await common.updateOne("Permatech", "orders",obj,result[0] )
        if(update.success){
            return({success : 1})
        }else{
            return ({success : 0, message : "Not able to insert into mongo"})
        }
    },

    getProducts : async (data)=>{
        logger.info("getCustomer data ==>", data)
        let query = {
                "company_id": data.query.auth_company_id
            }
        if(data.body.product_id){
            query._id = data.body.product_id
        }
        logger.info("getCustomer query ==>", query )
        let result = await common.mangoDBQuery("Permatech", "products",query)
        if(result) return {success : 1, result : result}
        return { success : 0 ,message : "Unable to fetch the users", result : []}
    },

    createProduct : async(data)=>{
        logger.info("createOrder data ==>", data)
        let id = await ObjectId().toString()
        let obj = {
            _id: id,
            company_id : data.query.auth_company_id,
            name : data.body.name,
            description : data.body.description,
            price : data.body.price,
            date_created : Date.now(),
            date_modified : Date.now()
        }
        logger.info("createOrder creating", obj)
        let result = await common.insertMongo("Permatech", "products",obj )
        if(result.result && result.result.ok){
            return({success : 1, product_id : id})
        }else{
            return ({success : 0, message : "Not able to insert into mongo"})
        }
    },

    editProduct : async(data)=>{
        logger.info("createOrder data ==>", data)
        let id = await ObjectId().toString()
        let obj = {
            _id: id,
            product_ids: data.body.product_ids,
            company_id : data.query.auth_company_id,
            user_id : data.query.auth_user_id,
            date_created : Date.now()
        }
        logger.info("createOrder creating", obj)
        let result = await common.insertMongo("Permatech", "orders",obj )
        if(result.result && result.result.ok){
            return({success : 1, order_id : id})
        }else{
            return ({success : 0, message : "Not able to insert into mongo"})
        }
    },
}
