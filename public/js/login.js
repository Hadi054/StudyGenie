
var emailbox=document.getElementById("email-box");
var maincon=document.getElementById("main-container");
var query=document.getElementById("query-container");
username=document.querySelector(".username-box");
password=document.querySelector(".password-box");
subbtn=document.querySelector(".btn-hadi");
confpass=document.querySelector(".confirm-password-box");
pass=document.getElementById("password").value;
cpass=document.getElementById("confirm-password").value;
function emailIn(){
    wrong=emailbox.querySelector(".wrong");
    email=document.getElementById("email").value;

    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(email.match(pattern))
    {
        username.classList.toggle("active");
        
        wrong.style.display="none";
    }
    else
    wrong.style.display="block";
  
}
function usernameIn(){
    user=document.getElementById("username").value;

    wrong=username.querySelector(".wrong");
    if(user!="")
    {password.classList.toggle("active");
    wrong.style.display="none";}
    else
    {
        wrong.style.display="block";
    }
}
function paswwordIn(){
    pass=document.getElementById("password").value;
    wrong=password.querySelector(".wrong");
    if(pass!="")
    {confpass.classList.toggle("active");
    wrong.style.display="none";}
    else
    wrong.style.display="block";

}
function confirmpaswwordIn(){
    wrong=confpass.querySelector(".wrong");
    pass=document.getElementById("password").value;
    cpass=document.getElementById("confirm-password").value;
    if(pass==cpass)
    {subbtn.classList.toggle("active");
    wrong.style.display="none";}
    else{
        wrong.style.display="block";
    }
}
regform=document.getElementById("regform");
function submitmain()
{
maincon.style.display='none';
query.style.animation='showup 3s';
query.style.display='block';
const em=regform.email.value;
const un=regform.username.value;
const ps=regform.password.value;
const cps=regform.confirmpaswword.value;
regFormData={em,un,ps,cps};
console.log(em);
fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(regFormData).toString()
  })
}  



let querycontainer=document.querySelector(".query-container");
 selectbtn=document.querySelector(".select-btn");
 optionscontainer=document.querySelector(".options");
 options=document.querySelectorAll(".option");
 selectbtnicon=document.querySelector(".icon");
 selectbtntxt=document.querySelector(".select-btn-txt");


 selectbtn.addEventListener("click",() =>{
    optionscontainer.classList.toggle("active");
    selectbtnicon.classList.toggle("active");
 });

 choice=document.querySelector(".choicechip")
querybtn=document.querySelector(".query-btn")



classoption=""
deptoption=""
choicearray=[]


deptselector=document.getElementById("dept-selector");
 options.forEach(option =>{
    option.addEventListener("click",()=>{
        selectedoption=option.innerText;
        classoption=selectedoption;
        console.log(selectedoption);
        selectbtntxt.innerText=selectedoption;
        optionscontainer.classList.remove("active");
        selectbtnicon.classList.remove("active");
        if(selectedoption =="SSC" || selectedoption =="HSC" || selectedoption =="Admission"){
            deptselector.style.display="block";
            querycontainer.style.height="40%";
            querybtn.style.display="none";

            if(selectedoption!="Admission")
            {
                choice.style.display="none";
                querycontainer.style.height="40%";

            }
        }
        else{
            deptselector.style.display="none";
            querycontainer.style.height="40%";
            choice.style.display="none";
            querybtn.style.display="block";

        }
    }
    )
 });




 deptselectbtn=document.querySelector(".dept-select-btn");
 deptoptionscontainer=document.querySelector(".dept-options");
 deptoptions=document.querySelectorAll(".dept-option");
 deptselectbtnicon=document.querySelector(".dept-icon");
 deptselectbtntxt=document.querySelector(".dept-select-btn-txt");


 deptselectbtn.addEventListener("click",() =>{
    deptoptionscontainer.classList.toggle("active");
    deptselectbtnicon.classList.toggle("active");
 });



choice=document.querySelector(".choicechip")
 deptoptions.forEach(option =>{
    option.addEventListener("click",()=>{
        var selectedoption=option.innerText;
        deptoption=selectedoption;
        console.log(selectedoption);
        deptselectbtntxt.innerText=selectedoption;
        deptoptionscontainer.classList.remove("active");
        deptselectbtnicon.classList.remove("active");
    //     if(classoption=="Admission")
    //     {querycontainer.style.height="77%";
    //    choice.style.display="block";
    //    querybtn.style.display="block";

    // }
    //    else
    //    {
    //     choice.style.display="none";

    //     querycontainer.style.height="55%";
    //     querybtn.style.display="block";

    //    }
       querycontainer.style.height="55%";
        querybtn.style.display="block";
     
    }
    )
 });
 

var choicechip=document.querySelectorAll(".choice-chip-button");
choicechip.forEach(chip=>{
    chip.addEventListener("click",()=>{
        chip.classList.toggle("active");
        choicearray.push(chip.innerText)
    })
})



function submitsec(){
    console.log(classoption);
    console.log(deptoption);
    console.log(choicearray);
    action='query-save';
    regFormData2={classoption,deptoption,choicearray,action};
    fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(regFormData2).toString()
      }).then((response) => {
        if (response.ok) {
          // Redirect on success
          window.location.href = '/login';
        } else {
          // Handle error response
          console.log('Error:', response.status);
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      })
}
