const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const browserSync = require('browser-sync').create()

sass.compiler = require('node-sass')

const path = {
  styles: {
    all: 'src/scss/**/*.scss',
    src: 'src/scss/style.scss',
    dest: 'assets/css/styles'
  },
  pug: {
    all: 'src/**/*.pug',
    src: 'src/pug/pages/*.pug',
    dest: './'
  }
}

function startServer() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
  gulp.watch(path.styles.all, styles);
  gulp.watch(path.pug.all, buildHTML)
  gulp.watch(path.styles.all).on('change', browserSync.reload)
  gulp.watch(path.pug.all).on('change', browserSync.reload)
}

function styles() {
  return gulp.src(path.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.styles.dest));
}
function buildHTML() {
  return gulp.src(path.pug.src)
    .pipe(pug())
    .pipe(gulp.dest(path.pug.dest))
}

gulp.task('default', startServer)