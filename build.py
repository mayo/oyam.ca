import datetime
import hana
from hana.plugins.assets import assets
from hana.plugins.collections import Collections
from hana.plugins.drafts import drafts
from hana.plugins.excerpts import excerpts
from hana.plugins.file_loader import FileLoader
from hana.plugins.file_writer import FileWriter
from hana.plugins.frontmatter import frontmatter
from hana.plugins.jinja import Jinja
from hana.plugins.ignore import ignore
from hana.plugins.markdown import Markdown
from hana.plugins.metadata import metadata
from hana.plugins.pretty_url import PrettyUrl
from hana.plugins.titles import titles
import json
import os
import time

def set_metadata(metadata):

    def set_metadata_plugin(files, hana):
        for _, f in files:
            f.update(metadata)

    return set_metadata_plugin

DEPLOY_DIR = 'deploy'

h = hana.Hana(
  configuration="hana.yaml"
)

content_dir = 'content'

ignore_patterns = [
  '**/.*.swp',
  '**/.DS_Store',
]

h.plugin(FileLoader(content_dir, source_file_keyword='source_file'))

h.plugin(metadata({
  # Used for blog post feedback links
  "site": {
    "source_dir": content_dir,
  },
}))

now = time.time()

h.plugin(metadata({
  "author": {
    "name": "Mayo Jordanov",
    "email": "mayo@oyam.ca",
    "twitter": "@oyam",
    "instagram": "@oyam.ca",
    "github": "mayo",
  },

  "site": {
    "description": "Mayo Jordanov; software developer, photographer, climber, runner, hiker, adventurer, explorer",
    "keywords": "mayo jordanov software development photography adventure explore climbing running hiking consulting tech design",
  },

  "social_links": {
    "instagram": "fa-instagram",
    "twitter": "fa-twitter-square",
    "flickr": "fa-flickr",
    "linkedin": "fa-linkedin-square",
    "github": "fa-github-square"
  },

  "github": {
    "repo": "/oyam.ca",
    "edit": "/edit/master"
  },

  "analytics": {
    "google": {
      "id": "UA-803388-1"
    }
  },

  "now": datetime.datetime.fromtimestamp(now),
  "now_utc": datetime.datetime.utcfromtimestamp(now),

  "production": True if 'ENVIRONMENT' in os.environ and os.environ['ENVIRONMENT'] == 'production' else False,

  # It should be possible to replace these with additional metadata() calls
  "slides": json.load(open("./metadata/slides.json")),
  "links": json.load(open("./metadata/links.json"))

}))

h.plugin(ignore(ignore_patterns))

h.plugin(frontmatter)

h.plugin(drafts)

h.plugin(Markdown())

h.plugin(set_metadata({'template': 'blog/article.html'}), 'blog/*/**')
h.plugin(titles(remove=True), 'blog/*/**')
h.plugin(excerpts, 'blog/*/**')
h.plugin(PrettyUrl(relative=False), 'blog/*/**')

h.plugin(Collections({
  "travel": {
    "sortBy": 'created',
    "reverse": True,
  },

  #The last collection defines article's previous/next links
  "articles": {
    "pattern": "blog/*/**",
    "sortBy": 'created',
    "reverse": True,

    "default": True,
  },
}))

h.plugin(Jinja({
  'directory': 'templates',
}))

#TODO: autoprefixer

#TODO: prod: uglify

#TODO: dev: watch
#TODO: dev: serve
#TODO: dev: beautify
#h.plugin(beautify(
#  indent_size=2,
#  indent_char=" "
#))

h.plugin(FileWriter(
    deploy_path=DEPLOY_DIR,
    clean=True
))

h.plugin(assets({
  #font-awesome.io
  "depends/font-awesome/css/font-awesome.min.css": "media/css/font-awesome.min.css",
  "depends/font-awesome/fonts": "media/fonts",

  #load normalize.css from module to keep it up to date more easily
  "depends/normalize.css/normalize.css": "media/css/normalize.css",

  #unsemantic fluid layout
  "depends/unsemantic/assets/stylesheets/unsemantic-grid-responsive-no-ie7.css": "media/css/unsemantic-grid-responsive-no-ie7.css",

  #microevent for slideshow
  "depends/microevent.js/microevent.js": "media/js/microevent.js",
}, base_dir=DEPLOY_DIR))


h.build()

