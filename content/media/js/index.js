
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

}, false);
