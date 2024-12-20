const express = require('express');
const verifyjwt = require("../jwtverify.js")
const Blog = require("../models/people.js").v4;
const Reg = require("../models/people.js").v1;
const Info = require("../models/people.js").v2;
const router = express.Router()
router.get("/",[verifyjwt], async (req,res)=>{
  filterset = new Set();

    
   
    category=req.query.category || null;
    if(req.query.category =="Select a category")
    category = null
  
    const filter={};
    if(category){
      filter.topic=category.toString();

      filterset.add(category)
    }
    
    var userinfo,extra,numberofBooks;
    if(req.payload!=0)
    {
      user=req.payload;
     userinfo = await Reg.findById(user._id);
     extra = await Info.findById(user._id);
  }
     itemsPerPage = 6; 
     currentPage = req.query.page ? parseInt(req.query.page) : 1; 
    allblogs=await Blog.find();
    for (var i = 0; i < allblogs.length; i++) 
    {
      filterset.add(String(allblogs[i].topic))
    }


    popularblog= await Blog.find().sort({ votes: -1 }).limit(5)
    
      for (var i = 0; i < popularblog.length; i++) {
        popularblog[i].img.data=Buffer.from(popularblog[i].img.data).toString('base64')
  
      }
    
    for (var i = 0; i < popularblog.length; i++) {

      popularblog[i].short = getFirstWords(popularblog[i].content, 10);
    }
    searchQuery = req.query.search ? req.query.search.trim() : null;
if (searchQuery) {
  

  // Use a regular expression to make the search case-insensitive and allow partial matches
  filter.$or = [
    { name: new RegExp(searchQuery, 'i')},
    { topic: { $in: [new RegExp(searchQuery, 'i')] } },
    { Writer: new RegExp(searchQuery, 'i') },
    {content: new RegExp(searchQuery, 'i')}
  ];
}

    Blog.find(filter).sort({ date: -1 })
      .skip((currentPage - 1) * itemsPerPage) 
      .limit(itemsPerPage) 
      .then((blog) => {
        Blog.countDocuments({}).then((x)=>{
          number=x
         maxPage=Math.ceil(number/6);
         
        for (var i = 0; i < blog.length; i++) {
          blog[i].maintopic=blog[i].topic[0]
          const date =  blog[i].date; 

          const options = {
            timeZone: 'Asia/Dhaka',
          weekday: 'short',   
          month: 'short',     
          day: 'numeric',    
          year: 'numeric',   
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',  
        };
        
        const formattedDate = date.toLocaleString('en-US', options);
        blog[i].formattedDate=formattedDate;
        if(blog[i].img.data)
            blog[i].img.data=Buffer.from(blog[i].img.data).toString('base64')
        }
        for (var i = 0; i < blog.length; i++) {
          // blog[i].img.data=Buffer.from(blog[i].img.data).toString('base64')
            blog[i].shorttitle=getFirstWords(blog[i].name, 6);
            blog[i].short = getFirstWords(blog[i].content, 10);
        }
        
        if(req.payload==0)
        {
            res.render("blogs",{popularblog,blog,currentPage,maxPage,filterset,category,
                isloggedin:false}); 
        }
        else
        {if(extra.img.data)
          extra.img.data=Buffer.from(extra.img.data).toString('base64')
            res.render("blogs",{popularblog,userinfo,extra,blog,currentPage,maxPage,filterset,category,
            isloggedin:true
        });
    }
         });
         
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
      });
    
});
function getFirstWords(text, n) {
    const words = text.split(' ');
    return words.slice(0, n).join(' ');
  }

module.exports = router