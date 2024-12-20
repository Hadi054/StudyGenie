let questionid = 410;

//connect to confirm button
  const confirmBtn = document.getElementById('confirm_btn');
  // Add an event listener to the "Confirm" button
  confirmBtn.addEventListener('click', () => {
    // Get the selected values from each dropdown
    const examLevel = document.getElementById('exam_level_select').value;
    const examSubject = document.getElementById('exam_subject_select').value;
    const examChapter = document.getElementById('exam_chapter_select').value;
    const examType = document.getElementById('exam_type_select').value;
    const examYear = document.getElementById('exam_year_select').value;


// find the exam level
    if(examLevel==="psc"){
        questionid = Number(questionid.toString()+"05");
    }
    else if(examLevel==="jsc"){
        questionid = Number(questionid.toString()+"08");
    }
    else if(examLevel==="ssc"){
        questionid = Number(questionid.toString()+"10");
    }
    else if(examLevel==="hsc"){
        questionid = Number(questionid.toString()+"12");
    }


// find the subject
    if(examSubject==="bangla"){
        questionid = Number(questionid.toString()+"101");
    }
    else if(examSubject==="ict"){
        questionid = Number(questionid.toString()+"102");
    }
    else if(examSubject==="physics"){
        questionid = Number(questionid.toString()+"103");
    }
// find the chpater
    if(examChapter==="1"){
        questionid = Number(questionid.toString()+"01");
    }
     else if(examChapter==="2"){
        questionid = Number(questionid.toString()+"01");
    }
    else if(examChapter==="all"){
        questionid = Number(questionid.toString()+"00");
    } 


    // find the question type
    if(examType==="cq"){
        questionid = Number(questionid.toString()+"01");
    }
    else if(examType==="mcq"){
        questionid = Number(questionid.toString()+"02");
    }

    console.log(questionid);
    window.location.href = "/quiz/"+questionid;

    // year 
    // if(examYear==="none"){
    //     window.location = "/quiz/"+questionid;
    // }
    // else{
    //     examYear = Number(examYear);
    //     console.log(typeof examYear)
    //     // window.location = "/quiz/"+questionid + "?inteverParam = " +examYear;
    // }
    

  });