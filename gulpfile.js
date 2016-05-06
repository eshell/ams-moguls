var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var uncss = require('gulp-uncss');


gulp.task('jsmin', function() {
    return gulp.src([
        'app/_config/*.js',
        'app/_services/*.js',
        'app/_moguls/**/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app'));
});
gulp.task('uncss',function(){
   return gulp.src(['app/_css/*.css','app/_lib/bootstrap/dist/css/bootstrap.css','app/_lib/font-awesome/css/font-awesome.css'])
       .pipe(uncss({
           html:['app/index.html','app/_moguls/login/login.html','app/_moguls/register/register.html']
       }))
       .pipe(gulp.dest('./app/out'));
});
gulp.task('cssmin',function(){
    return gulp.src(['app/_css/*.css'])
        .pipe(sourcemaps.init())
        .pipe(rename(function(path){
            path.extname='.min.css';
        }))
        .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'))
});