const express = require('express');
const UserController = require('../controllers/UserController');
const authVerify = require('../middleware/authVerify');

const router = express.Router();


// User Login
router.post('/user-login', UserController.CreateUser)
router.post('/verify-login', UserController.VerifyLogin)
router.get('/product-list', UserController.ProductList)
router.get('/create-cart/:id', authVerify,UserController.CreateCart)
router.get('/remove-cart/:id', authVerify,UserController.RemoveCart)
router.get('/cart-list', authVerify,UserController.CartList)


module.exports = router;  