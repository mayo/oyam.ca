
/* simple slideshow logic */

function Slideshow(selector) {
  //fire up some events

  this.slides = document.querySelectorAll(selector);
  this.currentSlide = 0;

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

/* website specific */
var s;

document.addEventListener('DOMContentLoaded', function() {

  s = new Slideshow("#frontpage-slideshow .slide");

  /* change up some website styles depending on which slide is being shown */
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

    return requestedSlide || s.currentSlide;
  }

  s.showSlide(getSelectedSlide());

  // Bind UI left/right arrows
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

  // React to changing anchor/hash in URL
  window.addEventListener("hashchange", function(e) {
    s.showSlide(getSelectedSlide());
  }, false);

  document.addEventListener("keydown", function(e) {
    // Do nothing when modifiers active. This prevents capturing keys when
    // switching tabs, which can be very annoying.
    if (e.altKey || e.altGraphKey || e.metaKey || e.shiftKey) return;

    switch(e.keyCode) {
      // Left arrow
      case 37:
        s.previous();
        e.preventDefault();
        break;
      // Right arrow
      case 39:
        s.next();
        e.preventDefault();
        break;
      // Esc
      case 27:
        hideOverlay();
        break;
    }
  }, false);

  var se = document.querySelectorAll("#frontpage-slideshow")[0];
  var touchStartX;
  var touchFlag;
  var touchDisplacement = 60;

  se.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].pageX;
  }, false);

  se.addEventListener('touchmove', function(e) {
    // If action was already triggered return
    if (touchFlag) return;

    e.preventDefault();

    touch = e.touches[0] || e.changedTouches[0];
    // Move at least 40 pixels to trigger the action
    if(touch.pageX - touchStartX > touchDisplacement) {
      touchFlag = true;
      s.previous();

    } else if (touch.pageX - touchStartX < -1 * touchDisplacement) {
      touchFlag = true;
      s.next();
    }
  }, false);

  se.addEventListener('touchend', function(e) {
    touchFlag = false;
  });

}, false);
