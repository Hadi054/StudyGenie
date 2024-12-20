const tableBody = document.getElementById('data-body');
const maxRowsToShow = 20;
console.log("his")

// function populateTable() {
//   for (let i = 0; i < data.length; i++) {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${data[i].examId}</td>
//       <td>${data[i].class}</td>
//       <td>${data[i].subject}</td>
//       <td>${data[i].chapter}</td>
//       <td>${data[i].marks}</td>
//       <td><a href="#">View</a></td>
//     `;
//     tableBody.appendChild(row);
//   }
// }
// ansbtn=document.getElementById('view-button')
// document.addEventListener('click', function(event) {
//     // Check if the clicked element has the class 'view-button'
//     if (event.target.classList.contains('view-button')) {
//         // Get the value of the 'data-quizid' attribute
//         console.log("his")

//         const quizid = event.target.getAttribute('data-quizid');
//         answer(quizid);
//     }
// });

function showLimitedRows() {
  const rows = tableBody.querySelectorAll('tr');
  if (rows.length > maxRowsToShow) {
    rows[maxRowsToShow - 1].classList.add('last-row');
  }
}


showLimitedRows();

function answerHistory(examId){
    console.log("Hi")
    
    console.log(examId)
    window.location.href=`/answerpage?id=${examId}`
}














