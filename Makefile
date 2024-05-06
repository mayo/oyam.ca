build:
	zola build -u '/'

serve:
	zola serve -u '/'

update-submodules:
	git submodule update --recursive --init

.PHONY: build
