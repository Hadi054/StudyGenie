const express= require("express");
const dotenv=require("dotenv");
const mongoose= require("mongoose");
const path =require("path");
const hbs= require("hbs");
const multer = require('multer');


const fs=require("fs")
const jwt= require("jsonwebtoken");
const bodyparser=require("body-parser")
const cookieParser = require("cookie-parser");
const verifyjwt = require("./jwtverify")
const app = express();
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now()); // Define the filename for the uploaded file
  },
});

const uploaddp = multer({ storage }); 

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
dotenv.config();

const static_path = path.join(__dirname);
const temp_path= path.join(__dirname,"/templates/views");
const part_path= path.join(__dirname,"/templates/partials");
const Book = require("./models/people.js").v3;
const Blog = require("./models/people.js").v4;
const News = require("./models/people.js").v5;
const Note = require("./models/people.js").v6;
const Result = require("./models/userSchema").b;
const Reg = require("./models/people.js").v1;
const Info = require("./models/people.js").v2;
const quizQuestion = require("./models/userSchema").a;
const Bookmark = require("./models/people.js").v7;
app.use(express.static('public'));


app.set("view engine","hbs");
app.set("views",temp_path);
hbs.registerPartials(part_path);

const booksRoute= require('./routes/bookRoute')
app.use('/books',booksRoute)

const uploadbooksRoute= require('./routes/uploadbook')
app.use('/uploadbook',uploadbooksRoute)

// const uploadquizRoute= require('./routes/uploadquiz')
// app.use('/uploadquiz', uploadquizRoute)


const quizRoute= require('./routes/quizRoute')
app.use(quizRoute);

const loginRoute = require('./routes/login')
app.use('/login', loginRoute)

const regRoute = require('./routes/reg')
app.use('/register', regRoute)

const uploadBlogRoute = require('./routes/uploadblog')
app.use('/uploadblog', uploadBlogRoute)

const blogRoute = require("./routes/blogRoute")
app.use('/blog', blogRoute)

const newsRoute = require("./routes/newsletterRoute")
app.use('/newsletter', newsRoute)
const noteRoute = require("./routes/noteRoute")
app.use('/notes', noteRoute)
// const articleRoute = require("./routes/articleRoute")
// app.use('/article', articleRoute)
app.get('/article',[verifyjwt],async (req, res) => {
    const blogpage = await Blog.findOne({_id: req.query.id});
    if( blogpage.img.data)
    blogpage.img.data=Buffer.from(blogpage.img.data).toString('base64')

    if(req.payload==0)
    {
        res.render("single_article",{blogpage,
            isloggedin:false}); 
    }
    else
    {
        user=req.payload;
    const userinfo = await Reg.findById(user);
    const extra = await Info.findById(user);

    // const choicearray = extra.choices[0].split(',');
    if(extra.img.data)
    extra.img.data=Buffer.from(extra.img.data).toString('base64')
    res.render("single_article",{userinfo,extra,blogpage,
       isloggedin:true});
    }
})

app.get('/news',[verifyjwt],async (req, res) => {
    const blogpage = await News.findOne({_id: req.query.id});
    blogpage.img.data=Buffer.from(blogpage.img.data).toString('base64')

    if(req.payload==0)
    {
        res.render("single_article",{blogpage,
            isloggedin:false}); 
    }
    else
    {
        user=req.payload;
    const userinfo = await Reg.findById(user);
    const extra = await Info.findById(user);

    // const choicearray = extra.choices[0].split(',');
    if(extra.img.data)
    extra.img.data=Buffer.from(extra.img.data).toString('base64')
    res.render("single_article",{userinfo,extra,blogpage,
       isloggedin:true});
    }
})


app.get("/",[verifyjwt], async (req,res)=>{
    console.log(req.payload._id);
    popularblog= await Blog.find().sort({ votes: -1 }).limit(6)
    for (var i = 0; i < popularblog.length; i++) {
      popularblog[i].img.data=Buffer.from(popularblog[i].img.data).toString('base64')
      const date =  popularblog[i].date; 

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
    popularblog[i].formattedDate=formattedDate;
      popularblog[i].short = getFirstWords(popularblog[i].content, 10);
    }
    popularnews= await News.find().sort({ date: -1 }).limit(6)
    for (var i = 0; i < popularblog.length; i++) {
        popularnews[i].img.data=Buffer.from(popularnews[i].img.data).toString('base64')

        popularnews[i].short = getFirstWords(popularnews[i].content, 10);
        const date =  popularnews[i].date; 

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
        popularnews[i].formattedDate=formattedDate;

    }
    if(req.payload==0)
    {
        res.render("index",{popularblog,popularnews,
            isloggedin:false}); 
    }
    else
    {
        user=req.payload;
    const userinfo = await Reg.findById(user);
    const extra = await Info.findById(user);

    // const choicearray = extra.choices[0].split(',');
    if(extra.img.data)
    extra.img.data=Buffer.from(extra.img.data).toString('base64')
    res.render("index",{userinfo,extra,popularblog,popularnews,
       isloggedin:true});
    }
});
function getFirstWords(text, n) {
    const words = text.split(' ');
    return words.slice(0, n).join(' ');
  }
app.get('/getBook', async (req, res) => {
    try {
        console.log(req.query)
        const doc = await Book.findOne({_id: req.query.id});
        const contentType = "application/pdf";
        if (!doc) {
            res.status(404).send('Book not found');
        } else {
            res.contentType("application/pdf");
            res.send(doc.book.data);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
app.get('/getNote', async (req, res) => {
    try {
        console.log(req.query)
        const doc = await Note.findOne({_id: req.query.id});
        const contentType = "application/pdf";
        if (!doc) {
            res.status(404).send('Note not found');
        } else {
            res.contentType("application/pdf");
            res.send(doc.book.data);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
app.get('/download', async (req, res) => {
    try {
        console.log(req.query)
        const doc = await Book.findOne({_id: req.query.id});
        console.log(doc)
        const contentType = "application/pdf";
        if (!doc) {
            res.status(404).send('Book not found');
        } else {
            
            res.setHeader('Content-disposition', 'attachment; filename=downloaded-file.pdf'); 
            res.setHeader('Content-type', 'application/pdf');

            res.send(doc.book.data);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
app.get('/downloadnote', async (req, res) => {
    try {
        console.log(req.query)
        const doc = await Note.findOne({_id: req.query.id});
        const contentType = "application/pdf";
        if (!doc) {
            // Handle the case where no document was found
            res.status(404).send('Book not found');
        } else {
            
            res.setHeader('Content-disposition', 'attachment; filename=downloaded-file.pdf'); // Replace "downloaded-file.ext" with the desired filename and extension
  res.setHeader('Content-type', 'application/pdf');
            res.send(doc.book.data);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
app.get("/jobs",(req,res)=>{
    res.render("jobs");
})

app.get("/notes",(req,res)=>{
    res.render("notes");
});
// app.get("/blog",[verifyjwt], async (req,res)=>{
//     if(req.payload==0)
//     {
//         res.render("blogs",{
//             isloggedin:false}); 
//     }
//     else
//     {
//         user=req.payload;
//     const userinfo = await Reg.findById(user);
//     const extra = await Info.findById(user);
//     const choicearray = extra.choices[0].split(',');

//     res.render("blogs",{userinfo,extra,choicearray,
//        isloggedin:true});
//     }
// })
app.get("/dashboard",[verifyjwt], async (req,res)=>{
    user=req.payload;
    const userinfo = await Reg.findById(user);
    const extra = await Info.findById(user);
    // const choicearray = extra.choices[0].split(',');
    // console.log(choicearray)
    if(extra)
    {if(extra.img.data)

    extra.img.data=Buffer.from(extra.img.data).toString('base64')
}
    res.render("dashboard",{userinfo,extra
        ,
       isloggedin:true});
    
});
app.get("/examhistory",[verifyjwt], async (req,res)=>{
    console.log(req.payload._id);

    user=req.payload;
    const userinfo = await Reg.findById(user);
    const extra = await Info.findById(user);
    // const choicearray = extra.choices[0].split(',');
    
    const resultInfo = await Result.find({userid:user})
    
    console.log(resultInfo)
    if(resultInfo)
    {
    console.log(resultInfo[0].userid)
    
    for( i=0;i<resultInfo.length;i++)
    {
        quizinfo= await quizQuestion.findById(resultInfo[i].random[0])
        console.log(quizinfo.qnsinformation.toString())
        qnsinformation=quizinfo.qnsinformation.toString()
        const subject =qnsinformation.slice(5,8);
        const chapter = qnsinformation.slice(8,10);
        var quizclass = qnsinformation.slice(3,5);
        var chapterNumber = "Full Book" 
        var subjectName = "বাংলা" 
        if(subject === "101") {subjectName = "বাংলা ১ম পত্র";}
        else if(subject === "103") {subjectName = "পদার্থ বিজ্ঞান ১ম পত্র";}
        else if(subject === "102") {subjectName = "তথ্য ও যোগাযোগ প্রযুক্তি";}
        if(chapter !== "00") {chapterNumber = "Chpater "+ chapter };
        resultInfo[i].subject=subjectName;
        resultInfo[i].chapter=chapterNumber;
        resultInfo[i].class=quizclass;

    }
    resultinfoStore=[]
    for( i=resultInfo.length-1;i>=0;i--)
    {
        resultinfoStore.push(resultInfo[i])
    }
    }
    if(extra)
    {if(extra.img.data)

    extra.img.data=Buffer.from(extra.img.data).toString('base64')
}
    res.render("examhistory",{userinfo,extra,resultInfo,resultinfoStore,
       isloggedin:true});
    
});
app.get("/logout",async (req,res)=>{
try{
res.clearCookie("jwtoken");
console.log("cleared")
res.render("login",{isloggedin:false})
}
catch(error){
console.log(error);
}
})
  
let id="";


app.post("/update",[verifyjwt,uploaddp.single('image')], async (req,res)=>{
    if(req.file)
    console.log("Body",req.file.filename);
console.log(req.body)
    const update1 = {
        email:req.body.email,
        username:req.body.uname, password:req.body.password
      };
    
      const update2 = {
        fname:req.body.fname,
        lname:req.body.lname,
        class:req.body.class,
        dept:req.body.dept, 
        pnum:req.body.phone, 
        choice:req.body.choice, 
         
      };
      update3=null
      if(req.file)
      { update3 ={
        img:{
			data: fs.readFileSync(path.join(__dirname +'/uploads/' + req.file.filename)),
			contentType: 'image/png/jpg'
		}, 
      }}
      const filter = { _id: req.payload };
      
      const result1 = await Reg.updateOne(filter, update1);
      const result2 = await Info.updateOne(filter, update2);
      if(update3)
      {result3 = await Info.updateOne(filter, update3);}
      console.log(result2)
      res.redirect('/dashboard');
})


function showInfo() {
    const infoDiv = document.querySelector('.info');
    infoDiv.style.display = 'block';
  }
  
  function hideInfo() {
    const infoDiv = document.querySelector('.info');
    infoDiv.style.display = 'none';
  }

app.get('/answerpage',[verifyjwt] ,async (req, res)=>{
const quizpage = await Result.findOne({_id: req.query.id});
console.log(quizpage.random)
randomItems=[]
polynomialMcq=[]
for(i=0;i<quizpage.random.length;i++)
{
    var thatquiz= await quizQuestion.findOne({_id:quizpage.random[i]})
    console.log(thatquiz)
    randomItems.push(thatquiz)
}
for(i=0;i<quizpage.poly.length;i++)
{
   var thatquiz= await quizQuestion.findOne({_id:quizpage.poly[i]})
    console.log(thatquiz)
    polynomialMcq.push(thatquiz)
}
//const {randomItems,polynomialMcq} = req.body;
if(req.payload==0)
{
    res.render("answer",{randomItems:JSON.parse(randomItems),polynomialMcq:JSON.parse(polynomialMcq[0]),isloggedin:false})
}
else
{
    user=req.payload;
const userinfo = await Reg.findById(user);
const extra = await Info.findById(user);
// const choicearray = extra.choices[0].split(',');
console.log(polynomialMcq)
res.render("answer",{randomItems:randomItems,polynomialMcq:polynomialMcq,userinfo,extra,isloggedin:true})

}

})
//admin access
app.get("/admin",[verifyjwt],async (req, res)=>{
    if(req.payload!=0)
    {user=req.payload;
    const userinfo = await Reg.findById(user);
    console.log(userinfo.isadmin)
    if(userinfo.isadmin==true)
    res.render("admin");
    else
    res.send("No admin access")}
        else
        res.send("No admin access")
})

// admin access ends

app.post("/bookmark",[verifyjwt],async (req, res)=>{
    user=req.payload;
    const userinfo = await Reg.findById(user);
    console.log(userinfo._id)
    console.log(req.body)
    if(user){
        const bminfo= await Bookmark.find({userid:user})
        if(bminfo.length==0)
        {
            bookmark = new Bookmark({ userid:user, bookid: [req.body.bookid] });
            await bookmark.save();
    
        }
        else
        {if(req.body.stat=="add")
            {bminfo[0].bookid.push(req.body.bookid)
                await bminfo[0].save();
            }
        else{
            bid=req.body.bookid
            const updatedBookmark = await Bookmark.findOneAndUpdate(
                { userid: user }, // Use "userid: user" instead of "user"
            { $pull: { bookid: req.body.bookid } },
            { new: true }
              );
              console.log(updatedBookmark)
    
        }
        }
    }
    
    // if(userinfo.isadmin==true)
    // res.render("admin");
    // else
    // res.send("No admin access")
})
mongoose.connect('mongodb://127.0.0.1/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Hi");
});


app.listen(3000,()=>{
    console.log("app port");
});