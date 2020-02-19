build:
	python build.py

serve: build
	(cd deploy && python -m http.server)

clean:
	rm -rf deploy

update-submodules:
	git submodule update --recursive --init

.PHONY: build
