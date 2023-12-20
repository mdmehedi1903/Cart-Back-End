const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    id: {type: String},
    useremail: {type: String},
    title: {type: String},
    short_des: {type: String},
    price: {type: String},
    image: {type: String}
},
{
    timestamps: false,
    versionKey: false
}
);
 


const ProductModel = mongoose.model('products', DataSchema);
module.exports=ProductModel;


