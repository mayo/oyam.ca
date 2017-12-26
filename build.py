import datetime
import hana
from hana.plugins import *
import json
import os
import time

def set_metadata(metadata):

    def set_metadata_plugin(files, hana):
        for _, f in files:
            f.update(metadata)

    return set_metadata_plugin

h = hana.Hana(
  output_directory='deploy',
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

h.plugin(asset([
  #font-awesome.io
  {
    "src": "node_modules/font-awesome/css/font-awesome.min.css",
    "dst": "media/css/font-awesome.min.css"
  },
  {
    "src": "node_modules/font-awesome/fonts",
    "dst": "media/fonts"
  },
  #load normalize.css from module to keep it up to date more easily
  {
    "src": "node_modules/normalize.css/normalize.css",
    "dst": "media/css/normalize.css"
  },
  #unsemantic fluid layout
  {
    "src": "node_modules/unsemantic/assets/stylesheets/unsemantic-grid-responsive-no-ie7.css",
    "dst": "media/css/unsemantic-grid-responsive-no-ie7.css"
  },
  #microevent for slideshow
  {
    "src": "node_modules/microevent/microevent.js",
    "dst": "media/js/microevent.js"
  }
]))

h.plugin(ignore(ignore_patterns))

h.plugin(front_matter)

h.plugin(drafts)

h.plugin(Markdown())

h.plugin(set_metadata({'template': 'blog/article.html'}), 'blog/*/**')
h.plugin(title(remove=True), 'blog/*/**')
h.plugin(excerpt, 'blog/*/**')
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

h.plugin(JinjaTemplate({
  'directory': 'templates',
}))

#TODO: autoprefixer
#TODO: dev: beautify
#TODO: dev: watch
#TODO: dev: serve

#TODO: dev only:
#h.plugin(beautify(
#  indent_size=2,
#  indent_char=" "
#))

h.build(clean=True)

