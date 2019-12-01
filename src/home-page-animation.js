var titleCount = 1
var spinEar = true
// var visited = false

// window.sessionStorage.setItem('visited', 'false')

var eyeCount = 1;
// let blinked = false;
var  eyeAnimationCount = 1;


var interval = window.setInterval(function(){

  if (titleCount == 4){
    var title1 = document.getElementById("title_1");
    var title2 = document.getElementById("title_2");
    var title3 = document.getElementById("title_3");

    title1.style.visibility = 'hidden';
    title2.style.visibility = 'hidden';
    title3.style.visibility = 'hidden';

    titleCount = 1;
  } else {
    var title = document.getElementById("title_" + titleCount);

    title.style.visibility = 'visible';

    titleCount++
  }

  var footImg = document.getElementById('foot')

  if (footImg.getAttribute('src')==='assets/home-page/foot_small.png'){
    footImg.setAttribute('src', 'assets/home-page/foot_red_small.png')
  } else {
    footImg.setAttribute('src', 'assets/home-page/foot_small.png')
  }

  var ear = document.getElementById("ear");

  if (spinEar) {
    ear.style.transform  = 'rotate(20deg)'
    spinEar = false
  } else {
    ear.style.transform  = 'rotate(-20deg)'
    spinEar = true
  }


}, 1000);

var eyeAnimationInterval = window.setInterval(function(){
  var eyeImg = document.getElementById('eye')
  eyeAnimationCount++

  if (eyeAnimationCount === 25){
    eyeImg.setAttribute('src', `assets/home-page/Eye_02.png`)
  } else if (eyeAnimationCount > 25 && eyeAnimationCount < 28){
    eyeImg.setAttribute('src', `assets/home-page/Eye_03.png`)
  } else if (eyeAnimationCount === 28) {
    eyeImg.setAttribute('src', `assets/home-page/Eye_02.png`)
  } else if(eyeAnimationCount > 28) {
    eyeImg.setAttribute('src', `assets/home-page/Eye_01.png`)
    eyeAnimationCount = 1
  }
}, 250);

function displayIntroCard() {
  let modal = document.createElement('div')
  modal.setAttribute('id', 'modal')

  let modalContent = document.createElement('div')
  modalContent.setAttribute('class', 'modal-content')

  let modalText = document.createElement('div')
  modalText.textContent = '  Welcome to a collection of true stories written by Hansu Siirala. Hit any icon to hear or view a story. Click on the photo of Hansu or the site title to learn more about the project. Click any key to continue.'

  modalContent.appendChild(modalText)

  modal.appendChild(modalContent)

  document.body.prepend(modal)
}

if (!window.sessionStorage.getItem('visited')) {
  displayIntroCard()
}

function handleModalClick(){
  var modal = document.getElementById("modal");
  if (modal) modal.style.display = 'none'
  window.sessionStorage.setItem('visited', true)
  window.removeEventListener("click", handleModalClick)
  window.removeEventListener("keydown", handleModalClick)
}

window.addEventListener("keydown", handleModalClick);
window.addEventListener('click', handleModalClick);


