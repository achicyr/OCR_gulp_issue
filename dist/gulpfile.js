const gulp = require("gulp")
const bs = require("browser-sync").create()
const jshint = require("gulp-jshint")
const uglify = require("gulp-uglify")
const jade = require("gulp-jade")
// const babel = require("gulp-babel")
// const babel = require("babel")


function _html(){
  return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
}
function _jade(){
  return gulp.src("*.jade")
    .pipe(jade({"pretty":true}))
    .pipe(gulp.dest("dist"))
}
function _js(){
  return gulp.src("*.js")
    // .pipe(babel({
    //   presets: ['env']
    // }))

    // .pipe(jshint({"esversion":6}))
    // .pipe(jshint.reporter('default'))
    .pipe(gulp.dest("dist"))
}
function _transpile(){//DOESNT WORK
  return gulp.src("*.js")
    .pipe(gulp.dest("dist"))
}
function _minify(){//DOESNT WORK
  return gulp.src("blog.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist"))
}
function _lint(){
  return gulp.src("*.js")
    .pipe(jshint({"esversion":6}))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest("dist"))
}
function _babel(){
  return gulp.src("*.js")
    // .pipe(babel({
    //   presets: ['env']
    // }))
    .pipe(gulp.dest("dist"))
}
function watch(bs){
  gulp.watch("*.html", _html)
  gulp.watch("*.js", _js)
  //gulp.watch("dist/*.html").on('change', bs.reload)
}
function polyfill(){
  return gulp.src("node_modules/babel-polyfill/browser.js")
    .pipe(gulp.dest("dist/node_modules/babel-polyfill"))
}

function _bs(){
  return bs.init({server: {"baseDir": "./dist/"}})
}
function browserSync(){
  bs.init({
    server: './dist',
    port: 8080,
    ui: {
      port: 8081
    }
  });
}

module.exports = {_html, watch, polyfill, _js, _bs,
  default: gulp.series(_html, _jade, _js, polyfill, _lint, _minify, _babel,  watch)
}
