build: pip_requirements
	python build.py

pip_requirements:
	pip install -r requirements.txt

serve:
	(cd deploy-py && python -m SimpleHTTPServer)

.PHONY: build
