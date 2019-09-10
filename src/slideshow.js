var slideIndex = 0;

createSlide(slideIndex);

function createSlide(n) {

  var slides = data.slides
  var slideshowContainer = document.getElementById("slideshow-container");

  if (n > slides.length - 1) {slideIndex = 0}
  if (n < 0) {slideIndex = slides.length - 1}

  var currentSlide = slides[slideIndex]

  let slideDiv = document.createElement('div');
  slideDiv.setAttribute('class', 'mySlides fade')

  let slideImg
  let slideText
  if(!currentSlide.image) {
    slideImg = document.createElement('div');
    slideImg.innerText = currentSlide.text.replace('\n', '<br />')
  } else {
    slideImg = document.createElement('img');
    slideImg.setAttribute('src', data.path + currentSlide.image)
  }

  slideDiv.appendChild(slideImg);

  slideText = document.createElement('div');
  slideText.setAttribute('class', 'text');
  slideText.innerText = currentSlide.text.replace('\n', '\r\n')
  slideDiv.appendChild(slideText)

  var textHeight = currentSlide.text.split('\n').length * 75

  slideImg.style.height = 'calc(100% - ' + textHeight + 'px)'

  var replaceSlide = slideshowContainer.querySelector('div')

  if(!replaceSlide) {
    slideshowContainer.appendChild(slideDiv)
  } else {
    slideshowContainer.replaceChild(slideDiv, replaceSlide)
  }

}

function plusSlides(n) {
  createSlide(slideIndex += n);
}

