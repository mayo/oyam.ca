var extname = require('path').extname;
var Metalsmith = require('metalsmith');

var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var templates = require('metalsmith-templates');
var drafts = require('metalsmith-drafts');
var watch = require('metalsmith-watch');
var branch = require('metalsmith-branch');
var collections = require('metalsmith-collections');
var title = require('metalsmith-title');
var ignore = require('metalsmith-ignore');
var excerpts = require('metalsmith-excerpts');
var asset = require('metalsmith-static');

// metalsmith-clean-css
// metalsmith-uglify
// "metalsmith-metadata": "segmentio/metalsmith-metadata",

/**
 * Build.
 */

var metalsmith = Metalsmith(__dirname);

metalsmith
  .source("./content")
  .destination("./deploy")

  //TODO: temporarily disabled because it breaks python simple server
  .clean(false)

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
    },

    "now": new Date(),

    "production": process.env.PRODUCTION == 1
  })

  //load normalize.css from module to keep it up to date more easily
  .use(asset({
    "src": "node_modules/normalize.css/normalize.css",
    "dest": "media/css/normalize.css"
  }))

  //ignore temp files
  .use(ignore([
    '**/.*.swp',
    '**/.DS_Store',
  ]))

  .use(title())

  .use(drafts())

  .use(markdown())

  .use(branch("blog/*/**")

    .use(setMetadata({ 'template': 'blog/article.html' }))

    .use(excerpts())

    .use(permalinks({
      'relative': false
    }))
  )

  .use(collections({
    "articles": {
      "pattern": "blog/*/**",
      "sortBy": 'created',
      reverse: true
    }
  }))

  .use(templates({
    "engine": "swig",
    "directory": "templates",
    "autoescape": false
//      inPlace: true
  }))
  ;


var beautify = require('metalsmith-beautify');

metalsmith
  .use(beautify({
    "indent_size": 2,
    "indent_char": " "
  }));

var debug = require('metalsmith-debug');

metalsmith
  .use(debug());

if (process.env.BUILD_LIVE) {
  metalsmith
    .use(watch({
      "livereload": true,
    }));
}


metalsmith
  .build(function(err){
    if (err) throw err;
  });

//  .use(concat)

function setMetadata(options) {
  /**
   * Set Metadata plugin.
   *
   * @param {Object} files
   * @param {Metalsmith} metalsmith
   * @param {Function} done
   */
  return function(files, metalsmith, done){
    Object.keys(files).forEach(function(file) {
      Object.keys(options).forEach(function(key) {
        files[file][key] = options[key];
      })
    })

    done();
  }
}

/**
 * Concat plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function concat(files, metalsmith, done){
  var css = '';

  for (var file in files) {
    if ('.css' != extname(file)) continue;
    css += files[file].contents.toString();
    delete files[file];
  }

  css = myth(css);

  files['index.css'] = {
    contents: new Buffer(css)
  };

  done();
}

