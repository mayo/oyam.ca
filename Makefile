build:
	python build.py

serve: build
	(cd deploy && python -m http.server)

update-submodules:
	git submodule update --recursive --init

.PHONY: build
