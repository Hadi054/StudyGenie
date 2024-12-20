var replaybutton = document.getElementById("replayQuiz");
var answerPage = document.getElementById("answer_page");

replaybutton.addEventListener("click",() => {
    console.log("Replay button clicked");
    window.location = "/examModal";
})

console.log(randomItems);
console.log(polynomialMcq);

// answerPage.addEventListener("click",() => {
//     // window.location ="/answer";
//     console.log(randomItems);
//     console.log(polynomialMcq);

// })