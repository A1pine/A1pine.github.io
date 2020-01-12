var gulp = require('gulp');
var babel = require('gulp-babel');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imageMin = require('gulp-imagemin');
// ѹ�� public Ŀ¼ css
gulp.task('minify-css', gulp.series(function () {
  return gulp.src('./public/**/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('./public'));
}));
// ѹ�� public Ŀ¼ html
gulp.task('minify-html', gulp.series(function () {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }))
    .pipe(gulp.dest('./public'))
}));
// ѹ�� public/js Ŀ¼ js
gulp.task('minify-js', function() {
    return gulp.src('./public/**/*.js')
          .pipe(uglify())
          .pipe(gulp.dest('./public'));
});
// ѹ��ͼƬ
gulp.task('images', gulp.series(function () {
  return gulp.src('./public/**/*.{png,jpg,gif,ico,svg}')
    .pipe(imageMin({
      progressive: true
    }))
    .pipe(gulp.dest('./public'))
}))
// ִ�� gulp ����ʱִ�е�����
gulp.task('default', gulp.parallel(
  'minify-html', 'minify-css', 'minify-js', 'images'
));