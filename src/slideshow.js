var slideIndex = 0;
var slides = data.slides
var slideshowContainer = document.getElementById("slideshow-container");

let audioPaused = false;
let startSlideShow = false;

window.addEventListener("keydown", function(event) {
  if (event.key==="ArrowRight" || event.key===" "){
    plusSlides(1)
  } else if (event.key==="ArrowLeft"){
    plusSlides(-1)
  }
}, true);


function createTitleCard() {
  let slideDiv = document.createElement('div');
  slideDiv.setAttribute('class', 'mySlides fade')


  let slideText = document.createElement('div');
  slideText.setAttribute('class', 'text');
  slideText.setAttribute('tabindex', '4');
  slideText.style.color = `#${data.color}`
  slideText.innerText = data.title

  slideDiv.setAttribute('class', 'mySlides fade title-slide')
  slideDiv.style.display = 'flex'

  slideDiv.appendChild(slideText)

  slideshowContainer.append(slideDiv)
}

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

    slideshowContainer.appendChild(slideDiv).appendChild(slideText)

  })
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


  let slide = slides[n-1]

  let currentSlideAudio = slideDivs[n].querySelector('audio')

  if(slide.audio && !currentSlideAudio){

    let slideAudio = createAudio(slide)
    let audioControls = createAudioControls(slideDivs[n])

    slideDivs[slideIndex].append(slideAudio, audioControls);
  } else if (currentSlideAudio) {
    currentSlideAudio.currentTime = 0
    currentSlideAudio.play()
  }

}

function createAudio(slide) {
  let slideAudio = document.createElement('audio')
  slideAudio.setAttribute('autoplay', 'autoplay')
  slideAudio.setAttribute('loop', 'loop')
  slideAudio.setAttribute('class', 'player')

  let audioSource = document.createElement('source')
  audioSource.setAttribute('src', data.path + 'audio/' + slide.audio)

  slideAudio.appendChild(audioSource);

  return slideAudio
}

// function switchAudio(slide) {
//   let slideAudio = document.getElementById('player').

// }


function createAudioControls(currentSlideDiv) {
  console.log("what is currentSlideDiv", currentSlideDiv)
  let playPauseButton = document.createElement('button')

  playPauseButton.setAttribute('name', 'pause sound')
  playPauseButton.setAttribute('class', 'playPause')

  let playSpan = document.createElement('span')
  playSpan.setAttribute('class', 'play')
  playSpan.innerHTML = '&#9654;'
  playSpan.style.color = 'gray'

  let slashSpan = document.createElement('span')
  slashSpan.innerHTML = '/'

  let pauseSpan = document.createElement('span')
  pauseSpan.setAttribute('class', 'pause')
  pauseSpan.innerHTML = '&#10073;&#10073;'

  playPauseButton.append(playSpan, slashSpan, pauseSpan)

  playPauseButton.addEventListener('click', event => {
    let player = currentSlideDiv.querySelector('.player')

    if (audioPaused) {
      player.play()
      playPauseButton.setAttribute('name', 'pause sound')
      currentSlideDiv.querySelector('.play').style.color = 'gray'
      currentSlideDiv.querySelector('.pause').style.color = 'black'

      audioPaused = false
    } else {
      player.pause()
      playPauseButton.setAttribute('name', 'play sound')
      currentSlideDiv.querySelector('.play').style.color = 'black'
      currentSlideDiv.querySelector('.pause').style.color = 'gray'

      audioPaused = true

    }
  })

  let decreaseVolumeButton = document.createElement('button')
  decreaseVolumeButton.setAttribute('name', 'decrease volume')
  decreaseVolumeButton.innerHTML = '&#8722'
  decreaseVolumeButton.addEventListener('click', event => {
    currentSlideDiv.querySelector('.player').volume -= 0.1
  })

  let increaseVolumeButton = document.createElement('button')
  increaseVolumeButton.setAttribute('name', 'increase volume')
  increaseVolumeButton.innerHTML = '&#43;'
  increaseVolumeButton.addEventListener('click', event => {
    currentSlideDiv.querySelector('.player').volume += 0.1
  })


  let muteButton = document.createElement('button')
  muteButton.setAttribute('name', 'mute sound')
  muteButton.setAttribute('class', 'mute')
  muteButton.innerHTML = '&#128263;&#xFE0E;'
  muteButton.addEventListener('click', event => {
    currentSlideDiv.querySelector('.player').muted = true
    muteButton.style.display = 'none'
    currentSlideDiv.querySelector('.unmute').style.display ='inline'
  })

  let unmuteButton = document.createElement('button')
  unmuteButton.style.display = 'none'
  unmuteButton.setAttribute('name', 'unmute sound')
  unmuteButton.setAttribute('class', 'unmute')
  unmuteButton.innerHTML = '&#128264;&#xFE0E;'
  unmuteButton.addEventListener('click', event => {
    currentSlideDiv.querySelector('.player').muted = false
    unmuteButton.style.display = 'none'
    currentSlideDiv.querySelector('.mute').style.display ='inline'
  })

  let audioControls = document.createElement('div')
  audioControls.setAttribute('class', 'audioControls')
  audioControls.append(playPauseButton, decreaseVolumeButton, increaseVolumeButton, muteButton, unmuteButton)

  return audioControls;
}

createTitleCard()
createSlides()


