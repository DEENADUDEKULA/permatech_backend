const assert = require('assert');
const sinon = require('sinon')

const permatechModels = require(__dirname + './../../models/permatechModels');
global.common = require(__dirname +'./../../helpers/common.js')
global.logger   = require(__dirname + './../../helpers/logger.js')

describe('Create a customer',()=>{
	describe('Create a customer', () => {
		it('should return success 1' ,async () => {
			sinon.stub(logger, 'info').callsFake((data) => {
				// Do Nothing
            })
			sinon.stub(common, 'insertMongo').callsFake((db,collection,query) => {
				let result = {
					success:1,
					result: { ok: 1 }
				}
				return result
			})
            input_data = {
                body : {
                    auth_company_id:1,
                    name:"Dudekula"
                }
            }
            let result = await permatechModels.createCustomer(input_data);
			assert.equal(result.success, 1);
		});
		after(() => {
            logger.info.restore()
            common.insertMongo.restore()
		});
    })
})

describe('Get a Orders',()=>{
	describe('Get a Orders', () => {
		it('should return success 1' ,async () => {
			sinon.stub(logger, 'info').callsFake((data) => {
				// Do Nothing
            })
			sinon.stub(common, 'getOrderQuery').callsFake((db,collection,query) => {
				let result = [
                        {
                            "_id": "6085337b5462f02d2ffe6d1e",
                            "company_id": 1,
                            "user_id": "608306cdd9f07e03c1593355",
                            "date_created": 1619342203274,
                            "date_modified": 1619342203274,
                            "products": [
                                {
                                    "product_id": "6083179aec419125a251702b",
                                    "status": 1,
                                    "quantity": 3,
                                    "_id": "6083179aec419125a251702b",
                                    "company_id": 1,
                                    "name": "Product 1",
                                    "description": "Product 1 is great",
                                    "price": 100,
                                    "date_created": 1619203994783
                                }
                            ]
                        },
                        {
                            "_id": "608540272bdce733629957de",
                            "company_id": 1,
                            "user_id": "608306cdd9f07e03c1593355",
                            "date_created": 1619345447576,
                            "date_modified": 1619345447576,
                            "products": [
                                {
                                    "product_id": "6083179aec419125a251702b",
                                    "status": 1,
                                    "quantity": 3,
                                    "product_name": "Product 1",
                                    "_id": "6083179aec419125a251702b",
                                    "company_id": 1,
                                    "name": "Product 1",
                                    "description": "Product 1 is great",
                                    "price": 100,
                                    "date_created": 1619203994783
                                }
                            ]
                        }
                    ]
				return result
			})
            input_data = {
                query : { auth_company_id : 1, auth_user_id: "6085657169eb556a672030e21"},
                body : {}
            }
            let result = await permatechModels.getOrders(input_data);
			assert.equal(result.success, 1);
		});
		after(() => {
            logger.info.restore()
            common.getOrderQuery.restore()
		});
    })
})

describe('Create a Order',()=>{
	describe('Create a Order', () => {
		it('should return success 1' ,async () => {
			sinon.stub(logger, 'info').callsFake((data) => {
				// Do Nothing
            })
            sinon.stub(common, 'insertMongo').callsFake((db,collection,query) => {
				let result = {
					success:1,
					result: { ok: 1 }
				}
				return result
			})
            input_data = {
                query :{
                    auth_company_id : 1,
                    auth_user_id : "6085657169eb556a672030e21"
                },
                body : {
                    product_ids: [{ "product_id" : "6083179aec419125a251702b", "status" : 1, "quantity" : 1},{ "product_id" : "60855d4f686a785a85a42425", "status" : 1, "quantity" : 1},{ "product_id" : "60855d80686a785a85a42429", "status" : 1, "quantity" : 1},{ "product_id" : "60855d73686a785a85a42427", "status" : 1, "quantity" : 1}] ,
                }
            }
            let result = await permatechModels.createOrder(input_data);
			assert.equal(result.success, 1);
		});
		after(() => {
            logger.info.restore()
            common.insertMongo.restore()
		});
    })
})