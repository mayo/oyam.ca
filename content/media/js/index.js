
var s;

document.addEventListener('DOMContentLoaded', function() {

  s = new Slideshow("#frontpage .slideshow .slide");
  se = new SlideshowEvents(s);

  se.bindKey(se.KEY_LEFT, se.ACTION_PREV);
  se.bindKey(se.KEY_RIGHT, se.ACTION_NEXT);

  se.bindElement('#frontpage .slideshow .controls .previous', se.ACTION_PREV);
  se.bindElement('#frontpage .slideshow .controls .next', se.ACTION_NEXT);

  se.bindEvent(se.EVENT_HASHCHANGE, se.ACTION_HASHCHANGE);

  se.bindTouch("#frontpage .slideshow");

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
      var tags = document.querySelectorAll(".chameleon ." + area);
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
  s.showSlide(se.selectedSlide());

  //smooth scroll to element
  function smoothScroll(element) {
    var currentYPosition = function() {
      // Firefox, Chrome, Opera, Safari
      if (self.pageYOffset) return self.pageYOffset;
      // Internet Explorer 6 - standards mode
      if (document.documentElement && document.documentElement.scrollTop)
          return document.documentElement.scrollTop;
      // Internet Explorer 6, 7 and 8
      if (document.body.scrollTop) return document.body.scrollTop;
      return 0;
    }

    var elmYPosition = function(eID) {
      var elm = document.getElementById(eID);
      var y = elm.offsetTop;
      var node = elm;
      while (node.offsetParent && node.offsetParent != document.body) {
          node = node.offsetParent;
          y += node.offsetTop;
      } return y;
    }

    var scroll = function(eID) {
      var startY = currentYPosition();
      var stopY = elmYPosition(eID);
      var distance = stopY > startY ? stopY - startY : startY - stopY;
      if (distance < 100) {
          scrollTo(0, stopY); return;
      }
      var speed = Math.round(distance / 50);
      if (speed >= 20) speed = 20;
      var step = Math.round(distance / 25);
      var leapY = stopY > startY ? startY + step : startY - step;
      var timer = 0;
      if (stopY > startY) {
          for ( var i=startY; i<stopY; i+=step ) {
              setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
              leapY += step; if (leapY > stopY) leapY = stopY; timer++;
          } return;
      }
      for ( var i=startY; i>stopY; i-=step ) {
          setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
          leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
      }
    }

    return scroll(element);
  }

  document.querySelector('.scrolldown a[href*="#"]:not([href="#"])').addEventListener('click', function(e) {
    e.preventDefault();

    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = null;

      target = e.target && e.target.parentElement ? e.target.parentElement : null;
      target = target.hash.length ? target.hash.slice(1) : null;

      if (target) smoothScroll(target);
    }
  });

}, false);
