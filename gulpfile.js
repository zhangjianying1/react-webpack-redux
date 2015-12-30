var gulp = require('gulp');
//var sass = require('gulp-ruby-sass');
var cssmin = require('gulp-minify-css');
//var jshint = require('gulp-jshint');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var notify = require('gulp-notify');
//var rename = require('gulp-rename');
//var watch = require('gulp-watch');
//var connect = require('gulp-connect');
var md5 = require('gulp-md5-plus');
//var clean = require('gulp-clean');
//var argv = require('yargs').argv;
//var evr = argv.p || !argv.d; //生产环境为true，开发环境为false，默认为true

//var mod = argv.m || 'all';//模块明，默认为全部
//使用connect启动一个Web服务器
//gulp.task('connect', function () {
//    connect.server({
//        root: './',
//        livereload: true
//    });
//});
gulp.task('watch',function(){
    gulp.watch(['./*.html'], ['html']);
    gulp.watch(['./src/css/*.css'], ['md5:css'])
})
//gulp.task('sass', function () {
//    return sass('./sass/*.scss', { style: 'expanded' })
//        .on('error', sass.logError)
//        .pipe(gulp.dest('result'))
//        .pipe(cssmin())
//        .pipe(gulp.dest('build'))
//        .pipe(connect.reload())
//});
//gulp.task('clean', function(done){
//    gulp.src('build/**/*')
//        .pipe(clean())
//        .on('end', done)
//})
//gulp.task('md5:js', function (done) {
//    gulp.src('build/*.js')
//        .pipe(md5(10, '*.html'))
//        .pipe(gulp.dest('build/js'))
//        .on('end', done);
//});

gulp.task('md5:css', function (done) {
    gulp.src('src/css/base.css')
        .pipe(md5(10, 'src/__build/*.html'))
        .pipe(gulp.dest('src/__build/css'))
        .pipe(cssmin())
        .pipe(gulp.dest('src/__build/css'))
        .on('end', done);
});
gulp.task('cssmin', function(done){
    gulp.src(['src/css/base.css'])
        .pipe(cssmin())
        .pipe(gulp.dest('src/__build/css'))
        .on('end', done)
})
//gulp.task('hint', function() {
//    return gulp.src('./js/*.js')
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'))
//        .pipe(concat('main.js'))
//        .pipe(gulp.dest('dist/assets/js'))
//        .pipe(rename({suffix: '.min'}))
//        .pipe(uglify())
//        .pipe(gulp.dest('dist/assets/js'))
//        .pipe(notify({ message: 'Scripts task complete' }))
//        .pipe(connect.reload());
//});



gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe(connect.reload());
});


gulp.task('default',['connect', 'watch'])
gulp.task('build', ['clean', 'md5:js', 'md5:css'])