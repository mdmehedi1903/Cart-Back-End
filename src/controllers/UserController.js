const CartModel = require('../models/CartModel');
const OTPModel = require('../models/OTPModel');
const ProductModel = require('../models/ProductModel');
const SendEmailUtility = require('../utility/sendEmailUtility')
const jwt = require('jsonwebtoken')


exports.RemoveCart = async (req,res)=> {
    try {
        let email = req.headers['useremail'];
        let id = req.params.id;
        let query = {productid: id, useremail: email}
   
        let result = await CartModel.deleteOne(query)
    
        return res.status(200).json({ status: "Success", email, id });
      } catch (e) {
        return res.status(500).json({ status: "Failed", message: e });
      }
}

exports.CartList = async (req, res) => {
    try {
      let email = req.headers['useremail'];
	let desending = { $sort: { _id: -1 } };
  
      let matchStage = { $match: { useremail: email } };
      let joinwithProduct = {
        $lookup: {
            from: "products",
            localField: "productid",
            foreignField: "id",
            as: "product"
        }
      }

      let unwindBrandStage={$unwind:"$product"};
  
      let result = await CartModel.aggregate([
        matchStage, joinwithProduct, unwindBrandStage, desending 
      ]);
  
      return res.status(200).json({ status: "Success", data: result });
    } catch (e) {
      return res.status(500).json({ status: "Failed", message: e });
    }
  };
  


 
exports.CreateCart = async (req,res)=> {
    
    let id = req.params.id;
    let email = req.headers['useremail'];
    let postBody = {
        useremail: email,
        productid: id
    }
    let result = await CartModel.updateOne(postBody, {$set: postBody}, {upsert: true})
    return res.status(201).json({ status: "Success", data:result });
    
} 

exports.ProductList = async (req, res) => {
    try {
        let result = await ProductModel.find().sort({ _id: -1 });
        return res.status(201).json({ status: "Success", data:result });
    } catch (err) {
        res.status(400).json({ status: "Failed", data: err });
    }
  };
 


exports.VerifyLogin = async (req, res) => {
    const reqBody = req.body;
    
    try {
        let result = await OTPModel.find(reqBody).count();
        if(result===1){

            await OTPModel.updateOne({otp: "0"})
        let payLoad = {
            exp: Math.floor(Date.now()/1000)+(60*60*24),
            data: reqBody['useremail']
        }

        let token = jwt.sign(payLoad, "123-ABC-xyz")

            return res.status(201).json({ status: "Success", msg:token });
        }else{
            res.status(400).json({ status: "Invalid OTP", msg: "Try Again Later!" });
        }
    } catch (err) {
        res.status(400).json({ status: "Failed", data: err });
    }
  };




exports.CreateUser = async (req, res) => {
    const reqBody = req.body;
    let code = Math.floor(1000 + Math.random() * 9000);
    const email = reqBody['useremail'];
    let EmailText = `4 Digit Verification Code has been sent! (${code})`;
    let EmailSubject="MERN Cart Verification";
  
    try {
        await OTPModel.updateOne({useremail: email}, {$set: {otp: code}}, {upsert:true})
        await SendEmailUtility(email,EmailText,EmailSubject);
        return res.status(201).json({ status: "Success", msg:EmailText });
    } catch (err) {
        res.status(400).json({ status: "Failed", data: err });
    }
  };
   










   

   
