
function titleFlash() {
  var title1 = document.getElementById("title_1");
  var title2 = document.getElementById("title_2");
  var title3 = document.getElementById("title_3");
  // var pos = 0;
  setInterval(flash(title1), 5);
  setInterval(flash(title2), 15);
  setInterval(flash(title3), 25);
  function flash(title) {
    title.style.display = "inline-block";
    // if (pos == 350) {
    //   clearInterval(id);
    // } else {
    //   pos++;
    //   elem.style.top = pos + "px";
    //   elem.style.left = pos + "px";
    // }
  }
}

titleFlash()
