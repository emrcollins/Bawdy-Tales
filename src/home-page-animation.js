var titleCount = 1
var spinEar = true

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

