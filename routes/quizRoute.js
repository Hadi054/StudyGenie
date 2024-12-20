const express = require('express');
const router = new express.Router();
const hbs = require("hbs");
const csvtojson = require('csvtojson');
const quizQuestion = require("../models/userSchema").a;
const Result = require("../models/userSchema").b;

const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
const verifyjwt = require("../jwtverify")


const Reg = require("../models/people.js").v1;
const Info = require("../models/people.js").v2;

hbs.registerHelper('inc', function (value) {
  return parseInt(value) + 1;
});


router.get('/uploadquiz', [verifyjwt],async (req, res) => {
  user=req.payload;

	const userinfo = await Reg.findById(user);
    console.log(userinfo.isadmin)
    if(userinfo.isadmin==true)
    res.render("uploadquiz")
    else
    res.send("No admin access")
})

router.post('/upload', upload.single('csv'), async (req, res) => {
  try {
    const jsonArray = await csvtojson().fromFile(req.file.path);

    await quizQuestion.insertMany(jsonArray);

    res.send('CSV data uploaded successfully!');
  } catch (err) {
    res.send('Error uploading CSV data: ' + err);
  }
});

router.get('/examModal', [verifyjwt], async (req, res) => {
  if (req.payload == 0) {
    res.render("examModal", {
      isloggedin: false
    });
  }
  else {
    user = req.payload;
    const userinfo = await Reg.findById(user);
    const extra = await Info.findById(user);

    // const choicearray = extra.choices[0].split(',');
    if (extra.img.data)
      extra.img.data = Buffer.from(extra.img.data).toString('base64')
    res.render("examModal", {
      userinfo, extra,
      isloggedin: true
    });
  }

})

router.get('/quiz/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const qnsinformationValue = req.params.id;
    const qnsinformationValuePolynomial = Number(qnsinformationValue) + 1;
    const result = await quizQuestion.find({});

    const results = await quizQuestion.find({ qnsinformation: Number(qnsinformationValue) });
    if (results.length <= 0) {
      throw new Error("No qns information found");
    }
    const resultsPolynomial = await quizQuestion.find({ qnsinformation: qnsinformationValuePolynomial });
    let randomItems = [];
    let indices = [];

    let randomItem = resultsPolynomial[Math.floor(Math.random() * resultsPolynomial.length)];
    let polynomialMcq = [randomItem];

    while (randomItems.length < 24) {
      let index = Math.floor(Math.random() * results.length);
      if (!indices.includes(index)) {
        indices.push(index);
        randomItems.push(results[index]);
      }
    }
    hbs.registerHelper('inc', function (value) {
      return parseInt(value) + 1;
    });
    const subject = qnsinformationValue.slice(5, 8);
    const chapter = qnsinformationValue.slice(8, 10);
    var quizclass = qnsinformationValue.slice(3, 5);

    var chapterNumber = "Full Book"
    var subjectName = "বাংলা"
    if (subject === "101") { subjectName = "বাংলা ১ম পত্র"; }
    else if (subject === "103") { subjectName = "পদার্থ বিজ্ঞান ১ম পত্র"; }
    else if (subject === "102") { subjectName = "তথ্য ও যোগাযোগ প্রযুক্তি"; }
    if (chapter !== "00") { chapterNumber = "Chpater " + chapter };
    examinfo = { chapterNumber, subjectName, quizclass }
    const randomItemsString = JSON.stringify(randomItems);
    const polynomialMcqString = JSON.stringify(polynomialMcq);
    res.status(200).render("quiz", { randomItems, polynomialMcq, subjectName, chapterNumber, randomItemsString, polynomialMcqString, examinfo });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }


})


router.post("/examResult", [verifyjwt], async (req, res) => {
  console.log(req.body)
  const { email, randomItems, polynomialMcq, ...answers } = req.body; // Using object destructuring to separate email from answers
  let quizResult = 0;



  for (const item of Object.keys(answers)) {
    try {
      const findTheQuestion = await quizQuestion.findOne({ _id: item });
      if (findTheQuestion.correct === answers[item]) {
        quizResult = quizResult + 1;
      }

    } catch (err) {
      console.error("Error:", err);
    }
  }
  randomquiz = JSON.parse(randomItems)

  polynomialquiz = JSON.parse(polynomialMcq)
  console.log(polynomialquiz)
  user = req.payload;
  const userinfo = await Reg.findById(user);

  random = []
  poly = []
  for (i = 0; i < randomquiz.length; i++)
    random.push(randomquiz[i]._id);
  for (i = 0; i < polynomialquiz.length; i++)
    poly.push(polynomialquiz[i]._id);
  const resultPush = new Result({
    userid: userinfo._id,
    random: random,
    poly: poly,
    result: quizResult
  })
  resultIn = await resultPush.save();

  if (req.payload == 0) {
    res.render("examResult", { quizResult, randomItems, polynomialMcq, isloggedin: false });

  }
  else {

    const extra = await Info.findById(user);

    // const choicearray = extra.choices[0].split(',');
    if (extra.img.data)
      extra.img.data = Buffer.from(extra.img.data).toString('base64')
    res.render("examResult", { userinfo, extra, quizResult, randomItems, polynomialMcq, isloggedin: true });


  }
});

router.post('/answer', [verifyjwt], async (req, res) => {

  const { randomItems, polynomialMcq } = req.body;
  if (req.payload == 0) {
    res.render("answer", { randomItems: JSON.parse(randomItems), polynomialMcq: JSON.parse(polynomialMcq[0]), isloggedin: false })
  }
  else {
    user = req.payload;
    const userinfo = await Reg.findById(user);
    const extra = await Info.findById(user);
    // const choicearray = extra.choices[0].split(',');
    console.log(polynomialMcq)
    res.render("answer", { randomItems: JSON.parse(randomItems), polynomialMcq: JSON.parse(polynomialMcq), userinfo, extra, isloggedin: true })

  }

})


module.exports = router;