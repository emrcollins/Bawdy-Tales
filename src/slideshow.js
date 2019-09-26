var slideIndex = 0;
var slides = data.slides
var slideshowContainer = document.getElementById("slideshow-container");

window.addEventListener("keydown", function(event) {
  if (event.key==="ArrowRight" || event.key===" "){
    plusSlides(1)
  } else if (event.key==="ArrowLeft"){
    plusSlides(-1)
  }
}, true);

function plusSlides(n) {
  displaySlide(slideIndex += n);
}

function createSlides() {
  slides.forEach((slide) => {
    let slideDiv = document.createElement('div');
    slideDiv.setAttribute('class', 'mySlides fade')

    // let slideImg
    let slideText = document.createElement('div');
    slideText.setAttribute('class', 'text');
    slideText.innerText = slide.text.replace('\n', '\r\n')
    //append 2 divs
    if(!slide.image) {

      slideDiv.setAttribute('class', 'mySlides fade blank-slide')
    } else {
      slideImg = document.createElement('img');
      slideImg.setAttribute('src', data.path + slide.image)
      console.log("slideImg", slide["alt-text"])
      slideImg.setAttribute('alt-text', slide["alt-text"])

      var textHeight = (slide.text.split('\n').length - 1) * 60 + 75
      slideImg.style.height = 'calc(100% - ' + textHeight + 'px)'

      slideDiv.appendChild(slideImg);
    }

    slideDiv.appendChild(slideText)
    slideshowContainer.appendChild(slideDiv)

    let slideAudio = document.createElement('audio')
    slideAudio.setAttribute('autoplay', 'autoplay')
    slideAudio.setAttribute('controls', 'controls')

    let audioSource = document.createElement('source')
    audioSource.setAttribute('src', data.path + slide.audio)
    audioSource.setAttribute('type', '')

    slideAudio.appendChild(audioSource);
    slideDiv.appendChild(slideAudio);

//      <audio controls autoplay>
//   <source src="horse.ogg" type="audio/ogg">
//   <source src="horse.mp3" type="audio/mpeg">
//   Your browser does not support the audio element.
// </audio>

    displaySlide(slideIndex)
  })

}

function displaySlide(n) {
  if (n > slides.length - 1) {
    console.log("what is window", window)
    window.location.replace = "http://www.bawdytales.net"
    return;
  }
  if (n < 0) {slideIndex = slides.length - 1}

  var slideDivs = slideshowContainer.querySelectorAll('.mySlides');

  slideDivs.forEach((slideDiv)=>{
    slideDiv.style.display = "none";
  })

  slideDivs[slideIndex].style.display = "flex"
}

createSlides()

