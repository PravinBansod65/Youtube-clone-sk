

const API_KEY = "AIzaSyCkKhuzGS5vmf_wreWgVMdhsy-z8teYJeYgi";
// const API_KEY = "AIzaSyAO-TYd2kVQtS0J1gti4sCmDuQ81-S5m-c";
// backup key =>"AIzaSyCkKhuzGS5vmf_wreWgVMdhsy-z8teYJeY"
const BASE_URL = "https://www.googleapis.com/youtube/v3";
let channelHttp = "https://www.googleapis.com/youtube/v3/channels?";
// * --------------------GETTING VIDEOS---------------------------------------

function getVideos(searchValue) {
  let url;
  url = `${BASE_URL}/search?key=${API_KEY}&q=${searchValue}&type=video&part=snippet&maxResults=20`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const videosContainer = document.getElementById("videos-container");
      videosContainer.innerHTML = "";
      data.items.forEach((item) => {
        getChannelIcon(item);
      });
    });
}

// *---------------- GEttting channel ICON ---------  --------

const getChannelIcon = (video) => {
  fetch(
    `${BASE_URL}/channels?key=${API_KEY}&part=snippet&part=statistics&id=${video.snippet.channelId}`
  )
    .then((res) => res.json())
    .then((data) => {
      video.channelThumbnail = data.items[0].snippet.thumbnails.default.url;

      // console.log(video.channelThumbnail + " thumbnail taken"); //
      display(video);
    });
  // .catch((error) => console.error("Error fetching channel data:", error));
};

// *---------------- Displaying videos-----------------
function display(videos) {
  const videosContainer = document.getElementById("videos-container");
  // console.log(videos , "display videos link");  //

  videosContainer.innerHTML += `
        <div class="video" id="videos-container">
        <a href="/video.html?videoId=${videos.id.videoId}">
        <img src="${videos.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content"> 
        <img src="${videos.channelThumbnail}" class="channel-icon" alt="">
              <div class="info">
              <h4 class="title">${videos.snippet.title}</h4>
              <p class="channel-name">${videos.snippet.channelTitle}</p>
              </div>
              </div>
              </a>
              </div>
              `;
}

// <a href="/video.html?videoId=${videos.id.videoId}">
//     <img src="${videos.snippet.thumbnails.high.url}">
//     <p>${videos.snippet.description}<p>
// </a>
//  * -----------calling function nd searching---------------------------
getVideos("");
document.getElementById("search-btn").addEventListener("click", () => {
  // getVideos(document.getElementById("search-input").value);
  const searchInputValue = document.getElementById("search-input").value;
  getVideos(searchInputValue);
});

// todo --------------hovering on button--------------------------------
const buttons = document.querySelectorAll('.hover-button');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    console.log(button.innerHTML);
    getVideos(button.innerHTML);
    button.classList.toggle('green');
    // button.classList.remove('green');
  });
  
  // button.addEventListener('c', function() {
  //   button.classList.remove('green');
  // });
});

