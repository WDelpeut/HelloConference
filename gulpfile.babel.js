import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import globby from 'globby';
import through from 'through2';
import log from 'gulplog';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import babelify from 'babelify';

gulp.task('build', function () {
  // gulp expects tasks to return a stream, so we create one here.
  var bundledStream = through();

  bundledStream
    // turns the output bundle stream into a stream containing
    // the normal attributes gulp plugins expect.
    .pipe(source('bundle.js'))
    // the rest of the gulp task, as you would normally write it.
    // here we're copying from the Browserify + Uglify2 recipe.
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    // Add gulp plugins to the pipeline here.
    .pipe(uglify())
    .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./client/dist'));

  // "globby" replaces the normal "gulp.src" as Browserify
  // creates it's own readable stream.
  globby(['./client/*.js']).then(function (entries) {
    // create the Browserify instance.
    var b = browserify({
      entries: entries,
      debug: true,
      transform: [[babelify, { "presets": ["env"] }]]
    });

    // pipe the Browserify stream into the stream we created earlier
    // this starts our gulp pipeline.
    b.bundle().pipe(bundledStream);
  }).catch(function (err) {
    // ensure any errors from globby are handled
    bundledStream.emit('error', err);
  });

  // finally, we return the stream, so gulp knows when this task is done.
  return bundledStream;
});