var Metalsmith = require('metalsmith');

var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var stencils = require('metalsmith-stencils');
var drafts = require('metalsmith-drafts');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');
var branch = require('metalsmith-branch');
var collections = require('metalsmith-collections');
var title = require('metalsmith-title');
var ignore = require('metalsmith-ignore');
var excerpts = require('metalsmith-excerpts');
var asset = require('metalsmith-static');
var debug = require('metalsmith-debug');
var beautify = require('metalsmith-beautify');
var autoprefixer = require('metalsmith-autoprefixer');

var minify_css = require('metalsmith-clean-css');
//var minify_js = require('metalsmith-uglify');
//var minify_html = require('metalsmith-html-minifier');

/**
 * Environment helper
 */

var buildEnv = function() {
  this.PRODUCTION = "production";
  this.DEVELOPMENT = "development";

  this.isProduction = process.env.ENVIRONMENT == this.PRODUCTION;
  this.isDevelopment = process.env.ENVIRONMENT =! this.PRODUCTION;

  this.environment = (this.isProduction) ? this.PRODUCTION : this.DEVELOPMENT;

  this.watch = process.env.WATCH;
  this.serve = process.env.SERVE;

  return this;
}();

console.log("Build environment: " + buildEnv.environment );

/**
 * Build.
 */

var metalsmith = Metalsmith(__dirname);
var sourceDir = "content";
metalsmith
  .source(sourceDir)
  .destination("./deploy")

  .clean(true)

  //set global metadata
  .metadata({
    "author": {
      "name": "Mayo Jordanov",
      "email": "mayo@oyam.ca",
      "twitter": "@oyam"
    },

    "site": {
      "description": "Mayo Jordanov; software developer, photographer, climber, runner, hiker, adventurer, explorer",
      "keywords": "mayo jordanov software development photography adventure explore climbing running hiking consulting tech javascript design",

      "source_dir": sourceDir
    },

    "github": {
      "base": "https://github.com/mayo/oyam.ca",
      "edit": "/edit/master"
    },

    "analytics": {
      "google": {
        "id": "UA-803388-1"
      }
    },

    "now": new Date(),

    "production": buildEnv.isProduction,

    "slides": require("./metadata/slides.json"),
    "links": require("./metadata/links.json")
  })

  .use(asset([
    //font-awesome.io
    {
      "src": "node_modules/font-awesome/css/font-awesome.min.css",
      "dest": "media/css/font-awesome.min.css"
    },
    {
      "src": "node_modules/font-awesome/fonts",
      "dest": "media/fonts"
    },
    //load normalize.css from module to keep it up to date more easily
    {
      "src": "node_modules/normalize.css/normalize.css",
      "dest": "media/css/normalize.css"
    },
    //microevent for slideshow
    {
      "src": "node_modules/microevent/microevent.js",
      "dest": "media/js/microevent.js"
    }
  ]))

  //ignore temp files
  .use(ignore([
    '**/.*.swp',
    '**/.DS_Store',
  ]))

  .use(storeSource())

  .use(drafts())

  .use(markdown())

  .use(branch("blog/*/**")

    .use(setMetadata({ 'template': 'blog/article.html' }))

    .use(title({ remove: true }))

    .use(excerpts())

    .use(permalinks({
      'relative': false
    }))
  )

  //process titles for normal pages after blog, because blog is treated differently
  .use(title())

  .use(collections({
    "travel": {
      "sortBy": 'created',
      reverse: true
    },

    //The last collection defines article's previous/next links
    "articles": {
      "pattern": "blog/*/**",
      "sortBy": 'created',
      reverse: true
    },

  }))

  .use(stencils({
    "engine": "swig",
    "directory": "templates",

    "autoescape": false,

    "extendsPattern": '{% extends "%s" %}',
    "blockPattern": [ '{% block %s %}', '{% endblock %}' ]
  }))

  .use(autoprefixer())
;

if (!buildEnv.isProduction) {
  metalsmith
    .use(beautify({
      "indent_size": 2,
      "indent_char": " "
    }))

    .use(debug())
  ;
}

if (!buildEnv.isProduction && buildEnv.watch) {
  metalsmith
    .use(watch({
      livereload: false,
      paths: {
        "${source}/**/*": true,
        "templates/**/*": "**/*",
        "metadata/**/*": "**/*"
      }
    }))
  ;
}

if (!buildEnv.isProduction && buildEnv.serve) {
  metalsmith
    .use(serve({
      port: 8080,
      verbose: true
    }))
  ;
}

if (buildEnv.isProduction) {
  metalsmith
  //TODO: this breaks metalsmith-templates
//    .use(minify_html())

  //TODO: generates .min.js files, which is not exactly useful without rewriting the source files
//    .use(minify_js({}))

    .use(minify_css())
  ;
}

metalsmith
  .build(function(err){
    if (err) throw err;
    console.log("Build complete!");
  });



function setMetadata(meta, force) {
  force = (typeof force !== 'undefined') ? force : false;

  /**
   * Set Metadata plugin.
   *
   * Sets specified metadata on given files. Optionally, force is given to
   * force overwriting of existing metadata keys.
   *
   * @param {Object} files
   * @param {Metalsmith} metalsmith
   * @param {Function} done
   */
  return function(files, metalsmith, done){
    Object.keys(files).forEach(function(file) {
      Object.keys(meta).forEach(function(key) {
        if (force || !files[file][key]) {
          files[file][key] = meta[key];
        }
      })
    })

    done();
  }
}

/*
 * Stores the source file in metadata. Optional argument defines the metadata key
 * to store the information in, defaults to 'source_file'
 */
function storeSource(key) {
  var key = (typeof key !== 'undefined') ? key : 'source_file';

  /**
   * @param {Object} files
   * @param {Metalsmith} metalsmith
   * @param {Function} done
   */
  return function(files, metalsmith, done){
    Object.keys(files).forEach(function(file) {
      files[file][key] = file
    })

    done();
  }
}

