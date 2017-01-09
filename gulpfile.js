let fs = require('fs');
let path = require('path');
let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let plugin = require('gulp-load-plugins')();
let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');
let merge = require('merge-stream');
let pageres = require('pageres');
let del = require('del');

let option = require('minimist')(process.argv.slice(2));

let PATH = require('./app/server/path.js')();

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
gulp.task('develop', ['browser-sync'], task('creative/dev', {
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

gulp.task('pre-clean', task('build/pre-clean', {
    path: path,
    del: del
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
    del: del
}));

gulp.task('build-replace', ['build-clean'], task('build/replace', {
    path: path,
    getBanners: getBanners,
    merge: merge,
    replace: plugin.replace
}));

gulp.task('build-images', task('build/images', {
    path: path,
    getBanners: getBanners,
    merge: merge,
    imagemin: plugin.imagemin
}));

gulp.task('build-backup', [
        'build-images',
        'build-replace'
    ], task('build/backup', {
        path: path,
        getBanners: getBanners,
        merge: merge,
        pageres: pageres
    }));

gulp.task('build-zip', ['build-backup'], task('build/zip', {
        path: path,
        getBanners: getBanners,
        merge: merge,
        zip: plugin.zip
    }));

gulp.task('build-zip-all', [
        'build-zip'
    ], task('build/zip-all', {
        path: path,
        zip: plugin.zip,
        option: option
    }));

gulp.task('build',
    [
        'build-zip-all'
    ]);