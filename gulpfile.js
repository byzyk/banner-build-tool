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
    browserSync: browserSync
}));

gulp.task('creative-sass', task('creative/sass', {
    filter: plugin.filter,
    sass: plugin.sass,
    browserSync: browserSync
}));

gulp.task('creative-es6', task('creative/es6', {
    browserify: browserify,
    source: source,
    merge: merge
}));

gulp.task('creative-concat-engine', task('creative/concat-engine', {
    concat: plugin.concat,
    getBanners: getBanners,
    merge: merge,
    newer: plugin.newer
}));