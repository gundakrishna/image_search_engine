const accessKey = "_LGJETi40fR5NcB8Px9m9K7m1fF859geCVatF_2SI44";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;
let perPage = 12;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${keyword}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = "";
  }
  const results = data.results;

  console.log(data.results);
  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  })
  showMoreBtn.style.display = "block";

  // var xmlHttp = new XMLHttpRequest();
  // xmlHttp.open("GET", url);
  // xmlHttp.onload = function(){
  //   if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
  //     let res = xmlHttp.responseText;
  //     res = JSON.parse(res);      
  //   }else {
  //     console.log("error: while fetching the requested data");
  //   }
  // }
  // xmlHttp.send()

}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});