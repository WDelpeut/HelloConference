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
import sass from 'gulp-sass';

const customOpts = {
  entries: ['./client/app.js'],
  debug: true,
  transform: [[babelify, { "presets": ["env"] }]]
}
const opts = assign({}, watchify.args, customOpts);
const b = browserify(customOpts);
const bw = watchify(browserify(opts));
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

gulp.task('watch', () => {
  bundle(bw);
  gulp.start('sass');
  gulp.start('sass:watch');
  bw.on('update', () => {bundle(bw)});
  bw.on('log', log.info);
});

gulp.task('build', () => {
  gulp.start('sass');
  return bundle(b);
});

gulp.task('sass', function () {
  return gulp.src('./client/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./client/dist'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./client/sass/**/*.scss', ['sass']);
});
