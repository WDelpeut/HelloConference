import gulp from 'gulp';
import watchify from 'watchify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import log from 'gulplog';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import babelify from 'babelify';
import assign from 'lodash.assign';

const customOpts = {
  entries: './client/app.js',
  debug: true,
  transform: [[babelify, { "presets": ["env"] }]]
}
const opts = assign({}, watchify.args, customOpts);
// create Browserify instance.
const b = browserify(customOpts);
// create Browserify/Watchify instance.
const bwatch = watchify(browserify(opts));

gulp.task('watch', () => {
  bundle(bwatch);
  bwatch.on('update', () => {bundle(bwatch)});
  bwatch.on('log', log.info);
});

gulp.task('build', () => {
  return bundle(b);
});

const bundle = (instance) => {
  return instance.bundle()
    .on('error', log.error.bind(log, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true}))
    // Add gulp plugins to the pipeline here.
    .pipe(uglify())
    .on('error', log.error)
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./client/dist'));
}
