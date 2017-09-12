import datetime
import hana
from hana.plugins import *
import json
import os
import time

def storeSource(key='source_file'):
    def add_key(files, hana):
        for f in files.itervalues():
            f[key] = f.source

    return add_key

def set_metadata(metadata):

    def set_metadata_plugin(files, hana):
        for f in files.itervalues():
            f.update(metadata)

    return set_metadata_plugin

h = hana.Hana(
    source='content',
    output='deploy-py',
)


h.use(metadata({
    # Used for blog post back-links
    "site": {
      "source_dir": h.source,
    },
}))

now = time.time()

h.use(metadata({
    "author": {
      "name": "Mayo Jordanov",
      "email": "mayo@oyam.ca",
      "twitter": "@oyam"
    },

    "site": {
      "description": "Mayo Jordanov; software developer, photographer, climber, runner, hiker, adventurer, explorer",
      "keywords": "mayo jordanov software development photography adventure explore climbing running hiking consulting tech javascript design",
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

h.use(asset([
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

h.use(ignore([
    '**/.*.swp',
    '**/.DS_Store',
]))

h.use(front_matter)

#TODO: metafile experiment
#h.use(storeSource())

h.use(drafts)

h.use(Markdown())

#TODO: branch

h.use(set_metadata({'template': 'blog/article.html'}), 'blog/*/**')
h.use(title(remove=True), 'blog/*/**')
h.use(excerpt, 'blog/*/**')
h.use(PrettyUrl(relative=False), 'blog/*/**')

h.use(Collections({
    "travel": {
      "sortBy": 'created',
      "reverse": True,
    },

    #The last collection defines article's previous/next links
    "articles": {
      "pattern": "blog/*/**",
      "sortBy": 'created',
      "reverse": True,
    },
}))

h.use(JinjaTemplate({
    'directory': 'templates',
}))

#TODO: autoprefixer
#TODO: dev: beautify
#TODO: dev: watch
#TODO: dev: serve

#TODO: dev only:
#h.use(beautify(
#    indent_size=2,
#    indent_char=" "
#))

h.build(clean=True)

