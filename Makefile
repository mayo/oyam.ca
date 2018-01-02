build:
	python build.py

serve: build
	(cd deploy && python -m SimpleHTTPServer)

.PHONY: build
