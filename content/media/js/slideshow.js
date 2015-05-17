
/* simple slideshow logic */

function Slideshow(selector) {
  var self = this;

  this.slides = document.querySelectorAll(selector);
  this.currentSlide = 0;

  this.showSlide = function(index) {
    index = index < 0 ? 0 : index;
    index = index >= self.slides.length ? self.slides.length - 1 : index;
    self.currentSlide = index;

    for (var i = 0; i < self.slides.length; i++) {
      var slide = self.slides[i];

      if (i == index) {
        slide.classList.remove("hidden");
        self.trigger('advance', slide);
      } else {
        slide.classList.add("hidden");
      }
    }
  }

  this.activeSlide = function() {
    return self.slides[self.currentSlide];
  }

  this.advance = function(num) {
    var gotoSlide = (self.currentSlide + num) % self.slides.length;

    if (gotoSlide < 0) {
      gotoSlide = self.slides.length + gotoSlide;
    }

    self.showSlide(gotoSlide);
  }

  this.next = function() {
    self.advance(1);
  }

  this.previous = function() {
    self.advance(-1);
  }

  /* temporary */
  this.start = function() {
    self.showSlide(self.currentSlide);
  }

  return this;

  //return function() {
  //  self.showSlide(self.selectedSlide());
  //};

}

MicroEvent.mixin(Slideshow);


function SlideshowEvents(slideshow) {
  var self = this;

  this.ACTION_PREV = slideshow.previous;
  this.ACTION_NEXT = slideshow.next;
  this.ACTION_HASHCHANGE = function() { slideshow.showSlide(self.selectedSlide()) };
  
  this.KEY_LEFT = 37;
  this.KEY_RIGHT = 39;
  this.KEY_ESC = 27;

  this.EVENT_HASHCHANGE = "hashchange";

  this.keyMap = {};

  /* find the selected slide based on url anchor or default to first slide*/
  this.selectedSlide = function() {
    var hash = window.location.hash.substr(1);
    var requestedSlide = hash.substring(hash.indexOf("slide") + 5);

    return requestedSlide;
  }

  //make binding to slideshow actions easier

  this.bindKey = function(key, action) {
    //if this is the first key map, inject event listener
    if (Object.keys(this.keyMap).length == 0) {
      document.addEventListener("keydown", function(e) {
        // Do nothing when modifiers active. This prevents capturing keys when
        // switching tabs, which can be very annoying.
        if (e.altKey || e.altGraphKey || e.metaKey || e.shiftKey) return;

        var action = self.keyMap[e.keyCode];

        if (action) {
          (action)();
          e.preventDefault();
        }
      })
    }

    this.keyMap[key] = action;

  }

  this.bindElement = function(selector, action) {
    document.querySelector(selector)
    .addEventListener('click', function(e) {
      (action)();
      e.preventDefault();
    }, false);
  }

  this.bindEvent = function(event, action) {
    if (event == self.EVENT_HASHCHANGE) {
      window.addEventListener("hashchange", function(e) {
        (action)();
      }, false);
    }
  }

  this.bindTouch = function(selector) {

    var sg = document.querySelector(selector);
    var touchStartX;
    var touchFlag;
    var touchDisplacement = 60;

    sg.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].pageX;
    }, false);

    sg.addEventListener('touchmove', function(e) {
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

    sg.addEventListener('touchend', function(e) {
      touchFlag = false;
    });

  }
}
