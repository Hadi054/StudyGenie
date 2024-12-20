const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');


const peopleSchema= mongoose.Schema(
    {
        email:{
            type: String,
            required: true,

        },
        username:{
            type: String,
            required: true,

        },
        password:{
            type: String,
            required: true,

        },
        confirmpassword:{
            type: String,
            required: true,

        },
       isadmin: {
        type: Boolean,
        default: false
       },
        tokens:[
            {
                token:{
                    type: String,
                    required: true
                }
            }
        ]
    }
)
const infoSchema= mongoose.Schema(
    {
        _id:{
            type: String,
            required: true,
        },
        class:{
            type: String,
            required: true,

        },
        dept:{
            type: String,

        },
        choice:{
            type: String,
        },
        img:
        {
            data: Buffer,
            contentType: String,
        },
        fname:{
            type:String
        },
        lname:{
            type:String
        },
        pnum:{
            type:String
        }

    }
)
peopleSchema.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id:this._id }, "ABCD");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}
var bookschema = new mongoose.Schema({
	name: String,
	class: String,
    subject: {
        type: String,
        default: ""
    },
    Writer: {
        type: String,
        default: "NCTB"
    },
	img:
	{
		data: Buffer,
		contentType: String
	},
    book:
    {
        data: Buffer,
        contentType: String,
    },
    date:{
        type: String,
        default: Date.now()
    },
    version : String
    
});
var bookmark= new mongoose.Schema({
    userid:String,
    bookid:[String]
})
var noteschema = new mongoose.Schema({
	name: String,
	class: String,
    subject: {
        type: String,
        default: ""
    },
    Writer: {
        type: String,
        default: "NCTB"
    },
	img:
	{
		data: Buffer,
		contentType: String
	},
    book:
    {
        data: Buffer,
        contentType: String,
    },

    version : String
    
});



var blogschema = new mongoose.Schema({
	name: String,
    topic: {
            type: [String],
        default: ""
    },
    Writer: {
        type: String,
        default: "NCTB"
    },
	img:
	{
		data: Buffer,
		contentType: String,
	},
    content:
    {
        type: String,
    },
    date:
    {
        type: Date,
        default: Date.now()
    },
    votes:  {
        type: Number,
        default: 0
    },
    version : String 
});
var newschema = new mongoose.Schema({
	name: String,
    topic: {
            type: [String],
        default: ""
    },
    Writer: {
        type: String,
        default: "NCTB"
    },
	img:
	{
		data: Buffer,
		contentType: String
	},
    content:
    {
        type: String,
    },
    date:
    {
        type: Date,
        default: Date.now()
    },
    votes:  {
        type: Number,
        default: 0
    },
    version : String 
});

const Reg= new mongoose.model("People",peopleSchema);
const Info= new mongoose.model("Info",infoSchema);
const Book = new mongoose.model("Book", bookschema);
const Blog = new mongoose.model("Blog", blogschema);
const News = new mongoose.model("Newsletter", newschema);
const Note = new mongoose.model("Note", noteschema);
const bookamark= new mongoose.model("Bookmark",bookmark)
module.exports = {v1: Reg,v2:Info, v3: Book, v4: Blog, v5: News, v6 : Note, v7:bookamark};