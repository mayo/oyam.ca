
function Slideshow(selector) {
  //fire up some events

  this.slides = document.querySelectorAll(selector);
  this.currentSlide = 0

  this.showSlide = function(index) {
    index = index < 0 ? 0 : index;
    index = index >= this.slides.length ? this.slides.length - 1 : index;
    this.currentSlide = index;

    for (var i = 0; i < this.slides.length; i++) {
      var slide = this.slides[i];

      if (i == index) {
        slide.classList.remove("hidden");
        this.trigger('advance', slide);
      } else {
        slide.classList.add("hidden");
      }
    }
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

MicroEvent.mixin(Slideshow);

var s;

document.addEventListener('DOMContentLoaded', function() {

  s = new Slideshow("#frontpage-slideshow .slide");

  var callback = function(slide) {
    var darkbg = slide.hasAttribute('data-darkbg');
    var bodyTag = document.querySelector('html > body');

    if (darkbg) {
      bodyTag.classList.add('dark-bg');
    } else {
      bodyTag.classList.remove('dark-bg');
    }

    var areas = [ "topleft", "topright", "bottomleft", "bottomright" ];
    areas.forEach(function(area) {
      var def = slide.hasAttribute('data-darkbg-' + area);
s
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

  s.bind('advance', callback);

  function getSelectedSlide() {
    var hash = window.location.hash.substr(1);
    var requestedSlide = hash.substring(hash.indexOf("slide") + 5);

    return requestedSlide || 0;
  }

  s.showSlide(getSelectedSlide());

  //offset for setting the first slide in constructor, which we can't catch the event for
  callback(s.activeSlide());

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

  window.addEventListener("hashchange", function(e) {
    s.showSlide(getSelectedSlide());
  }, false);

}, false);
