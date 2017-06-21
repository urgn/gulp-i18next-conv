const gulp = require('gulp');
const util = require('gulp-util');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const compiler = require('babel-register');

const src = 'src/index.js';

gulp.task('lint', () =>
  gulp.src([src, 'test/*.js'])
  .pipe(eslint())
  .pipe(eslint.format()),
);

gulp.task('test', ['lint'], () => (
  gulp.src('test')
  .pipe(mocha({
    compilers: { // TODO: remove once mocha.opts is supported by the api
      js: compiler,
    },
  }))
  .on('error', util.log)
));

gulp.task('build', ['test'], () => (
  gulp.src(src)
  .pipe(babel())
  .pipe(gulp.dest('dist'))
));

gulp.task('watch', () => {
  gulp.watch(src, ['test']);
});

gulp.task('develop', ['watch']);

gulp.task('default', ['develop']);
