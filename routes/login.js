const express = require('express');
const router = express.Router()
const Reg = require("../models/people.js").v1;

router.get("/",(req,res)=>{
    res.render("login");
});
router.post("/",async (req,res)=>{
    try{
        let token;
        const em=req.body.logEmail;
        const ps=req.body.logPassword;
        console.log(em);
        const userinfo = await Reg.findOne({email:em});
        req.user=userinfo;
        console.log(userinfo._id);
        if(userinfo.password===ps)
        {       
             token =await userinfo.generateAuthToken();
                 res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                 })
             req.token=token
             if(userinfo.isadmin==false)
                {
                    res.redirect("/");
                }
            else
            res.redirect("/admin");
        }
        else
                res.status(400).send("Invalid");
    }
    catch(error){
        res.status(400).send(error);
    }
});

module.exports = router