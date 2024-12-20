const express = require('express');
const verifyjwt = require("../jwtverify.js")
const Book = require("../models/people.js").v3;
const Reg = require("../models/people.js").v1;
const Info = require("../models/people.js").v2;
const Bookmark = require("../models/people.js").v7;

const router = express.Router()
router.get("/",[verifyjwt], async (req,res)=>{
    var userinfo,extra,numberofBooks;
    var user;
    if(req.payload!=0)
    {
      user=req.payload;
      console.log(user)
     userinfo = await Reg.findById(user._id);
     extra = await Info.findById(user._id);
    console.log(userinfo)
    //  choicearray = extra.choices[0].split(',');
  }
     itemsPerPage = 10; // Number of items to display per page
     currentPage = req.query.page ? parseInt(req.query.page) : 1; 
    // Get the current page number from the query parameter
    
        subFilter = req.query.sub || null;
    if(req.query.sub=="All")
        subFilter=null
    classFilter = req.query.class || null;
    if(req.query.class=="All")
        classFilter=null
        searchQuery = req.query.search ? req.query.search.trim() : null;
    const filter = {};
    if (subFilter) {
        console.log(subFilter)
      filter.subject = subFilter.toString();
    }
    if (classFilter) {
        console.log(classFilter)
        filter.class = classFilter.toString();
    }
    console.log(searchQuery)
    if (searchQuery) {
        console.log(searchQuery)
        console.log(new RegExp(searchQuery, 'i'));

        // Use a regular expression to make the search case-insensitive and allow partial matches
        filter.$or = [
          { name: new RegExp(searchQuery, 'i')},
          { class: new RegExp(searchQuery, 'i') },
          { subject: new RegExp(searchQuery, 'i') },
        ];
      }
    console.log(filter)
    popularbook= await Book.find().limit(5)
    for (var i = 0; i < popularbook.length; i++) {
      popularbook[i].img.data=Buffer.from(popularbook[i].img.data).toString('base64')
    }
    if(req.payload!=0){
       bminfo= await Bookmark.find({userid:user})
    }

    // console.log(bminfo[0].bookid.length)
    Book.find(filter)
      .skip((currentPage - 1) * itemsPerPage) // Skip the records already displayed on previous pages
      .limit(itemsPerPage) // Limit the number of records to display per page
      .then((book) => {
        Book.countDocuments(filter).then((x)=>{
          numberofBooks=x
          maxPage=Math.ceil(numberofBooks/10);
            for (var i = 0; i < book.length; i++) {
              book[i].img.data=Buffer.from(book[i].img.data).toString('base64')
              book[i].isbookmarked=false;
              if(req.payload!=0)
              {
                for(j=0;j<bminfo[0].bookid.length;j++)
                {
                  if(bminfo[0].bookid[j]==book[i]._id.toString())
                  {          
                    console.log(bminfo[0].bookid[j]==book[i]._id.toString())
                    book[i].isbookmarked=true;
                    break;
                  }
                }
              }
              
          }
          
        


       
        if(req.payload==0)
        {
            res.render("books",{book,currentPage,subFilter,classFilter,maxPage,popularbook,
                isloggedin:false}); 
        }
        else
        { if(extra.img.data)
          extra.img.data=Buffer.from(extra.img.data).toString('base64')
            res.render("books",{userinfo,extra,book,currentPage,subFilter,classFilter,maxPage,popularbook,
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
module.exports = router