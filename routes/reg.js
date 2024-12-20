const express = require('express');
const router = express.Router()
const Reg = require("../models/people.js").v1;
const Info = require("../models/people.js").v2;
router.get("/",(req,res)=>{
    res.render("reg");
});
router.post("/",async (req,res)=>{
    flag=0 
    try{
        
         action = req.body.action;

        console.log(req.body);
        if(action=='main-save')
        {console.log(req.body.email);
        const regemp= new Reg({
            email:req.body.email,
            username:req.body.username,
            password:req.body.password,
            confirmpassword:req.body.confirmpassword,
            img:{
                data:"",
                contentType:""
            }
        })
        const registered= await regemp.save();
        console.log(registered);
        id=registered._id.toString();

    }
        else
        {              
            console.log(req.body.classoption);
            const reginfo= new Info({
                _id:id,
                class:req.body.classoption,
                dept:req.body.deptoption,
                // choices:req.body.choicearray
            })
            const registeredinfo= await reginfo.save();
            console.log(registeredinfo);
            flag=1;  
            res.redirect("/login");
        } 
                  
  
    }
    catch(error){
        res.status(400).send(error);
    }
});
module.exports = router