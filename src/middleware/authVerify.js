let jwt = require('jsonwebtoken');

module.exports=(req,res, next)=>{
    let token = req.headers['token'];
    jwt.verify(token, "123-ABC-xyz", (err, decoded)=>{
        if(err){
            res.status(401).json({status:"Unauthorized!"})
        }else{

            //Get Username from Decoded token and Added with req header
            let useremail = decoded['data'];
            console.log(useremail);
            req.headers.useremail = useremail;
            next();
        }
    })
}