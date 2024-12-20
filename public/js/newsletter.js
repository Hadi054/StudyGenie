//Create function to select elements
categories = document.getElementById('categories')
selectedoption=categories.options[categories.selectedIndex].innerText;

const selectElement = (element) => document.querySelector(element);
//Open and close nav on click
selectElement(".menu-icons").addEventListener("click", () => {
  selectElement("nav").classList.toggle("active");
});

// selectElement(".ion-md-arrow-dropdown").addEventListener("click", () => {
//   selectElement("nav").classList.toggle("active");
// });

let autoScroll_size;
if ($(window).width() >= 960) { autoScroll_size = 5 }
else if ($(window).width() >= 700) { autoScroll_size = 4 }
else if ($(window).width() >= 500) { autoScroll_size = 3 }
else if ($(window).width() >= 300) { autoScroll_size = 2 }


document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '.splide',{
        type:'loop',
        drag: 'free',
        focus: 'center',
        perPage: autoScroll_size,
        autoScroll: {
            speed: 0.5,
        },
        arrows: false,
    } );
    splide.mount( window.splide.Extensions);
} );


document.addEventListener( 'DOMContentLoaded', function() {
  var splide = new Splide( '#banner_carousel_1',{
      type:'loop',
      drag: 'free',
      focus: 'center',
      perPage: 1,
      autoScroll: {
          speed: 0.001,
      },
      arrows: false,
  } );
  splide.mount( window.splide.Extensions);
} );

document.addEventListener( 'DOMContentLoaded', function() {
  var splide = new Splide( '#banner_carousel_2',{
      type:'loop',
      drag: 'free',
      focus: 'center',
      perPage: 2.5,
      autoScroll: {
          speed: -0.5,
      },
      arrows: false,
  } );
  splide.mount( window.splide.Extensions);
} );
pageno = document.getElementById("page-no");
const maxPage = parseInt(document.currentScript.getAttribute('data-maxpage'), 10);
const cPage = parseInt(document.currentScript.getAttribute('data-cpage'), 10);
console.log(cPage)
console.log(maxPage)

var page = cPage || 1;
function prevp(){
  if (pageno.innerText.toString() > "1") {
    page--;
    

    window.location.href = `/newsletter?page=${page}&category=${selectedoption}&search=${encodeURIComponent(searchQuery)}`;
  }
};

function nextp() {
  
  console.log(page);
  if(page<maxPage)
    {
      page++;
      window.location.href = `/newsletter?page=${page}&category=${selectedoption}&search=${encodeURIComponent(searchQuery)}`;
  
  console.log(pageno.innerText);}
};
function readmore(Blogid){
  console.log("hi")
  window.location.href=`/news?id=${Blogid}`

}


categories.addEventListener('change',()=>{
    console.log("hi")
    selectedoption=categories.options[categories.selectedIndex].innerText;
    page=1;
    window.location.href = `/newsletter?page=${page}&category=${selectedoption}`;
    console.log(selectedoption)
  }) 
;
var searchQuery = ""; 

function searchAction(){
  console.log("boos")
  searchQuery = document.getElementById("search-input").value;
  console.log(searchQuery)
  console.log(localStorage.getItem('searchQuery'))
  console.log(encodeURIComponent(searchQuery))
  page=1;
  window.location.href = `/newsletter?page=${page}&search=${encodeURIComponent(searchQuery)}`;

}