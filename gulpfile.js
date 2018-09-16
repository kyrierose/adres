const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const del = require('del');
const uglify = require('gulp-uglify');

const scripts = require('./scripts');
const styles = require('./styles');

var devMode = false;

gulp.task('less', function(){
    gulp.src(styles)
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

gulp.task('js', function(){
    gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

gulp.task('html', function(){
    gulp.src('./src/templates/**/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

gulp.task('build', function(){
    gulp.start(['less','html','js']);
});

gulp.task('browser-sync', function(){
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('clean', function(){
    del.sync(['./build/**']);
});

gulp.task('start', function(){
    devMode = true;
    gulp.start(['clean', 'build', 'browser-sync']);
    gulp.watch(['./src/less/**/*.less'], ['less']);
    gulp.watch(['./src/templates/**/*.html'], ['html']);
    gulp.watch(['./src/js/**/*.js'], ['js']);
})