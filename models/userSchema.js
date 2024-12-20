const mongoose = require('mongoose');

// Define the schema
const mcqQuestionSchemaData = new mongoose.Schema({
    qnsinformation:{
        type: Number,
        required: true,
    },
    question:{
        type: String,
        required: true,
    },
    option1:{
        type: String,
        required: true,
    },
    option2:{
        type: String,
        required: true,
        
    },
    option3:{
        type: String,
        required: true,
        
    },
    option4:{
        type: String,
        required: true,
    },
    polynomial1:{
        type: String
    },
    polynomial2:{
        type: String
    },
    polynomial3:{
        type: String
    },
    correct:{
        type: String,
        required: true,
    },
    history:{
        type: [Number]
    }
});
const quizResult=new mongoose.Schema({
    userid:String,
    random:{
        type:[String]
    },
    poly:{
        type:[String]
    },
    result:{
        type:Number
    }
});
// Create the model
const Quiz = mongoose.model("Quiz", mcqQuestionSchemaData);
const Result = mongoose.model("Results", quizResult);
module.exports = {a:Quiz,b:Result};