build:
	python build.py

serve:
	(cd deploy && python -m SimpleHTTPServer)

.PHONY: build
