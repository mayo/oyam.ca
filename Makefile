build:
	python build.py

serve: build
	(cd deploy && python -m http.server)

clean:
	rm -rf deploy

.PHONY: build
