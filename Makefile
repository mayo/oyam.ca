build: depends
	zola build -u '/'

serve: depends
	zola serve -u '/'

update-submodules:
	git submodule update --recursive --init

depends: copy-fa-fonts copy-reset-css copy-microevent-js

copy-reset-css:
	cp depends/the-new-css-reset/css/reset.css sass/media/css/reset.css

copy-fa-fonts:
	cp depends/FontAwesome-subset/fonts/* static/media/fonts/fa/

copy-microevent-js:
	cp depends/microevent.js/microevent.js static/media/js/microevent.js 

.PHONY: build
.PHONY: depends
