var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plugin = require('gulp-load-plugins')();
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var merge = require('merge-stream');

var PATH = require('./app/server/path.js')();

function task(name, plugins) {
    return require('./gulp-tasks/' + name)(gulp, plugins, PATH);
}

function getBanners() {
    return fs.readdirSync(PATH.banners)
        .filter(function(file) {
            return fs.statSync(path.join(PATH.banners, file)).isDirectory();
        });
}




gulp.task('browser-sync', ['nodemon'], task('browser-sync', {
    browserSync: browserSync
}));

gulp.task('nodemon', task('nodemon', {
    nodemon: plugin.nodemon
}));



// --------------- APP
gulp.task('app-dev', ['browser-sync'], task('app/dev', {
    browserSync: browserSync
}));

gulp.task('app-sass', task('app/sass', {
    filter: plugin.filter,
    sass: plugin.sass,
    browserSync: browserSync
}));

gulp.task('app-es6', task('app/es6', {
    browserify: browserify,
    source: source
}));



// --------------- CREATIVE
gulp.task('creative-dev', ['browser-sync'], task('creative/dev', {
    browserSync: browserSync,
    path: path
}));

gulp.task('creative-sass', task('creative/sass', {
    filter: plugin.filter,
    sass: plugin.sass,
    browserSync: browserSync
}));

gulp.task('creative-es6', task('creative/es6', {
    browserify: browserify,
    source: source,
    merge: merge,
    path: path
}));

gulp.task('build-scripts', ['creative-es6'], task('build/scripts', {
    path: path,
    getBanners: getBanners,
    merge: merge,
    concat: plugin.concat,
    uglify: plugin.uglify
}));

gulp.task('build-styles', ['creative-sass'], task('build/styles', {
    path: path,
    getBanners: getBanners,
    merge: merge,
    cssmin: plugin.cssmin
}));

gulp.task('build-html', ['build-styles', 'build-scripts'], task('build/html', {
    path: path,
    getBanners: getBanners,
    merge: merge,
    processhtml: plugin.processhtml
}));

gulp.task('build-clean', ['build-html'], task('build/clean', {
    path: path,
    getBanners: getBanners,
    merge: merge,
    clean: plugin.clean
}));

gulp.task('build',
    [
        'build-clean'
    ]);