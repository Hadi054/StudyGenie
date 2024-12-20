const jwt= require("jsonwebtoken");

async function verifyJWT(req,res,next){
    if(req.cookies.jwtoken){
        const ver= jwt.verify(req.cookies.jwtoken, "ABCD");
        req.payload=ver;
        next();
     }
    else
    {
req.payload=0;
next();
    }
     
}
module.exports =verifyJWT;