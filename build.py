import datetime
import hana
from hana.plugins.assets import assets
from hana.plugins.aws_s3_deploy import AWSS3Deploy
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
from hana.plugins.tags import Tags
from hana.plugins.titles import titles
from hana.plugins.webmentions import FindWebmentions, SendWebmentions
from hana.plugins.micro_blog import ping as MicroBlogPing
import json
import os
import time

def set_metadata(metadata):

    def set_metadata_plugin(files, hana):
        for _, f in files:
            f.update(metadata)

    return set_metadata_plugin

# NOTE: special handling for photos to make micro.json simpler. There should be
#       better way of doing this... Without this, markdown photos get images
#       screwed up
def extract_photo():
    import re
    import posixpath

    pat = re.compile(r'<img\s+.*\s*src="(?P<photo>[^"]+)"\s*.*>.*')

    def extract_photo_plugin(files, hana):
        for _, f in files:
            if f['type'] == 'photo' and 'photo' not in f:
                f['photo'] = pat.search(f['contents']).group('photo')

    return extract_photo_plugin

DEPLOY_DIR = 'deploy'

PRODUCTION = False

if os.environ.get('ENVIRONMENT') == 'production':
    PRODUCTION = True

if os.environ.get('CIRCLE_BRANCH') == 'public':
    PRODUCTION = True

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

  "now": datetime.datetime.fromtimestamp(now),
  "now_utc": datetime.datetime.utcfromtimestamp(now),

  "production": PRODUCTION,

  # It should be possible to replace these with additional metadata() calls
  "slides": json.load(open("./metadata/slides.json")),
  "links": json.load(open("./metadata/links.json"))

}))

h.plugin(ignore(ignore_patterns))

h.plugin(frontmatter)

h.plugin(drafts)

h.plugin(Markdown(img_figure=True))

h.plugin(extract_photo(), 'blog/*/**')

h.plugin(set_metadata({'template': 'blog/article.html'}), 'blog/*/**')
h.plugin(titles(remove=True), 'blog/*/**')
h.plugin(excerpts, 'blog/*/**')
h.plugin(PrettyUrl(relative=False), 'blog/*/**')

h.plugin(Tags(
    config={
      "travel": {
        "sort_by": 'created',
        "reverse": True,
      },

      "microblog": {
        "sort_by": 'created',
        "reverse": True,
      },

      #The last collection defines article's previous/next links
      "articles": {
        "pattern": "blog/*/**",
        "sort_by": 'created',
        "reverse": True,
      },
    },
    metadata_key='tags',
    default_tag='articles',
))

h.plugin(FindWebmentions(
    exclude_domains=['oyam.ca'],
    allow_insecure_https=True,
    cache_file='.webmention_cache.json',
), 'blog/*/**')

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

asset_list =  {
    #font-awesome.io
    "depends/font-awesome/css/font-awesome.min.css": "media/css/font-awesome.min.css",
    "depends/font-awesome/fonts": "media/fonts",

    #load normalize.css from module to keep it up to date more easily
    "depends/normalize.css/normalize.css": "media/css/normalize.css",

    #unsemantic fluid layout
    "depends/unsemantic/assets/stylesheets/unsemantic-grid-responsive-no-ie7.css": "media/css/unsemantic-grid-responsive-no-ie7.css",

    #microevent for slideshow
    "depends/microevent.js/microevent.js": "media/js/microevent.js",
}

h.plugin(assets(asset_list, base_dir=''))

h.plugin(FileWriter(
    deploy_path=DEPLOY_DIR,
    clean=True
))

#h.plugin(assets(asset_list, base_dir=DEPLOY_DIR, sideload=True))

if not PRODUCTION and int(os.environ.get('S3_DEPLOY', 0)) == 1:
    h.plugin(AWSS3Deploy(
        bucket="hana-s3-test",
        deploy_log_name='.deploy_log.json',
        update_changed_only=True,
    ))

if PRODUCTION:
    h.plugin(AWSS3Deploy(
        bucket="oyam.ca",
        deploy_log_name='.deploy_log.json',
        update_changed_only=True,
    ))

    h.plugin(SendWebmentions(
        base_uri="https://oyam.ca",
        allow_insecure_https=True,
    ))

    h.plugin(MicroBlogPing("https://oyam.ca/feeds/micro.json"))

h.build()

