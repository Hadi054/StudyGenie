const express = require('express');
const router = express.Router()
const Book = require("../models/people.js").v3;
const multer = require('multer');
const path =require("path");
const Reg = require("../models/people.js").v1;

const fs=require("fs");
const verifyJWT = require('../jwtverify.js');
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});
  var uploadNewBook = multer({ storage: storage });
  router.get("/",[verifyJWT], async (req,res)=>{
	user=req.payload;

	const userinfo = await Reg.findById(user);
    console.log(userinfo.isadmin)
    if(userinfo.isadmin==true)
    res.render("uploadbook");
    else
    res.send("No admin access")
});
router.post('/', uploadNewBook.fields([
    {name: 'image', maxCount: 1},
    {name: 'book', maxCount: 1}
]), async(req, res, next) => {
    console.log(req.body)
	var obj = new Book({
		name: req.body.name,
		class: req.body.class,

		img: {
			data: fs.readFileSync(path.join("C:/Users/sbarn/Desktop/studyGenieUpdated" + '/uploads/' + req.files['image'][0].filename)),
			contentType: 'image/png/jpg'
		},
        book: {
            data : fs.readFileSync(path.join("C:/Users/sbarn/Desktop/studyGenieUpdated" + '/uploads/' + req.files['book'][0].filename)),
            contentType: 'book/pdf'
        }
	})
    const objj = await obj.save();

    res.send('uploaded');


// next();
});
module.exports = router;