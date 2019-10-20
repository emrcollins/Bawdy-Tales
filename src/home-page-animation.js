var titleCount = 1
var spinEar = true
// var visited = false


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

  var redFoot = document.getElementById("redFoot");
  if (redFoot.style.visibility == 'hidden') {
    redFoot.style.visibility = 'visible'
  } else {
    redFoot.style.visibility = 'hidden'
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

function displayIntroCard() {
  let modal = document.createElement('div')
  modal.setAttribute('id', 'modal')

  let modalContent = document.createElement('div')
  modalContent.setAttribute('class', 'modal-content')
  modalContent.textContent = '  You are about to enter a site that is made up of a collection of true stories written by Hansu Siirala. You may hit any icon to hear or view a story. Click on the photo of Hansu or the site title to learn more about the project. Click any key to continue.'

  modal.appendChild(modalContent)

  document.body.prepend(modal)
}

if (window.sessionStorage.getItem('visited')=='false') {
  displayIntroCard()
}


window.addEventListener("keydown", event => {
  var modal = document.getElementById("modal");
  modal.style.display = 'none'
  window.sessionStorage.setItem('visited', true)
});

window.addEventListener('click', event => {
  var modal = document.getElementById("modal");
  modal.style.display = 'none'
  window.sessionStorage.setItem('visited', true)
});

