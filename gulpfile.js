var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var newer = require('gulp-newer');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var PATH = {};
PATH.app = 'app';
PATH.appServer = PATH.app + '/server';
PATH.appSass = PATH.app + '/sass';
PATH.appViews = PATH.app + '/views';
PATH.appStatic = PATH.app + '/public';
PATH.appStyles = PATH.appStatic + '/styles';
PATH.appScripts = PATH.appStatic + '/scripts';



// --------------- APP
var app = 'app-';

gulp.task(app+'dev', [app+'browser-sync'], function () {
    gulp.watch(PATH.appSass + '/main.scss', [app+'sass']);
    gulp.watch(PATH.appViews + '/**/*.{js,jsx}', [app+'es6']);
    gulp.watch(PATH.appStatic + '/**/*').on('change', browserSync.reload);
});

gulp.task(app+'browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "localhost:1337",
        browser: "google chrome",
        port: 1338,
        open: false
    });
});

gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: PATH.appServer + '/index.js',
        ignore: [
            PATH.appStatic
        ]
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task(app+'sass', function () {
    var f = filter(['**/*.css']);
    return gulp.src(PATH.appSass + '/main.scss')
        .pipe(sass())
        .pipe(gulp.dest(PATH.appStyles))
        .pipe(f)
        .pipe(browserSync.stream());
});

gulp.task(app+'es6', function() {
    return browserify({entries: PATH.appViews + '/App.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(PATH.appScripts));
});







// --------------- CREATIVE