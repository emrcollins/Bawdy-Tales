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
    slideAudio.setAttribute('id', 'player')
    // slideAudio.setAttribute('controls', 'controls')

    let playButton = document.createElement('button')
    playButton.style.display = 'none'
    // let playSpan = document.createElement('span')
    playButton.setAttribute('name', 'play sound')
    playButton.setAttribute('id', 'play')
    playButton.innerHTML = '&#9654;'
    // playButton.appendChild(playSpan)

    playButton.addEventListener('click', event => {
      document.getElementById('player').play()
      playButton.style.display = 'none'
      document.getElementById('pause').style.display ='inline'
    })


    let pauseButton = document.createElement('button')
    pauseButton.setAttribute('name', 'pause sound')
    pauseButton.setAttribute('id', 'pause')
    pauseButton.innerHTML = '&#10073;&#10073;'
    pauseButton.addEventListener('click', event => {
      document.getElementById('player').pause()
      pauseButton.style.display = 'none'
      document.getElementById('play').style.display ='inline'
    })

    let decreaseVolumeButton = document.createElement('button')
    decreaseVolumeButton.setAttribute('name', 'decrease volume')
    decreaseVolumeButton.innerHTML = '&#8722'
    decreaseVolumeButton.addEventListener('click', event => {
      document.getElementById('player').volume -= 0.1
    })

    let increaseVoluemButton = document.createElement('button')
    increaseVoluemButton.setAttribute('name', 'increase volume')
    increaseVoluemButton.innerHTML = '&#43;'
    increaseVoluemButton.addEventListener('click', event => {
      document.getElementById('player').volume += 0.1
    })


    let muteButton = document.createElement('button')
    muteButton.setAttribute('name', 'mute sound')
    muteButton.setAttribute('id', 'mute')
    muteButton.innerHTML = '&#x1f50a;&#xFE0E;'
    muteButton.addEventListener('click', event => {
      document.getElementById('player').muted = true
      muteButton.style.display = 'none'
      document.getElementById('unmute').style.display ='inline'
    })

    let unmuteButton = document.createElement('button')
    unmuteButton.style.display = 'none'
    unmuteButton.setAttribute('name', 'unmute sound')
    unmuteButton.setAttribute('id', 'unmute')
    unmuteButton.innerHTML = '&#128266;'
    unmuteButton.addEventListener('click', event => {
      document.getElementById('player').muted = false
      unmuteButton.style.display = 'none'
      document.getElementById('mute').style.display ='inline'
    })

    let audioControls = document.createElement('div')
    audioControls.setAttribute('class', 'audioControls')
    audioControls.appendChild(playButton)
    audioControls.appendChild(pauseButton)
    audioControls.appendChild(decreaseVolumeButton)
    audioControls.appendChild(increaseVoluemButton)
    audioControls.appendChild(muteButton)

    let audioSource = document.createElement('source')
    audioSource.setAttribute('src', data.path + 'audio/' + slide.audio)

    slideAudio.appendChild(audioSource);
    slideDivs[slideIndex].appendChild(slideAudio);
    slideDivs[slideIndex].appendChild(audioControls)
  }

}
createSlides()

