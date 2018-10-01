var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var notify = require("gulp-notify");

gulp.task('serve', ['sass'], function () {

  browserSync.init({
    server: {
      baseDir: "src"
    },
    notify: false,
    open: false
  });

  gulp.watch("src/sass/**/*.scss", ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src("src/sass/**/*.scss")
      .pipe(sass({outputStyle: 'expanded'}).on('error', notify.onError({
        title: 'Sass'
      })))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest("src/css"))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);