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
  // playSlideSound(slideIndex += n);
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
      slideImg.setAttribute('src', data.path + 'desktop/' + slide.image)
      console.log("slideImg", slide["alt-text"])
      slideImg.setAttribute('alt-text', slide["alt-text"])

      var textHeight = (slide.text.split('\n').length - 1) * 60 + 75
      slideImg.style.height = 'calc(100% - ' + textHeight + 'px)'

      slideDiv.appendChild(slideImg);
    }

    slideDiv.appendChild(slideText)
    slideshowContainer.appendChild(slideDiv)

    // if(slide.audio){
    //   let slideAudio = document.createElement('audio')
    //   slideAudio.setAttribute('controls', 'controls')

    //   let audioSource = document.createElement('source')
    //   audioSource.setAttribute('src', data.path + 'audio/' + slide.audio)
    //   // audioSource.setAttribute('type', 'audio/mp3')

    //   slideAudio.appendChild(audioSource);
    //   slideDiv.appendChild(slideAudio);
    // }


    // playSlideSound(slideIndex)
  })
  // playSlideSound(0)
  displaySlide(0)
}

function displaySlide(n) {
  if (n > slides.length - 1) {
    window.location.replace = "http://www.bawdytales.net"
    return;
  }

  if (n < 0) {slideIndex = slides.length - 1}

  var slideDivs = slideshowContainer.querySelectorAll('.mySlides');

  slideDivs.forEach((slideDiv)=>{
    slideDiv.style.display = "none";

    let audio = slideDiv.querySelector('audio')
    if(audio) audio.removeAttribute('autoplay')
  })

  slideDivs[slideIndex].style.display = "flex"
  // let audio = slideDivs[slideIndex].querySelector('audio')
  // console.log('what is slideAudio', audio)
  // let playAudio = audio.play()

  // if (playAudio !== undefined) {
  //   playAudio.then(_ => {
  //     // Automatic playback started!
  //     // Show playing UI.
  //   })
  //   .catch(error => {
  //     // Auto-play was prevented
  //     // Show paused UI.
  //     console.log('error is:', error)
  //   });
  // }
  // slideAudio.setAttribute('autoplay', 'autoplay')

  let slide = slides[n]

  if(slide.audio){
    let slideAudio = document.createElement('audio')
    slideAudio.setAttribute('controls', 'controls')
    slideAudio.setAttribute('autoplay', 'autoplay')

    let audioSource = document.createElement('source')
    audioSource.setAttribute('src', data.path + 'audio/' + slide.audio)
    // audioSource.setAttribute('type', 'audio/mp3')

    slideAudio.appendChild(audioSource);
    slideDivs[slideIndex].appendChild(slideAudio);
  }

}

// function playSlideSound(n) {
//   // let slideAudio = new Audio(data.path + 'audio/' + slides[slideIndex].audio)
//   // console.log("slideAudio is", slideAudio)
//   // slideAudio.play()
//   // // return slideAudio

//   var slideDivs = slideshowContainer.querySelectorAll('.mySlides');

//   let slide = slides[n]

//   if(slide.audio){
//     let slideAudio = document.createElement('audio')
//     slideAudio.setAttribute('controls', 'controls')
//     slideAudio.setAttribute('autoplay', 'autoplay')

//     let audioSource = document.createElement('source')
//     audioSource.setAttribute('src', data.path + 'audio/' + slide.audio)
//     // audioSource.setAttribute('type', 'audio/mp3')

//     slideAudio.appendChild(audioSource);
//     // slideDiv.appendChild(slideAudio);
//     slideDivs[slideIndex].appendChild(slideAudio)
//   }
// }

createSlides()

