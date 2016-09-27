(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = function () {
    function Animation(elements, config) {
        _classCallCheck(this, Animation);

        this.Timeline = {
            main: new TimelineMax()
        };

        this.Elements = elements;
        this.Config = config;
    }

    _createClass(Animation, [{
        key: "animate",
        value: function animate() {

            var the = this.Elements,
                timeline = this.Timeline,
                c = this.Config.animation;

            timeline.main.to(the.Banner, 0.2, { opacity: 1 }).from(the.CTA, 1, { opacity: 0 });

            console.log(b.Timelines, c);
        }
    }]);

    return Animation;
}();

exports.default = Animation;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Core = function () {
    function Core() {
        _classCallCheck(this, Core);
    }

    _createClass(Core, [{
        key: 'getAllElementsById',
        value: function getAllElementsById(Elements) {

            if (Elements.length) Elements = {};

            var nodes = document.querySelectorAll('body [id]');

            for (var i = 0; i < nodes.length; i++) {
                Elements[nodes[i].getAttribute('id')] = nodes[i];
            }

            return Elements;
        }
    }, {
        key: 'getAllTimelines',
        value: function getAllTimelines(timelines) {

            var t = [];
            for (var timeline in timelines) {
                if (timelines.hasOwnProperty(timeline)) t.push(timelines[timeline]);
            }
            return t;
        }
    }, {
        key: 'loadImages',
        value: function loadImages(callback) {

            function getallBgimages() {
                var url,
                    B = [],
                    A = document.getElementsByTagName('*');
                A = B.slice.call(A, 0, A.length);
                while (A.length) {
                    url = document.deepCss(A.shift(), 'background-image');
                    if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
                    url = url[1];
                    if (url && B.indexOf(url) == -1) B[B.length] = url;
                }
                return B;
            }

            document.deepCss = function (who, css) {
                if (!who || !who.style) return '';
                var sty = css.replace(/\-([a-z])/g, function (a, b) {
                    return b.toUpperCase();
                });
                if (who.currentStyle) {
                    return who.style[sty] || who.currentStyle[sty] || '';
                }
                var dv = document.defaultView || window;
                return who.style[sty] || dv.getComputedStyle(who, "").getPropertyValue(css) || '';
            };

            Array.indexOf = Array.indexOf || function (what, index) {
                index = index || 0;
                var L = this.length;
                while (index < L) {
                    if (this[index] === what) return index;
                    ++index;
                }
                return -1;
            };

            var loaded = 0,
                images = getallBgimages(),
                imagesNum = images.length;

            function preloadAllImages(cb) {

                if (imagesNum) {
                    var _preloadImage = function _preloadImage(url) {
                        var img = new Image();
                        img.src = url;
                        img.onload = function () {

                            loaded++;
                            if (loaded === imagesNum) {
                                if (cb) cb();
                            }
                        };
                    };

                    for (var i = 0; i < imagesNum; i++) {
                        _preloadImage(images[i]);
                    }
                } else {

                    if (cb) cb();
                }
            }

            preloadAllImages(callback);
        }
    }, {
        key: 'checkAssetsLoaded',
        value: function checkAssetsLoaded() {
            this.loadImages();
        }
    }]);

    return Core;
}();

exports.default = Core;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = require('./banner/core');

var _core2 = _interopRequireDefault(_core);

var _animation = require('./banner/animation');

var _animation2 = _interopRequireDefault(_animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Banner = function () {
    function Banner() {
        _classCallCheck(this, Banner);

        this.Libs = {};
        this.Libs.loaded = 0;
        this.Libs.fails = 0;
        this.Libs.source = [['TweenMax', '//s0.2mdn.net/ads/studio/cached_libs/tweenmax_1.18.0_499ba64a23378545748ff12d372e59e9_min.js']];

        this.Elements = {};
        this.Timelines = [];
    }

    _createClass(Banner, [{
        key: 'loadScript',
        value: function loadScript(src, callback, isLib) {

            var self = this;

            var s, r;
            r = false;
            s = document.createElement('script');
            s.src = src;
            s.async = 'async';
            s.onload = s.onreadystatechange = function () {
                if (!r && (!this.readyState || this.readyState == 'complete')) {
                    r = true;
                    if (isLib) self.Libs.loaded++;
                    if (typeof callback !== 'undefined') callback();
                }
            };
            s.onerror = function () {
                console.log('error loading this script ' + src);
                if (typeof callback !== 'undefined') callback();
                if (isLib) self.Libs.fails++;
            };
            document.getElementsByTagName('head')[0].appendChild(s);
        }
    }, {
        key: 'Stacy',
        value: function Stacy() {

            if (this.Libs.fails > 10) return;

            if (this.Libs.loaded < this.Libs.source.length) {
                if (window[this.Libs.source[this.Libs.loaded][0]]) {
                    this.Libs.loaded++;
                    this.Stacy().bind(this);
                } else {
                    this.loadScript(this.Libs.source[this.Libs.loaded][1], this.Stacy.bind(this), true);
                }
            } else {
                this.Init();
            }
        }
    }, {
        key: 'Init',
        value: function Init() {

            var banner = {};
            banner.core = new _core2.default();

            this.Elements = banner.core.getAllElementsById(this.Elements);

            banner.animation = new _animation2.default(this.Elements, config);

            // banner.core.checkAssetsLoaded();

            this.Timelines = banner.core.getAllTimelines(banner.animation.Timeline);

            banner.animation.animate();
        }
    }]);

    return Banner;
}();

window.onload = function () {
    b = new Banner();
    b.Stacy();
};

},{"./banner/animation":1,"./banner/core":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjcmVhdGl2ZS9zb3VyY2Uvc2NyaXB0cy9iYW5uZXIvYW5pbWF0aW9uLmpzIiwiY3JlYXRpdmUvc291cmNlL3NjcmlwdHMvYmFubmVyL2NvcmUuanMiLCJjcmVhdGl2ZS9zb3VyY2Uvc2NyaXB0cy9pbml0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FxQixTO0FBRWpCLHVCQUFZLFFBQVosRUFBc0IsTUFBdEIsRUFBOEI7QUFBQTs7QUFFMUIsYUFBSyxRQUFMLEdBQWdCO0FBQ1osa0JBQU0sSUFBSSxXQUFKO0FBRE0sU0FBaEI7O0FBSUEsYUFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUVIOzs7O2tDQUVTOztBQUVOLGdCQUFJLE1BQU0sS0FBSyxRQUFmO0FBQUEsZ0JBQ0ksV0FBVyxLQUFLLFFBRHBCO0FBQUEsZ0JBRUksSUFBSSxLQUFLLE1BQUwsQ0FBWSxTQUZwQjs7QUFJQSxxQkFBUyxJQUFULENBQ0ssRUFETCxDQUNRLElBQUksTUFEWixFQUNvQixHQURwQixFQUN5QixFQUFDLFNBQVMsQ0FBVixFQUR6QixFQUVLLElBRkwsQ0FFVSxJQUFJLEdBRmQsRUFFbUIsQ0FGbkIsRUFFc0IsRUFBQyxTQUFTLENBQVYsRUFGdEI7O0FBS0Esb0JBQVEsR0FBUixDQUFZLEVBQUUsU0FBZCxFQUF5QixDQUF6QjtBQUVIOzs7Ozs7a0JBMUJnQixTOzs7Ozs7Ozs7Ozs7O0lDQUEsSTtBQUVqQixvQkFBYztBQUFBO0FBQ2I7Ozs7MkNBRWtCLFEsRUFBVTs7QUFFekIsZ0JBQUksU0FBUyxNQUFiLEVBQXFCLFdBQVcsRUFBWDs7QUFFckIsZ0JBQUksUUFBUSxTQUFTLGdCQUFULENBQTBCLFdBQTFCLENBQVo7O0FBRUEsaUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxN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QUFaLENBQStCLEtBQUssUUFBcEMsQ0FBaEI7O0FBRUEsbUJBQU8sU0FBUCxHQUFtQix3QkFBYyxLQUFLLFFBQW5CLEVBQTZCLE1BQTdCLENBQW5COztBQUVBOztBQUVBLGlCQUFLLFNBQUwsR0FBaUIsT0FBTyxJQUFQLENBQVksZUFBWixDQUE0QixPQUFPLFNBQVAsQ0FBaUIsUUFBN0MsQ0FBakI7O0FBRUEsbUJBQU8sU0FBUCxDQUFpQixPQUFqQjtBQUVIOzs7Ozs7QUFJTCxPQUFPLE1BQVAsR0FBZ0IsWUFBVztBQUN2QixRQUFJLElBQUksTUFBSixFQUFKO0FBQ0EsTUFBRSxLQUFGO0FBQ0gsQ0FIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudHMsIGNvbmZpZykge1xuXG4gICAgICAgIHRoaXMuVGltZWxpbmUgPSB7XG4gICAgICAgICAgICBtYWluOiBuZXcgVGltZWxpbmVNYXgoKVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuRWxlbWVudHMgPSBlbGVtZW50cztcbiAgICAgICAgdGhpcy5Db25maWcgPSBjb25maWc7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBhbmltYXRlKCkge1xuXG4gICAgICAgIGxldCB0aGUgPSB0aGlzLkVsZW1lbnRzLFxuICAgICAgICAgICAgdGltZWxpbmUgPSB0aGlzLlRpbWVsaW5lLFxuICAgICAgICAgICAgYyA9IHRoaXMuQ29uZmlnLmFuaW1hdGlvbjtcblxuICAgICAgICB0aW1lbGluZS5tYWluXG4gICAgICAgICAgICAudG8odGhlLkJhbm5lciwgMC4yLCB7b3BhY2l0eTogMX0pXG4gICAgICAgICAgICAuZnJvbSh0aGUuQ1RBLCAxLCB7b3BhY2l0eTogMH0pXG4gICAgICAgIDtcblxuICAgICAgICBjb25zb2xlLmxvZyhiLlRpbWVsaW5lcywgYylcbiAgICAgICAgXG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29yZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRBbGxFbGVtZW50c0J5SWQoRWxlbWVudHMpIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChFbGVtZW50cy5sZW5ndGgpIEVsZW1lbnRzID0ge307XG4gICAgICAgIFxuICAgICAgICB2YXIgbm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdib2R5IFtpZF0nKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBFbGVtZW50c1tub2Rlc1tpXS5nZXRBdHRyaWJ1dGUoJ2lkJyldID0gbm9kZXNbaV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRWxlbWVudHM7XG5cbiAgICB9XG5cbiAgICBnZXRBbGxUaW1lbGluZXModGltZWxpbmVzKSB7XG5cbiAgICAgICAgbGV0IHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgdGltZWxpbmUgaW4gdGltZWxpbmVzKSB7XG4gICAgICAgICAgICBpZiAodGltZWxpbmVzLmhhc093blByb3BlcnR5KHRpbWVsaW5lKSkgdC5wdXNoKHRpbWVsaW5lc1t0aW1lbGluZV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuXG4gICAgfVxuXG4gICAgbG9hZEltYWdlcyhjYWxsYmFjaykge1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldGFsbEJnaW1hZ2VzKCkge1xuICAgICAgICAgICAgdmFyIHVybCwgQiA9IFtdLCBBID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKTtcbiAgICAgICAgICAgIEEgPSBCLnNsaWNlLmNhbGwoQSwgMCwgQS5sZW5ndGgpO1xuICAgICAgICAgICAgd2hpbGUgKEEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gZG9jdW1lbnQuZGVlcENzcyhBLnNoaWZ0KCksICdiYWNrZ3JvdW5kLWltYWdlJyk7XG4gICAgICAgICAgICAgICAgaWYgKHVybCkgdXJsID0gL3VybFxcKFsnXCJdPyhbXlwiKV0rKS8uZXhlYyh1cmwpIHx8IFtdO1xuICAgICAgICAgICAgICAgIHVybCA9IHVybFsxXTtcbiAgICAgICAgICAgICAgICBpZiAodXJsICYmIEIuaW5kZXhPZih1cmwpID09IC0xKSBCW0IubGVuZ3RoXSA9IHVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBCO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuZGVlcENzcyA9IGZ1bmN0aW9uICh3aG8sIGNzcykge1xuICAgICAgICAgICAgaWYgKCF3aG8gfHwgIXdoby5zdHlsZSkgcmV0dXJuICcnO1xuICAgICAgICAgICAgdmFyIHN0eSA9IGNzcy5yZXBsYWNlKC9cXC0oW2Etel0pL2csIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHdoby5jdXJyZW50U3R5bGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2hvLnN0eWxlW3N0eV0gfHwgd2hvLmN1cnJlbnRTdHlsZVtzdHldIHx8ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGR2ID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93O1xuICAgICAgICAgICAgcmV0dXJuIHdoby5zdHlsZVtzdHldIHx8XG4gICAgICAgICAgICAgICAgZHYuZ2V0Q29tcHV0ZWRTdHlsZSh3aG8sIFwiXCIpLmdldFByb3BlcnR5VmFsdWUoY3NzKSB8fCAnJztcbiAgICAgICAgfTtcblxuICAgICAgICBBcnJheS5pbmRleE9mID0gQXJyYXkuaW5kZXhPZiB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKHdoYXQsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbmRleCB8fCAwO1xuICAgICAgICAgICAgICAgIHZhciBMID0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgTCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tpbmRleF0gPT09IHdoYXQpIHJldHVybiBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgKytpbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICB2YXIgbG9hZGVkID0gMCxcbiAgICAgICAgICAgIGltYWdlcyA9IGdldGFsbEJnaW1hZ2VzKCksXG4gICAgICAgICAgICBpbWFnZXNOdW0gPSBpbWFnZXMubGVuZ3RoO1xuXG4gICAgICAgIGZ1bmN0aW9uIHByZWxvYWRBbGxJbWFnZXMoY2IpIHtcblxuICAgICAgICAgICAgaWYgKGltYWdlc051bSkge1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWFnZXNOdW07IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBwcmVsb2FkSW1hZ2UoaW1hZ2VzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBwcmVsb2FkSW1hZ2UodXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IHVybDtcbiAgICAgICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVkKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9hZGVkID09PSBpbWFnZXNOdW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIGNiKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGlmIChjYikgY2IoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBwcmVsb2FkQWxsSW1hZ2VzKGNhbGxiYWNrKTtcblxuICAgIH1cblxuICAgIGNoZWNrQXNzZXRzTG9hZGVkKCkge1xuICAgICAgICB0aGlzLmxvYWRJbWFnZXMoKTtcbiAgICB9XG5cbn1cblxuIiwiaW1wb3J0IENvcmUgZnJvbSAnLi9iYW5uZXIvY29yZSc7XG5pbXBvcnQgQW5pbWF0aW9uIGZyb20gJy4vYmFubmVyL2FuaW1hdGlvbic7XG5cbmNsYXNzIEJhbm5lciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLkxpYnMgPSB7fTtcbiAgICAgICAgdGhpcy5MaWJzLmxvYWRlZCA9IDA7XG4gICAgICAgIHRoaXMuTGlicy5mYWlscyA9IDA7XG4gICAgICAgIHRoaXMuTGlicy5zb3VyY2UgPSBbXG4gICAgICAgICAgICBbJ1R3ZWVuTWF4JywgJy8vczAuMm1kbi5uZXQvYWRzL3N0dWRpby9jYWNoZWRfbGlicy90d2Vlbm1heF8xLjE4LjBfNDk5YmE2NGEyMzM3ODU0NTc0OGZmMTJkMzcyZTU5ZTlfbWluLmpzJ11cbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLkVsZW1lbnRzID0ge307XG4gICAgICAgIHRoaXMuVGltZWxpbmVzID0gW107XG5cbiAgICB9XG4gICAgXG4gICAgbG9hZFNjcmlwdChzcmMsIGNhbGxiYWNrLCBpc0xpYikge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIHZhciBzLFxuICAgICAgICAgICAgcjtcbiAgICAgICAgciA9IGZhbHNlO1xuICAgICAgICBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHMuc3JjID0gc3JjO1xuICAgICAgICBzLmFzeW5jID0gJ2FzeW5jJztcbiAgICAgICAgcy5vbmxvYWQgPSBzLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCAhciAmJiAoIXRoaXMucmVhZHlTdGF0ZSB8fCB0aGlzLnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJykgKSB7XG4gICAgICAgICAgICAgICAgciA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYoaXNMaWIpIHNlbGYuTGlicy5sb2FkZWQrKztcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAndW5kZWZpbmVkJykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcy5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3IgbG9hZGluZyB0aGlzIHNjcmlwdCAnICsgc3JjKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgaWYoaXNMaWIpIHNlbGYuTGlicy5mYWlscysrO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHMpO1xuXG4gICAgfVxuXG4gICAgU3RhY3kgKCkge1xuXG4gICAgICAgIGlmICh0aGlzLkxpYnMuZmFpbHMgPiAxMCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLkxpYnMubG9hZGVkIDwgdGhpcy5MaWJzLnNvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3dbdGhpcy5MaWJzLnNvdXJjZVt0aGlzLkxpYnMubG9hZGVkXVswXV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLkxpYnMubG9hZGVkKys7XG4gICAgICAgICAgICAgICAgdGhpcy5TdGFjeSgpLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZFNjcmlwdCh0aGlzLkxpYnMuc291cmNlW3RoaXMuTGlicy5sb2FkZWRdWzFdLCB0aGlzLlN0YWN5LmJpbmQodGhpcyksIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5Jbml0KCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIEluaXQoKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgYmFubmVyID0ge307XG4gICAgICAgIGJhbm5lci5jb3JlID0gbmV3IENvcmU7XG5cbiAgICAgICAgdGhpcy5FbGVtZW50cyA9IGJhbm5lci5jb3JlLmdldEFsbEVsZW1lbnRzQnlJZCh0aGlzLkVsZW1lbnRzKTtcbiAgICAgICAgXG4gICAgICAgIGJhbm5lci5hbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKHRoaXMuRWxlbWVudHMsIGNvbmZpZyk7XG5cbiAgICAgICAgLy8gYmFubmVyLmNvcmUuY2hlY2tBc3NldHNMb2FkZWQoKTtcblxuICAgICAgICB0aGlzLlRpbWVsaW5lcyA9IGJhbm5lci5jb3JlLmdldEFsbFRpbWVsaW5lcyhiYW5uZXIuYW5pbWF0aW9uLlRpbWVsaW5lKTtcbiAgICAgICAgXG4gICAgICAgIGJhbm5lci5hbmltYXRpb24uYW5pbWF0ZSgpO1xuXG4gICAgfVxuXG59XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBiID0gbmV3IEJhbm5lcjtcbiAgICBiLlN0YWN5KCk7XG59OyJdfQ==
