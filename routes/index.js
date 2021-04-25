const express = require('express');
const router = express.Router();

const permatech = require("../controllers/permatechControllers")

//GET routes
router.get('/getCustomerDetails',permatech.getCustomerController)
router.get('/getOrders',permatech.getOrdersController)
router.get('/getProducts',permatech.getProductsController)

router.post('/createCustomer',permatech.createCustomerController) 
router.post('/editOrder',permatech.editOrderController) 
router.post('/createOrder',permatech.createOrderController)
router.post('/createProduct',permatech.createProductController)


module.exports = router;