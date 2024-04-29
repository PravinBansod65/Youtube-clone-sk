const API_KEY = "AIzaSyBlyYvuHiQoDPCMA_gmP-4WCnUiSxa0iAU";
<<<<<<< HEAD
=======
// AIzaSyALato09pGN6xcaDRjCE7TEi33h-dOgz1Q
// const API_KEY = "https://mocki.io/v1/94fe6938-229a-4e84-853f-fc6b64022382";
>>>>>>> 628a8cc32e2a00eb0d98c8d5c0207d3a342fe45d
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// todo------------------------- Loading content --------------------------------------
window.addEventListener("load", () => {
  // it gives us '?videoId=videoid' like this
  const search = window.location.search;
  const params = new URLSearchParams(search);

  const videoId = params.get("videoId");
  //      or we can get the videoid using localStorage.getItem

  if (YT) {
    new YT.Player("video-container", {
      height: "420",
      width: "770",
      videoId: videoId,
    });
  }

  function getRelatedContent(channelTitle) {
    let url;
    url = `${BASE_URL}/search?key=${API_KEY}&q=${channelTitle}&type=video&part=snippet&maxResults=1`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        display(data.items);
      });
  }

  function getVideosDetails() {
    let url;
    url = `${BASE_URL}/videos?key=${API_KEY}&part=snippet&id=${videoId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        document.getElementById("video_title").innerHTML = `
        ${data.items[0].snippet.title}
        `;
        console.log(data.items[0].snippet.channelId);
        // *
        getChannelDetails(data.items[0].snippet.channelId);
        getRelatedContent(data.items[0].snippet.channelTitle);
      });
  }

  function getChannelDetails(channel) {
    let url;
    url = `${BASE_URL}/channels?key=${API_KEY}&part=snippet&part=statistics&id=${channel}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        document.getElementById("channelInfo").innerHTML = `
              <img src="${data.items[0].snippet.thumbnails.high.url}" class="channel-icon" alt="">
              <h5 class="channelName">${data.items[0].snippet.title}</h5>
              <p style="color:grey">${data.items[0].statistics.subscriberCount} Subscribers</p>
        `;
        document.getElementById("description").innerHTML = `
          <p>${data.items[0].snippet.localized.description} </p>
          `;
      });
  }

  function getComments() {
    let url;
    url = `${BASE_URL}/commentThreads?key=${API_KEY}&part=snippet&videoId=${videoId}&maxResults=10`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        var cmnt="";
        data.items
        .map((comment) => {
            // console.log(comment);
            cmnt += `<img src="${comment.snippet.topLevelComment.snippet.authorProfileImageUrl}" class="profile-img">
          <span>${comment.snippet.topLevelComment.snippet.authorDisplayName}</span>
        
          <p>${comment.snippet.topLevelComment.snippet.textOriginal}</p>
          `;
          })
          .join("");

        document.getElementById("other_comments").innerHTML = cmnt;
      });
  }

  function display(videos) {
    var myDiv = document.querySelector(".myDiv");
    var content = myDiv.innerHTML; // This will give you the HTML content inside the <div>

    const htmlContent = videos
      .map(
        (video) =>
          `
        <a href="/video.html?videoId=${video.id.videoId}">
          <li>
            <img src="${video.snippet.thumbnails.high.url}">
            <p>${video.snippet.description}</p>
          </li>
        </a>
        `
      )
      .join("");

    myDiv.innerHTML += htmlContent;
  }

  getVideosDetails(); // ! main callling
  getComments();
});


// todo ------------------- loading content  end--------------------------------------
/*
items: Array(1)
 =>0: etag: "QTK8KAwM9aWgXum_Vlkr1BiXhQk"
   id: "RZV4oXuTZlA"
   kind: "youtube#video"
     =>snippet: categoryId: "24"
        channelId: "UCtf9cFBJkHVAf2qMqF01xYg"
        channelTitle: "Hey Bear Sensory"
        defaultAudioLanguage: "en-GB"
        defaultLanguage: "en-GB"
        description: "Welcome to Hey Bear Sensory! \n\nHere it is - EVERY Fruit and Veggie video back to back on one stream (apart from the seasonal two!)!\nEnjoy!\n\nKey features of this video\n\n- Bright music with lots of rhythm to encourage movement\n- Builds positive relationships with healthy food\n- Friendly characters\n- Bright colours for tracking"
        liveBroadcastContent: "live"
        maxres :"url://"
*/


// ! API KEYs 
// const API_KEY = "AIzaSyBJrJHRcfvW07ah3ZzVV0xbQ1vKgK8Uy1U";
// const API_KEY = "AIzaSyAGK0DOr4rKw4HMX_bd8YQYVtbK1omrCYw";
// const API_KEY = "AIzaSyAZBKd4a5uTkEF7yXq1IBph6Zfv1dtQ4TQ
// const API_KEY = "AIzaSyALato09pGN6xcaDRjCE7TEi33h-dOgz1Q";
// const API_KEY = "https://mocki.io/v1/94fe6938-229a-4e84-853f-fc6b64022382";