
var finished = [];
var clickedImg = [];
var clickedWrapper = [];
var clickedCover = [];

var cardRandomPicker = function () {
  var cards = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  var shakedCards = [];
  for ( var i = 0; i < 12; i++ ){
    var randomIndex = Math.floor(Math.random()*(cards.length));
    shakedCards.push(cards[randomIndex]);
    cards = cards.slice(0,randomIndex).concat(cards.slice(randomIndex+1));
  }
  console.log(shakedCards);
  return shakedCards;
}

var cardTurner = function (e) {
  var cover = e.target;
  if ( clickedImg.length < 2 && cover.parentNode.childNodes.length === 2){
    clickedImg.push(cover.parentNode.firstChild);
    clickedWrapper.push(cover.parentNode);
    clickedCover.push(cover);
    cover.remove();
    if(clickedImg.length === 2 && clickedImg[0].src === clickedImg[1].src ){
      finished.push(clickedImg[0]);
      finished.push(clickedImg[1]);
      if(finished.length === 12 ){
        setTimeout(function(){alert("합..격..인가요?")}, 0);
      }
      clickedImg.length = 0;
      clickedWrapper.length = 0;
    } else if (clickedImg.length === 2) {
      var reCover = function () {
        clickedWrapper[0].appendChild(clickedCover[0]);
        clickedWrapper[1].appendChild(clickedCover[1]);
        clickedImg.length = 0;
        clickedWrapper.length = 0;
        clickedCover.length = 0;
      }
      setTimeout(function(){ reCover(); }, 1000);
    }
  }
}
//cardTurner이 imgTagGenerator보다 앞에 있어야만 작동하는건..왜지
// 호이스팅이 되는게 아니었나..

var imgTagGenerator = function (num) {
  var imageWrapper = document.createElement('div');
  imageWrapper.classList.add('image-wrapper');
  var imageOverlay = document.createElement('img');
  imageOverlay.setAttribute('src', `img/img7.png`);
  imageOverlay.classList.add('image-overlay');
  var imgTag = document.createElement('img');
  imgTag.setAttribute('src', `img/img${num}.png`);
  imgTag.setAttribute('class', 'card');
  imgTag.setAttribute('style', 'width:130px;height:90%;');
  imageWrapper.appendChild(imgTag);
  imageWrapper.appendChild(imageOverlay);
  imageOverlay.addEventListener('click', cardTurner);
  return imageWrapper;
}

var cardGiver = function () {
  var firstRow = document.querySelector("#row1");
  var secondRow = document.querySelector("#row2");
  var thirdRow = document.querySelector("#row3");

  var shakedCards = cardRandomPicker();

  for( var i = 0; i <12; i++ ){
    var imgCard = imgTagGenerator(shakedCards[i]);
    if( i < 4 ) {
      firstRow.appendChild(imgCard);
    } else if ( 4 <= i && i < 8 ){
      secondRow.appendChild(imgCard);
    } else {
      thirdRow.appendChild(imgCard);
    }
  }
}

cardGiver();

console.log(document.querySelector("#row1").childNodes);

// var finisher = function (e) {
//   if(finished.length === 12 ){
//     alert("합..격..?");
//   }
// }
