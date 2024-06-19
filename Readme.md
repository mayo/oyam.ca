# oyam.ca

Mayo's website for [oyam.ca](https://oyam.ca). All content and images in this repository and on the website is Copyright Mayo Jordanov, unless otherwise stated.

## Makefile

The `depends` target will update all necessary files in the Zola site layout. For now and for reasns(tm), those files are checked in seaprately, so Zola can be executed without make targets to make everything work. It would be wise to reconsider this strategy at later date.

## Build and Deployment

See [Colophon](content/colophon/index.md) for details about the website build and deployment process.

## Fonts

To update FontAwesome subset font, load up `depends/FontAwesome-subset/selection.json` to https://icomoon.io, add new glyphs, and export (make sure all glyphs are selected). Replace contents of `depends/FontAwesome-subset` with the generated font, and replace files in `static/media/fonts/fa/` with new files from `depends/FontAwesome-subset/fonts` (or use the `update-fa-fonts` make target).
