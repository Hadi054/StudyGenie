var selectedclass = localStorage.getItem('selectedclass') || '';
var selectedsub = localStorage.getItem('selectedsub') || '';
var searchQuery =  '';
pageno = document.getElementById("page-no");
const maxPage = parseInt(document.currentScript.getAttribute('data-maxpage'), 10);
const cPage = parseInt(document.currentScript.getAttribute('data-cpage'), 10);
console.log(cPage)
console.log(maxPage)

var page = cPage || 1;
function prevp(){
  if (pageno.innerText.toString() > "1") {
    page--;
    

    window.location.href = `/books?page=${page}&class=${selectedclass}&sub=${selectedsub}&search=${encodeURIComponent(searchQuery)}`;
  }
};

function nextp() {
  
  console.log(page);
  if(page<maxPage)
    {
      page++;
    window.location.href = `/books?page=${page}&class=${selectedclass}&sub=${selectedsub}&search=${encodeURIComponent(searchQuery)}`;
  
  console.log(pageno.innerText);}
};



filter=document.querySelectorAll(".filter-class");
classfloat=document.querySelector(".floating-drop-down-classes");
subfloat=document.querySelector(".floating-drop-down-subjects");
filter.forEach(o => {
    o.addEventListener("click",()=>{
        filtertxt=o.querySelector(".filter-txt");
        console.log(o.classList)
        if(o.classList.contains("classes"))
        {
            classfloat.classList.toggle("active");
            console.log(classfloat.classList);
            filtericon=o.querySelector(".icon-filter");
            filtericon.classList.toggle("active");
            console.log(filtericon.classList);
            option=classfloat.querySelectorAll(".option");

            option.forEach(op=>{
                op.addEventListener("click",() => {
                   var selectedoption=op.innerText;
                    console.log(selectedoption);  
                    selectedclass = selectedoption
                    filtertxt.innerText=  selectedoption;  
                    localStorage.setItem('selectedclass', selectedclass);             
                    classfloat.classList.remove("active");
                    console.log(classfloat.classList);
                    filtericon.classList.remove("active");
                    console.log(filtericon.classList);
                    window.location.href = `/books?page=${page}&class=${selectedclass}&sub=${selectedsub}&search=${encodeURIComponent(searchQuery)}`;

                })
            })
        }
        else if(o.classList.contains("subjects")){
            subfloat.classList.toggle("active");
            filtericon=o.querySelector(".icon-filter");
            filtericon.classList.toggle("active");
            option=subfloat.querySelectorAll(".option");

            option.forEach(op=>{
                op.addEventListener("click",() => {
                    var selectedoption=op.innerText;
                    console.log(selectedoption); 
                    selectedsub = selectedoption
                    filtertxt.innerText=  selectedoption;                
                    subfloat.classList.remove("active");
                    filtericon.classList.remove("active");
                    localStorage.setItem('selectedsub', selectedsub);
                    window.location.href = `/books?page=${page}&class=${selectedclass}&sub=${selectedsub}&search=${encodeURIComponent(searchQuery)}`;

                })
            })

        }
        // classfloat.classList.remove("active");
        // filtericon.classList.remove("active");
        // subfloat.classList.remove("active");
        // filtericon.classList.remove("active");
    })
});

// swiper slider only 
var swiper = new Swiper(".book-slider", {
    loop:true,
    centeredSlides: false,
    autoplay: {
        delay:3000,
        disableInteraction:false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
      },
    },
  });






loveimg=document.querySelectorAll("#love-img");
bookmarkimg=document.querySelectorAll("#bookmark-img");
loveimg.forEach(op=>{
  op.addEventListener("click",()=>{
    console.log(op.getAttribute("src"));
    if(op.getAttribute("src")=="images/icons/love.png")
    op.setAttribute("src","images/icons/love-active.png");
    else
    op.setAttribute("src","images/icons/love.png");
  })
})

  bookmarkimg.forEach(op=>{
    
    op.addEventListener("click",()=>{
      bookid=op.getAttribute("data-id").toString();
      console.log(op.getAttribute("data-id"))
      console.log(op.getAttribute("src"));
      if(op.getAttribute("src")=="images/icons/bookmark.png")
      {op.setAttribute("src","images/icons/bookmark-active.png");
      stat="add"
      }
      else
      {op.setAttribute("src","images/icons/bookmark.png");
    stat="remove"}
    data={bookid,stat}
      fetch('/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data).toString()
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
    })
  })






console.log(loveimg.getAttribute("src"));



var searchQuery = ""; 

function searchAction(){
  console.log("boos")
  searchQuery = document.getElementById("search-boxx").value;
  console.log(searchQuery)
  localStorage.setItem('searchQuery', searchQuery);
  console.log(localStorage.getItem('searchQuery'))
  console.log(encodeURIComponent(searchQuery))

  window.location.href = `/books?page=${page}&class=${selectedclass}&sub=${selectedsub}&search=${encodeURIComponent(searchQuery)}`;

}
function readnow(Bookid){
  console.log("Hi")
window.open(`/getBook?id=${Bookid}`);

}
function download(Bookid){
  console.log("Hi")
window.open(`/download?id=${Bookid}`);

}