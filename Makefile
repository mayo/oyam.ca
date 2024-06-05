ZOLA_CONTENT_DIR=content
ZOLA_STATIC_DIR=static
ZOLA_PUBLIC_DIR=public

GPG_KEYID=50fec3a364b59bee734d0e9b56a3789ced4d2dd7

# Generated at https://keyoxide.org/util/wkd. Z-Base-32 encoded SHA1 of "mayo@oyam.ca" (Primary key UID)
KEYOXIDE_WKD_HANDLE=sjd3shepa5rmabd9ggran4dsd5fd4sec


# Main targets

build: zola-build

serve: zola-serve

dist: update-submodules update-pubkey depends


zola-build:
	zola build -u '/'

zola-serve: dist
	zola serve -u '/'

# Depends

depends: copy-fa-fonts copy-reset-css copy-microevent-js

.PHONY: depends

copy-reset-css:
	cp depends/the-new-css-reset/css/reset.css sass/media/css/reset.css

copy-fa-fonts:
	cp depends/FontAwesome-subset/fonts/* static/media/fonts/fa/

copy-microevent-js:
	cp depends/microevent.js/microevent.js static/media/js/microevent.js 


# Tools

update-submodules:
	git submodule update --recursive --init

update-pubkey:
	gpg --export $(GPG_KEYID) > $(ZOLA_CONTENT_DIR)/.well-known/openpgpkey/hu/$(KEYOXIDE_WKD_HANDLE)
	gpg --export --armor $(GPG_KEYID) > $(ZOLA_STATIC_DIR)/pubkey.txt

