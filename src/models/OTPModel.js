const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    useremail: {type: String},
    otp: {type: String}
},
{
    timestamps: false,
    versionKey: false
}
);



const OTPModel = mongoose.model('otps', DataSchema);
module.exports=OTPModel;