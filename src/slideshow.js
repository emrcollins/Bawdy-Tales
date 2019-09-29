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


    let slideText = document.createElement('div');
    slideText.setAttribute('class', 'text');
    slideText.setAttribute('tabindex', '4');
    slideText.innerText = slide.text.replace('\n', '\r\n')

    if(!slide.image) {
      slideDiv.setAttribute('class', 'mySlides fade blank-slide')
    } else {
      slideImg = document.createElement('img');
      slideImg.setAttribute('src', data.path + 'desktop/' + slide.image)
      slideImg.setAttribute('alt', slide["alt-text"])
      slideImg.setAttribute('tabindex', '3')

      var textHeight = (slide.text.split('\n').length - 1) * 60 + 75
      slideImg.style.height = 'calc(100% - ' + textHeight + 'px)'

      slideDiv.appendChild(slideImg);
    }

    slideDiv.appendChild(slideText)
    slideshowContainer.appendChild(slideDiv)

  })
  displaySlide(0)
}

function displaySlide(n) {
  if (n > slides.length - 1) {
    window.location.href = "/"
    return;
  }

  if (n < 0) {slideIndex = slides.length - 1}

  var slideDivs = slideshowContainer.querySelectorAll('.mySlides');

  slideDivs.forEach((slideDiv)=>{
    slideDiv.style.display = "none";

    let audio = slideDiv.querySelector('audio')
    if(audio) audio.pause()
  })

  slideDivs[slideIndex].style.display = "flex"


  let slide = slides[n]

  if(slide.audio){
    let slideAudio = document.createElement('audio')
    slideAudio.setAttribute('autoplay', 'autoplay')

    let audioSource = document.createElement('source')
    audioSource.setAttribute('src', data.path + 'audio/' + slide.audio)

    slideAudio.appendChild(audioSource);
    slideDivs[slideIndex].appendChild(slideAudio);
  }

}
createSlides()

