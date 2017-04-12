 /*jshint esversion: 6*/

//Outgoing request function
function request(url, listener){
  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', listener);
  oReq.open('GET' , url);
  oReq.send();
}

//on first load, request access from subreddit: earth porn
//https://www.reddit.com/r/EarthPorn.json
request('https://www.reddit.com/r/EarthPorn.json', reddit);

function reddit(){
const requestData = JSON.parse(this.responseText);

  //images
  for(let i = 0; i < requestData.data.children.length; i++) {
    //creates cards
    let card = document.createElement('div');
    card.setAttribute('class', 'card');

    //creates images
    let theImage = document.createElement('img');
    theImage.setAttribute('src', requestData.data.children[i].data.url);

    //creates titles
    let theTitle = document.createElement('h2');
    theTitle.setAttribute('class', 'title');
    theTitle.innerHTML = requestData.data.children[i].data.title;

    //creates subtitles
    let subtitle = document.createElement('p');
    subtitle.setAttribute('class', 'subtitle');
    let date = new Date(requestData.data.children[i].data.created_utc).toString();
    subtitle.innerHTML = `by ${requestData.data.children[i].data.author}, ${date}`;

    //appends elements to card
    document.querySelector('#content').appendChild(card);
    card.appendChild(theImage);
    card.appendChild(theTitle);
    card.appendChild(subtitle);
  }

}