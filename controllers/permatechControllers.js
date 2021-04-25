const Joi = require('joi')
const permatechModel = require("../models/permatechModels")
const configs = require('../configs/env.js')

module.exports = {
    getCustomerController : async (req, res) => {
        let JoiSchema = Joi.object().keys({
            query:{
                auth_company_id : Joi.number().integer().positive().required(),
                auth_user_id : Joi.string().optional() // for getting all user details of comapny
            }
        }).options({ allowUnknown: true });
        let JoiRequest = { query:req.query };
        Joi.validate(JoiRequest, JoiSchema, async function(err, data) {
            if (err) {
                res.status(200).json({
                    status: 'error',
                    success: 0,
                    result: 'Invalid request data',
                    error: err.details[0]["message"]
                });
            } else {
                let result = await permatechModel.getCustomer(data);
                if(result.success == 1){
                    res.send({success: 1, status:200, result: result.result});
                }else{
                    let message = "Some error occurred. Please try again after some time.";
                    if(result.hasOwnProperty('result')){
                        message = result.result;
                    }
                    res.send({success: 0, status:500, result:message });
                }
            }
        });
    },

    createCustomerController : async (req, res) => {
        let JoiSchema = Joi.object().keys({
            query:{
            },
            body : {
                auth_company_id : Joi.number().integer().positive().required(),
                name : Joi.string().required()
            }
        }).options({ allowUnknown: true });
        let JoiRequest = { query:req.query, body : req.body };
        Joi.validate(JoiRequest, JoiSchema, async function(err, data) {
            if (err) {
                res.status(200).json({
                    status: 'error',
                    success: 0,
                    result: 'Invalid request data',
                    error: err.details[0]["message"]
                });
            } else {
                let result = await permatechModel.createCustomer(data);
                if(result.success == 1){
                    res.send({success: 1, status:200, user_id: result.user_id});
                }else{
                    let message = "Some error occurred. Please try again after some time.";
                    if(result.hasOwnProperty('result')){
                        message = result.result;
                    }
                    res.send({success: 0, status:500, result:message });
                }
            }
        });
    },

    getOrdersController : async (req, res) => {
        let JoiSchema = Joi.object().keys({
            query:{
                auth_company_id : Joi.number().integer().positive().required(),
                auth_user_id : Joi.string().required() 
            },
            body:{ order_id : Joi.string().optional() }
        }).options({ allowUnknown: true });
        let JoiRequest = { query:req.query, body : req.body };
        Joi.validate(JoiRequest, JoiSchema, async function(err, data) {
            if (err) {
                res.status(200).json({
                    status: 'error',
                    success: 0,
                    result: 'Invalid request data',
                    error: err.details[0]["message"]
                });
            } else {
                let result = await permatechModel.getOrders(data);
                if(result.success == 1){
                    res.send({success: 1, status:200, result: result.result});
                }else{
                    let message = "Some error occurred. Please try again after some time.";
                    if(result.hasOwnProperty('result')){
                        message = result.result;
                    }
                    res.send({success: 0, status:500, result:message });
                }
            }
        });
    },

    createOrderController :  async (req, res) => {
        let JoiSchema = Joi.object().keys({
            query:{
                auth_company_id : Joi.number().integer().positive().required(),
                auth_user_id : Joi.string().required() 
            },
            body:{ product_ids : Joi.array().required() }
        }).options({ allowUnknown: true });
        let JoiRequest = { query:req.query, body : req.body };
        Joi.validate(JoiRequest, JoiSchema, async function(err, data) {
            if (err) {
                res.status(200).json({
                    status: 'error',
                    success: 0,
                    result: 'Invalid request data',
                    error: err.details[0]["message"]
                });
            } else {
                let result = await permatechModel.createOrder(data);
                if(result.success == 1){
                    res.send({success: 1, status:200, order_id: result.order_id});
                }else{
                    let message = "Some error occurred. Please try again after some time.";
                    if(result.hasOwnProperty('result')){
                        message = result.result;
                    }
                    res.send({success: 0, status:500, result:message });
                }
            }
        });
    },

    editOrderController :  async (req, res) => {
        let JoiSchema = Joi.object().keys({
            query:{
                auth_company_id : Joi.number().integer().positive().required(),
                auth_user_id : Joi.string().required() 
            },
            body:{ 
                order_id : Joi.string().required() ,
                product_id : Joi.string().required() ,
                quantity : Joi.number().required(),
                status : Joi.number().required()
            }
        }).options({ allowUnknown: true });
        let JoiRequest = { query:req.query, body : req.body };
        Joi.validate(JoiRequest, JoiSchema, async function(err, data) {
            if (err) {
                res.status(200).json({
                    status: 'error',
                    success: 0,
                    result: 'Invalid request data',
                    error: err.details[0]["message"]
                });
            } else {
                let result = await permatechModel.editOrder(data);
                if(result.success == 1){
                    res.send({success: 1, status:200, order_id: result.order_id});
                }else{
                    let message = "Some error occurred. Please try again after some time.";
                    if(result.hasOwnProperty('result')){
                        message = result.result;
                    }
                    res.send({success: 0, status:500, result:message });
                }
            }
        });
    },

    getProductsController : async (req, res) => {
        let JoiSchema = Joi.object().keys({
            query:{
                auth_company_id : Joi.number().integer().positive().required(),
            },
            body:{ product_id : Joi.string().optional() }
        }).options({ allowUnknown: true });
        let JoiRequest = { query:req.query, body : req.body };
        Joi.validate(JoiRequest, JoiSchema, async function(err, data) {
            if (err) {
                res.status(200).json({
                    status: 'error',
                    success: 0,
                    result: 'Invalid request data',
                    error: err.details[0]["message"]
                });
            } else {
                let result = await permatechModel.getProducts(data);
                if(result.success == 1){
                    res.send({success: 1, status:200, result: result.result});
                }else{
                    let message = "Some error occurred. Please try again after some time.";
                    if(result.hasOwnProperty('result')){
                        message = result.result;
                    }
                    res.send({success: 0, status:500, result:message });
                }
            }
        });
    },

    createProductController : async (req, res) => {
        let JoiSchema = Joi.object().keys({
            query:{
                auth_company_id : Joi.number().integer().positive().required(),
            },
            body:{
                name : Joi.string().required(),
                description : Joi.string().required(),
                price : Joi.number().integer().positive().required() 
            }
        }).options({ allowUnknown: true });
        let JoiRequest = { query:req.query, body : req.body };
        Joi.validate(JoiRequest, JoiSchema, async function(err, data) {
            if (err) {
                res.status(200).json({
                    status: 'error',
                    success: 0,
                    result: 'Invalid request data',
                    error: err.details[0]["message"]
                });
            } else {
                let result = await permatechModel.createProduct(data);
                if(result.success == 1){
                    res.send({success: 1, status:200, product_id: result.product_id});
                }else{
                    let message = "Some error occurred. Please try again after some time.";
                    if(result.hasOwnProperty('result')){
                        message = result.result;
                    }
                    res.send({success: 0, status:500, result:message });
                }
            }
        });
    }
}
