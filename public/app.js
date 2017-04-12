 /*jshint esversion: 6*/

//outgoing request function
function request(url, listener){
  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', listener);
  oReq.open('GET' , url);
  oReq.send();
}

//checks for broken image links
function check(url) {
  return (url.match(/\.(jpeg|jpg|gif|png)$/) === null);
}

//clicking on nav buttons will populate new subreddits
//random
document.querySelector('#random').addEventListener('click', () => {

  document.querySelector('#content').innerHTML = '';
  let randomArray = ['/r/funny', '/r/space'];
  let random = randomArray[Math.floor(randomArray.length * Math.random())];
  request(`https://www.reddit.com${random}.json`, reddit);
});

//my board
document.querySelector('#boards').addEventListener('click', () => {

  document.querySelector('#content').innerHTML = '';

  request('https://www.reddit.com/r/EarthPorn.json', reddit);
});

//on first load, request access from subreddit: earth porn
//https://www.reddit.com/r/EarthPorn.json
request('https://www.reddit.com/r/EarthPorn.json', reddit);

function reddit(){
const requestData = JSON.parse(this.responseText);

  for(let i = 0; i < requestData.data.children.length; i++) {

    if(check(requestData.data.children[i].data.url)){
      continue;
    }

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
    let ups = requestData.data.children[i].data.ups;
    subtitle.innerHTML = `by ${requestData.data.children[i].data.author}, ${date}, ${ups} upvotes`;

    //appends elements to card
    document.querySelector('#content').appendChild(card);
    card.appendChild(theImage);
    card.appendChild(theTitle);
    card.appendChild(subtitle);

  }

}