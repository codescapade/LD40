var gulp = require('gulp');
var gutil = require("gulp-util");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var livereload = require('gulp-livereload');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
  pages: ['src/*.html']
};

var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['src/main.ts'],
  cache: {},
  packageCache: {}
}).plugin(tsify));

gulp.task('copyHtml', function () {
  return gulp.src(paths.pages)
      .pipe(gulp.dest('dist'));
});

function test () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
  }).plugin(tsify)
  .transform('babelify', {
    presets: ['es2015'],
    extensions: ['.ts']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist'))
}

function bundle() {
  return watchedBrowserify
      .transform('babelify', {
        presets: ['es2015'],
        extensions: ['.ts']
      })
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      //.pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist'))
      .pipe(livereload({ start: true }));
}

gulp.task('test', test);
gulp.task('default', gulp.series('copyHtml'), bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);