var slideIndex = 0;
var slides = data.slides
var slideshowContainer = document.getElementById("slideshow-container");

let audioPaused = false;

window.addEventListener("keydown", function(event) {
  if (event.key==="ArrowRight" || event.key===" "){
    plusSlides(1)
  } else if (event.key==="ArrowLeft"){
    plusSlides(-1)
  }
}, true);


function createTitleCard() {
  let slideDiv = createSlide('title-slide', data.title)
  slideDiv.style.display = 'flex'
  slideDiv.querySelector('.text').style.color = `#${data.color}`

  slideshowContainer.append(slideDiv)
}

function createEndCard() {
  let slideDiv = createSlide('end-slide')

  if(data.video) {
      let vimeoEmbed = document.createElement('iframe')
    vimeoEmbed.setAttribute('src', data.video)
    vimeoEmbed.setAttribute('frameborder', '0')
    vimeoEmbed.setAttribute('allow', 'autoplay; fullscreen')
    vimeoEmbed.setAttribute('allowfullscreen', 'allowfullscreen')

    slideDiv.appendChild(vimeoEmbed)
  } else {
    return null;
  }

  slideDiv.style.display = 'flex'

  return slideDiv
}

function createSlide(extraClass, text) {
  let slideDiv = document.createElement('div');
  slideDiv.setAttribute('class', `mySlides fade ${extraClass}`)

  if (text) {
    let slideText = document.createElement('div');
    slideText.setAttribute('class', 'text');
    slideText.setAttribute('tabindex', '2');

    slideText.innerText = text.replace('\n', '\r\n')
    slideDiv.appendChild(slideText)
  }

  return slideDiv
}

function plusSlides(n) {
  displaySlide(slideIndex += n);
}

function createSlides() {
  slides.forEach((slide) => {

    let slideDiv = createSlide('', slide.text)

    if(!slide.image) {
      slideDiv.setAttribute('class', 'mySlides fade blank-slide')
    } else {
      slideImg = document.createElement('img');
      slideImg.setAttribute('src', data.path + 'desktop/' + slide.image)
      slideImg.setAttribute('alt', slide["alt-text"])
      slideImg.setAttribute('tabindex', '1')

      slideDiv.prepend(slideImg);
    }
    slideshowContainer.appendChild(slideDiv)
  })
}

function displaySlide(n) {

  if (n > slides.length + 1) {
    window.location.href = "/"
    return;
  }

  var slideDivs = slideshowContainer.querySelectorAll('.mySlides');

  slideDivs.forEach((slideDiv)=>{
    slideDiv.style.display = "none";

    let audio = slideDiv.querySelector('audio')
    if(audio) audio.pause()
  })

  if (n === slides.length + 1) {
    let endCard = createEndCard()
    if (!endCard) {
      window.location.href = "/"
      return;
    }
    slideshowContainer.appendChild(endCard)
    return;
  } else {

    slideDivs[slideIndex].style.display = "flex"
    let textHeight = slideDivs[slideIndex].querySelector('.text').getBoundingClientRect().height

    let img = slideDivs[slideIndex].querySelector('img')
    if(img) img.style.height = 'calc(100% - ' + textHeight + 'px)'
  }

  let slide = slides[n-1]

  let currentSlideAudio = slideDivs[n].querySelector('audio')

  if(slide.audio && !currentSlideAudio){
    let slideAudio = createAudio(slide)
    let audioControls = createAudioControls(slideDivs[n])

    slideDivs[slideIndex].append(slideAudio, audioControls);
  } else if (currentSlideAudio) {
    currentSlideAudio.currentTime = 0

    if(window.sessionStorage.getItem('volume')) currentSlideAudio.volume = window.sessionStorage.getItem('volume')
    if(window.sessionStorage.getItem('muted')=='true') currentSlideAudio.muted = window.sessionStorage.getItem('muted')
    if(window.sessionStorage.getItem('paused')=='true') {
      currentSlideAudio.pause()
    } else currentSlideAudio.play()
  }

  if(slideDivs[slideIndex].querySelector('img')){
    slideDivs[slideIndex].querySelector('img').focus()
  } else {
    slideDivs[slideIndex].querySelector('.text').focus()
  }

}

function createAudio(slide) {
  let slideAudio = document.createElement('audio')
  slideAudio.setAttribute('autoplay', 'autoplay')
  slideAudio.setAttribute('loop', 'loop')
  slideAudio.setAttribute('class', 'player')

  let audioSource = document.createElement('source')
  audioSource.setAttribute('src', data.path + 'audio/' + slide.audio)

  if(window.sessionStorage.getItem('volume')) slideAudio.volume = window.sessionStorage.getItem('volume')
  if(window.sessionStorage.getItem('muted')=='true') slideAudio.muted = window.sessionStorage.getItem('muted')
  if(window.sessionStorage.getItem('paused')=='true') slideAudio.pause()

  slideAudio.appendChild(audioSource);

  return slideAudio
}


function createAudioControls(currentSlideDiv) {
  let playPauseButton = document.createElement('button')

  playPauseButton.setAttribute('name', 'pause sound')
  playPauseButton.setAttribute('class', 'playPause')
  playPauseButton.setAttribute('tabindex', 4)

  let playSpan = document.createElement('span')
  playSpan.setAttribute('class', 'play')
  playSpan.innerHTML = '&#9654;'
  playSpan.style.color = 'gray'

  let slashSpan = document.createElement('span')
  slashSpan.innerHTML = '/'

  let pauseSpan = document.createElement('span')
  pauseSpan.setAttribute('class', 'pause')
  pauseSpan.innerHTML = '&#10073;&#10073;'

  if (window.sessionStorage.getItem('paused')=='true') {
    playPauseButton.setAttribute('name', 'play sound')
    playSpan.style.color = 'black'
    pauseSpan.style.color = 'gray'
  }

  playPauseButton.append(playSpan, slashSpan, pauseSpan)

  playPauseButton.addEventListener('click', event => {

    let player = currentSlideDiv.querySelector('.player')
    if (window.sessionStorage.getItem('paused')=='true') {
      player.play()
      playPauseButton.setAttribute('name', 'pause sound')
      currentSlideDiv.querySelector('.play').style.color = 'gray'
      currentSlideDiv.querySelector('.pause').style.color = 'black'

      window.sessionStorage.setItem('paused', 'false')
    } else {
      player.pause()
      playPauseButton.setAttribute('name', 'play sound')
      currentSlideDiv.querySelector('.play').style.color = 'black'
      currentSlideDiv.querySelector('.pause').style.color = 'gray'

      window.sessionStorage.setItem('paused', 'true')
    }

  })

  let decreaseVolumeButton = document.createElement('button')
  decreaseVolumeButton.setAttribute('name', 'decrease volume')
  decreaseVolumeButton.innerHTML = '&#8722'
  decreaseVolumeButton.setAttribute('tabindex', 5)
  decreaseVolumeButton.addEventListener('click', event => {
    let currentPlayer = currentSlideDiv.querySelector('.player')
    currentPlayer.volume -= 0.1
    window.sessionStorage.setItem('volume', currentPlayer.volume)
  })

  let increaseVolumeButton = document.createElement('button')
  increaseVolumeButton.setAttribute('name', 'increase volume')
  increaseVolumeButton.innerHTML = '&#43;'
  increaseVolumeButton.setAttribute('tabindex', 6)
  increaseVolumeButton.addEventListener('click', event => {
    let currentPlayer = currentSlideDiv.querySelector('.player')
    currentPlayer.volume += 0.1
    window.sessionStorage.setItem('volume', currentPlayer.volume)
  })


  let muteButton = document.createElement('button')
  muteButton.setAttribute('name', 'mute sound')
  muteButton.setAttribute('class', 'mute')
  muteButton.setAttribute('tabindex', 7)
  muteButton.innerHTML = '&#128264;&#xFE0E;'

  muteButton.addEventListener('click', event => {
    currentSlideDiv.querySelector('.player').muted = true
    muteButton.style.display = 'none'
    currentSlideDiv.querySelector('.unmute').style.display ='inline'
    window.sessionStorage.setItem('muted', 'true')
  })

  let unmuteButton = document.createElement('button')
  unmuteButton.style.display = 'none'
  unmuteButton.setAttribute('name', 'unmute sound')
  unmuteButton.setAttribute('class', 'unmute')
  unmuteButton.setAttribute('tabindex', 7)
  unmuteButton.innerHTML = '&#128263;&#xFE0E;'

  unmuteButton.addEventListener('click', event => {
    currentSlideDiv.querySelector('.player').muted = false
    unmuteButton.style.display = 'none'
    currentSlideDiv.querySelector('.mute').style.display ='inline'
    window.sessionStorage.setItem('muted', 'false')
  })

  if(window.sessionStorage.getItem('muted')=='true') {
    muteButton.style.display = 'none'
    unmuteButton.style.display ='inline'
  }

  let audioControls = document.createElement('div')
  audioControls.setAttribute('class', 'audioControls')
  audioControls.append(playPauseButton, decreaseVolumeButton, increaseVolumeButton, muteButton, unmuteButton)

  return audioControls;
}

createTitleCard()
createSlides()


