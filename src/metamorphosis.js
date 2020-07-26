let scrollAudio = document.createElement('audio')
scrollAudio.setAttribute('autoplay', 'autoplay')
scrollAudio.setAttribute('loop', 'loop')
scrollAudio.setAttribute('class', 'player')

let audioSource = document.createElement('source')
audioSource.setAttribute('src', 'assets/metamorphosis/audio/Metamorphosis_v2.wav')
audioSource.setAttribute('loop', 'loop')

if(window.sessionStorage.getItem('volume')) scrollAudio.volume = window.sessionStorage.getItem('volume')
if(window.sessionStorage.getItem('muted')=='true') scrollAudio.muted = window.sessionStorage.getItem('muted')
if(window.sessionStorage.getItem('paused')=='true') scrollAudio.pause()

scrollAudio.appendChild(audioSource);

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

  let player = document.querySelector('.player')
  if (window.sessionStorage.getItem('paused')=='true') {
    player.play()
    playPauseButton.setAttribute('name', 'pause sound')
    document.querySelector('.play').style.color = 'gray'
    document.querySelector('.pause').style.color = 'black'

    window.sessionStorage.setItem('paused', 'false')
  } else {
    player.pause()
    playPauseButton.setAttribute('name', 'play sound')
    document.querySelector('.play').style.color = 'black'
    document.querySelector('.pause').style.color = 'gray'

    window.sessionStorage.setItem('paused', 'true')
  }

})

let decreaseVolumeButton = document.createElement('button')
decreaseVolumeButton.setAttribute('name', 'decrease volume')
decreaseVolumeButton.innerHTML = '&#8722'
decreaseVolumeButton.setAttribute('tabindex', 5)
decreaseVolumeButton.addEventListener('click', event => {
  let currentPlayer = document.querySelector('.player')
  currentPlayer.volume -= 0.1
  window.sessionStorage.setItem('volume', currentPlayer.volume)
})

let increaseVolumeButton = document.createElement('button')
increaseVolumeButton.setAttribute('name', 'increase volume')
increaseVolumeButton.innerHTML = '&#43;'
increaseVolumeButton.setAttribute('tabindex', 6)
increaseVolumeButton.addEventListener('click', event => {
  let currentPlayer = document.querySelector('.player')
  currentPlayer.volume += 0.1
  window.sessionStorage.setItem('volume', currentPlayer.volume)
})


let muteButton = document.createElement('button')
muteButton.setAttribute('name', 'mute sound')
muteButton.setAttribute('class', 'mute')
muteButton.setAttribute('tabindex', 7)
muteButton.innerHTML = '&#128264;&#xFE0E;'

muteButton.addEventListener('click', event => {
  document.querySelector('.player').muted = true
  muteButton.style.display = 'none'
  document.querySelector('.unmute').style.display ='inline'
  window.sessionStorage.setItem('muted', 'true')
})

let unmuteButton = document.createElement('button')
unmuteButton.style.display = 'none'
unmuteButton.setAttribute('name', 'unmute sound')
unmuteButton.setAttribute('class', 'unmute')
unmuteButton.setAttribute('tabindex', 7)
unmuteButton.innerHTML = '&#128263;&#xFE0E;'

unmuteButton.addEventListener('click', event => {
  document.querySelector('.player').muted = false
  unmuteButton.style.display = 'none'
  document.querySelector('.mute').style.display ='inline'
  window.sessionStorage.setItem('muted', 'false')
})

if(window.sessionStorage.getItem('muted')=='true') {
  muteButton.style.display = 'none'
  unmuteButton.style.display ='inline'
}

let audioControls = document.createElement('div')
audioControls.setAttribute('class', 'audioControls')
audioControls.append(playPauseButton, decreaseVolumeButton, increaseVolumeButton, muteButton, unmuteButton)

document.getElementById('vertical-slideshow').prepend(scrollAudio, audioControls)



// // let audio = document.querySelector('audio')

// if(slide.audio && !currentscrollAudio){
//   let scrollAudio = createAudio(slide)
//   let audioControls = createAudioControls(slideDivs[n])

//   slideDivs[slideIndex].append(scrollAudio, audioControls);
// } else if (currentscrollAudio) {
//   currentscrollAudio.currentTime = 0

//   if(window.sessionStorage.getItem('volume')) currentscrollAudio.volume = window.sessionStorage.getItem('volume')
//   if(window.sessionStorage.getItem('muted')=='true') currentscrollAudio.muted = window.sessionStorage.getItem('muted')
//   if(window.sessionStorage.getItem('paused')=='true') {
//     currentscrollAudio.pause()
//   } else currentscrollAudio.play()
// }


// function createAudio() {


//   return scrollAudio
// }


// function createAudioControls() {



//   return audioControls;
// }
