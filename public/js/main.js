//Create function to select elements
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
var splide = new Splide( '#second-slider',{
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
        speed: 0.009,
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
        speed: -0.9,
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
    

    window.location.href = `/blog?page=${page}&category=${selectedoption}&search=${encodeURIComponent(searchQuery)}`;
  }
};

function nextp() {
  
  console.log(page);
  if(page<maxPage)
    {
      page++;
      window.location.href = `/blog?page=${page}&category=${selectedoption}&search=${encodeURIComponent(searchQuery)}`;
  
  console.log(pageno.innerText);}
};
function readmore(Blogid){
  console.log("hi")
  window.location.href=`/article?id=${Blogid}`

}


categories = document.getElementById('categories')
selectedoption=categories.options[categories.selectedIndex].innerText;

categories.addEventListener('change',()=>{
    selectedoption=categories.options[categories.selectedIndex].innerText;

    // if (selectedoption) {
    //   // Make an AJAX request to the server with the selected option as the filter parameter
    //   console.log(selectedoption)
    //   const xhr = new XMLHttpRequest();
    //   xhr.onreadystatechange = function() {
    //     if (xhr.readyState === 4) {
    //       if (xhr.status === 200) {
    //         // Update the content of the target div with the filtered data
    //         document.getElementById('container_wrapper').innerHTML = xhr.responseText;
    //       } else {
    //         console.error('Error fetching filtered data:', xhr.status);
    //       }
    //     }
    //   };
  
    //   // Replace '/your-server-route-for-filter' with your server-side route
    //   xhr.open('GET', `/blog?category=${encodeURIComponent(selectedoption)}`, true);
    //   xhr.send();
    // }
    window.location.href = `/blog?page=${page}&category=${selectedoption}`;
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

  window.location.href = `/blog?page=${page}&search=${encodeURIComponent(searchQuery)}`;

}



function showInfo() {
  const infoDiv = document.querySelector('.info');
  infoDiv.style.display = 'block';
}

function hideInfo() {
  const infoDiv = document.querySelector('.info');
  infoDiv.style.display = 'none';
}

function readnews(Blogid){
  console.log("hi")
  window.location.href=`/news?id=${Blogid}`

}