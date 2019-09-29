var slideIndex = 0;
var slides = data.slides
var slideshowContainer = document.body

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

    // slideDiv.setAttribute('class', 'mySlides fade')

    // let slideImg
    let slideText = document.createElement('div');
    slideText.setAttribute('class', 'text');
    slideText.setAttribute('tabindex', '4')
    slideText.innerText = slide.text.replace('\n', '\r\n')
    //append 2 divs
    if(!slide.image) {
      // let slideDiv = document.createElement('div');
      // slideDiv.setAttribute('class', 'slide-img fade blank-slide')
    } else {
      slideImg = document.createElement('img');
      slideImg.setAttribute('src', data.path + 'desktop/' + slide.image)
      slideImg.setAttribute('class', 'slide-img')
      // console.log("slideImg", slide["alt-text"])
      slideImg.setAttribute('alt', slide["alt-text"])
      slideImg.setAttribute('tabindex', '3')

      var textHeight = (slide.text.split('\n').length - 1) * 60 + 75
      // slideImg.style.height = 'calc(100% - ' + textHeight + 'px)'

      // slideDiv.appendChild(slideImg);
      slideshowContainer.appendChild(slideImg)
    }

    slideshowContainer.appendChild(slideText)




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
    window.location.href = "/"
    return;
  }

  if (n < 0) {slideIndex = slides.length - 1}

  var slideImgs = slideshowContainer.querySelectorAll('.slide-img');
  var slideTexts = slideshowContainer.querySelectorAll('.text');
  console.log('what is slideTexts', slideTexts)
  slideImgs.forEach((slideDiv)=>{
    // console.log("what is slideDiv", slideDiv)
    slideDiv.style.display = "none";

    let audio = slideDiv.querySelector('audio')
    if(audio) audio.pause()
  })

  slideTexts.forEach((slideText)=>{
    slideText.style.display = "none";
  })

  slideImgs[slideIndex].style.display = "flex"
  slideTexts[slideIndex].style.display = "inline-block"
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
    // slideAudio.setAttribute('controls', 'controls')
    slideAudio.setAttribute('autoplay', 'autoplay')

    let audioSource = document.createElement('source')
    audioSource.setAttribute('src', data.path + 'audio/' + slide.audio)
    // audioSource.setAttribute('type', 'audio/mp3')

    slideAudio.appendChild(audioSource);
    slideshowContainer.appendChild(slideAudio);
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

