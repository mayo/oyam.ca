build:
	python build.py

serve: build
	(cd deploy && python -m http.server)

.PHONY: build
