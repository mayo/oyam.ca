
function Slideshow(selector) {
  //fire up some events
  smokesignals.convert(this);

  this.slides = document.querySelectorAll(selector);
  this.currentSlide = 0

  this.showSlide = function(index) {
    this.currentSlide = index;

    for (var i = 0; i < this.slides.length; i++) {
      var slide = this.slides[i];

      if (i == index) {
        slide.classList.remove("hidden");
      } else {
        slide.classList.add("hidden");
      }
    }

    this.emit('advance');
  }

  this.activeSlide = function() {
    return this.slides[this.currentSlide];
  }

  this.advance = function(num) {
    var gotoSlide = (this.currentSlide + num) % this.slides.length;

    if (gotoSlide < 0) {
      gotoSlide = this.slides.length + gotoSlide;
    }

    this.showSlide(gotoSlide);
  }

  this.next = function() {
    this.advance(1);
  }

  this.previous = function() {
    this.advance(-1);
  }

  this.showSlide(this.currentSlide);
}

var s;

document.addEventListener('DOMContentLoaded', function() {

  s = new Slideshow("#frontpage-slideshow .slide");

  var callback = function() {
    var slide = s.activeSlide();
    var darkbg = slide.hasAttribute('data-darkbg');

    if (darkbg) {
      document.querySelector('html > body').classList.add('dark-bg');
    } else {
      document.querySelector('html > body').classList.remove('dark-bg');
    }

    var areas = [ "topleft", "topright", "bottomleft", "bottomright" ];
    areas.forEach(function(area) {
      var def = slide.hasAttribute('data-darkbg-' + area);

      var tags = document.querySelectorAll("." + area);
      for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];

        if (def) {
          tag.classList.add('dark-bg');
        } else {
          tag.classList.remove('dark-bg');
        }
      }
    });
  }

  s.on('advance', callback);

  //offset for setting the first slide in constructor, which we can't catch the event for
  callback();

  document.querySelector('#frontpage-slideshow .controls .previous')
    .addEventListener('click', function(e) {
      s.previous();
      e.preventDefault();
    }, false);

  document.querySelector('#frontpage-slideshow .controls .next')
    .addEventListener('click', function(e) {
      s.next();
      e.preventDefault();
    }, false);

}, false);
