
inputevent = document.getElementsByClassName("input-event");
inputeventusername = document.getElementsByClassName("input-event-username");
prousername =document.getElementsByClassName("profile-data-username")
profiledata = document.getElementsByClassName("profile-data");
imginput=document.getElementById("file-input")
dpimg = document.getElementById("dpimg")
btnhadix= document.getElementById("btn-hadix")
btnhadi= document.getElementById("btn-hadi")


var selectedimgpath;

function updateimg(){
  updateDB=document.getElementById('dp-name-update')
  edit=document.getElementById('dp-name-edit')
  updateDB.style.display="block"
  edit.style.display="none"
  uname=document.getElementById("uname")
  uname.style.display="block"
  Puname=document.getElementById("Puname")
  Puname.style.display="none"
  uname.value=Puname.innerText
  console.log(Puname)

  dpimg.addEventListener("click", function() {
    imginput.click(); // Trigger the click event of the file input
  });
imginput.addEventListener("change", function(event) {
    var selectedFile = event.target.files[0];
    selectedimgpath=selectedFile
    selectedimgpathsend = URL.createObjectURL(selectedFile);   
    dpimg.src=selectedimgpathsend
  });

}

function updateimgDB(){
  uname=document.getElementById("uname").value
  updateData = new FormData() 
  updateData.append("uname",uname)
  updateData.append("image",selectedimgpath)
  fetch('/update', {
    method: 'POST',
    body: updateData
  }).then((response) => {
    if (response.ok) {
      // Redirect on success
      window.location.href = '/dashboard';
    } else {
      // Handle error response
      console.log('Error:', response.status);
    }
  })
  .catch((error) => {
    console.log('Error:', error);
  })

}

function updatefname(){
  update("#First-name","#fname","#ufname")
}

function fnameDB(){
  DB("#First-name","#fname","fname")
}

function updatelname(){

  update("#Last-name","#lname","#ulname")
}

function lnameDB(){

  DB("#Last-name","#lname","lname")
}

function EmailDB(){
  DB("#Email","#email","email")
}

function updateEmail(){
  update("#Email","#email","#uemail")
}
function updateClass(){
  update("#Class","#classSelection","#uclass")
}
function ClassDB(){
  DB("#Class","#classSelection","class")
}
function DeptDB(){
  DB("#Dept","#classSelection","dept")
}
function choiceDB(){
  DB("#Choice","#classSelection","choice")
}
function updatedept(){
  update("#Dept","#classSelection","#udept")
}
function updatechoice(){
  update("#Choice","#classSelection","#uchoice")
}
function updatephone(){
  update("#Phone","#phone","#uphone")
}
function passDB(){
  DB("#Pass","#pass","password")
}
function updatepass(){
  update("#Pass","#pass","#upass")
}
function phoneDB(){
  DB("#Phone","#phone","phone")
}
function update(mainDivid,inputdiv,showdiv){
  mainDiv= document.querySelector(mainDivid)
  forupdate=mainDiv.querySelector("#for-update")
  initial=mainDiv.querySelector("#initial")
  input=forupdate.querySelector(inputdiv)
  
  show=initial.querySelector(showdiv)
  // showText=show.innerText
  // input.value=showText
  forupdate.style.display="grid"
  initial.style.display="none"
}

function DB(mainDivid,inputdiv,name){
  mainDiv= document.querySelector(mainDivid)
  forupdate=mainDiv.querySelector("#for-update")
  initial=mainDiv.querySelector("#initial")
  input=forupdate.querySelector(inputdiv)

  forupdate.style.display="none"
  initial.style.display="flex"
  updateData = new FormData() 
  updateData.append(name,input.value)
  fetch('/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(updateData).toString()
  }).then((response) => {
    if (response.ok) {
      // Redirect on success
      window.location.href = '/dashboard';
    } else {
      // Handle error response
      console.log('Error:', response.status);
    }
  })
  .catch((error) => {
    console.log('Error:', error);
  })
}
function Data(mainDivid,inputdiv,name)
{
  mainDiv= document.querySelector(mainDivid)
  forupdate=mainDiv.querySelector("#for-update")
  initial=mainDiv.querySelector("#initial")
  input=forupdate.querySelector(inputdiv)
  console.log(input.value)
}
// table databse

// const data = [
//   // Sample data - Replace this with your actual data
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
//   { examId: 1, class: 'Class A', subject: 'Mathematics', chapter: 'Algebra', marks: 95 },
  
  
//   // Add more data here as needed
// ];

