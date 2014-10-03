build: node_modules
#	node_modules/.bin/metalsmith
	node build.js

node_modules: package.json
	npm install

serve:
	@$(MAKE) build SERVE=1

.PHONY: build
