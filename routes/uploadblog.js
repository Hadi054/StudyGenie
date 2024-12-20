const express = require('express');
const router = express.Router()
const Blog = require("../models/people.js").v4;
const multer = require('multer');
const path =require("path");
const fs=require("fs")
const Reg = require("../models/people.js").v1;
const verifyJWT = require('../jwtverify.js');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});
  var uploadNewBlog = multer({ storage: storage });
  router.get("/",[verifyJWT],async (req,res)=>{
	user=req.payload;

	const userinfo = await Reg.findById(user);
    console.log(userinfo.isadmin)
    if(userinfo.isadmin==true)
    res.render("uploadblog");
    else
    res.send("No admin access")
});
router.post('/', uploadNewBlog.single('image'), async(req, res, next) => {
	var obj;
	userinfo= await Reg.findOne({_id: req.body.Writer})
	if(req.file){
		var obj = new Blog({
			name: req.body.name,
			topic: req.body.topic,
			Writer:userinfo.username,
			img: {
				data: fs.readFileSync(path.join(__dirname +'/../uploads/' + req.file.filename)),
				contentType: 'image/png/jpg'
			},
			content: req.body.content,
		})
	}
	else
	{
		var obj = new Blog({
			name: req.body.name,
			topic: req.body.topic,
			Writer:userinfo.username,
			content: req.body.content,
		})
	}
	
	console.log(userinfo.username)
    const objj = await obj.save();
    res.redirect('/blog');


// next();
});
module.exports = router;