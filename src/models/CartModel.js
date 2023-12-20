const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    useremail: {type: String},
    productid: {type: String}
},
{
    timestamps: false,
    versionKey: false
}
);



const CartModel = mongoose.model('carts', DataSchema);
module.exports=CartModel;