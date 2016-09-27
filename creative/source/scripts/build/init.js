(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = function () {
    function Animation() {
        _classCallCheck(this, Animation);

        this.Timeline = {};
    }

    _createClass(Animation, [{
        key: "init",
        value: function init(Elements) {

            this.Elements = Elements;
            this.Timeline.main = new TimelineMax();

            this.animate(config.animation);
        }
    }, {
        key: "animate",
        value: function animate(c) {

            var the = this.Elements,
                timeline = this.Timeline;

            timeline.main.to(the.Banner, 0.2, { opacity: 1 }).from(the.CTA, 1, { opacity: 0 });
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

            var banner = {
                core: new _core2.default(),
                animation: new _animation2.default()
            };

            this.Elements = banner.core.getAllElementsById(this.Elements);
            // banner.core.checkAssetsLoaded();

            banner.animation.init(this.Elements);
            this.Timelines = banner.core.getAllTimelines(banner.animation.Timeline);
        }
    }]);

    return Banner;
}();

window.onload = function () {
    b = new Banner();
    b.Stacy();
};

},{"./banner/animation":1,"./banner/core":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjcmVhdGl2ZS9zb3VyY2Uvc2NyaXB0cy9iYW5uZXIvYW5pbWF0aW9uLmpzIiwiY3JlYXRpdmUvc291cmNlL3NjcmlwdHMvYmFubmVyL2NvcmUuanMiLCJjcmVhdGl2ZS9zb3VyY2Uvc2NyaXB0cy9pbml0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FxQixTO0FBRWpCLHlCQUFjO0FBQUE7O0FBRVYsYUFBSyxRQUFMLEdBQWdCLEVBQWhCO0FBRUg7Ozs7NkJBRUksUSxFQUFVOztBQUVYLGlCQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxpQkFBSyxRQUFMLENBQWMsSUFBZCxHQUFxQixJQUFJLFdBQUosRUFBckI7O0FBRUEsaUJBQUssT0FBTCxDQUFhLE9BQU8sU0FBcEI7QUFFSDs7O2dDQUVPLEMsRUFBRzs7QUFFUCxnQkFBSSxNQUFNLEtBQUssUUFBZjtBQUFBLGdCQUNJLFdBQVcsS0FBSyxRQURwQjs7QUFHQSxxQkFBUyxJQUFULENBQ0ssRUFETCxDQUNRLElBQUksTUFEWixFQUNvQixHQURwQixFQUN5QixFQUFDLFNBQVMsQ0FBVixFQUR6QixFQUVLLElBRkwsQ0FFVSxJQUFJLEdBRmQsRUFFbUIsQ0FGbkIsRUFFc0IsRUFBQyxTQUFTLENBQVYsRUFGdEI7QUFLSDs7Ozs7O2tCQTNCZ0IsUzs7Ozs7Ozs7Ozs7OztJQ0FBLEk7QUFFakIsb0JBQWM7QUFBQTtBQUNiOzs7OzJDQUVrQixRLEVBQVU7O0FBRXpCLGdCQUFJLFNBQVMsTUFBYixFQUFxQixXQUFXLEVBQVg7O0FBRXJCLGdCQUFJLFFBQVEsU0FBUyxnQkFBVCxDQUEwQixXQUExQixDQUFaOztBQUVBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBTSxNQUExQixFQUFrQyxHQUFsQyxFQUF1QztBQUNuQyx5QkFBUyxNQUFNLENBQU4sRUFBUyxZQUFULENBQXNCLElBQXRCLENBQVQsSUFBd0MsTUFBTSxDQUFOLENBQXhDO0FBQ0g7O0FBRUQsbUJBQU8sUUFBUDtBQUVIOzs7d0NBRWUsUyxFQUFXOztBQUV2QixnQkFBSSxJQUFJLEVBQVI7QUFDQSxpQkFBSyxJQUFJLFFBQVQsSUFBcUIsU0FBckIsRUFBZ0M7QUFDNUIsb0JBQUksVUFBVSxjQUFWLENBQXlCLFFBQXpCLENBQUosRUFBd0MsRUFBRSxJQUFGLENBQU8sVUFBVSxRQUFWLENBQVA7QUFDM0M7QUFDRCxtQkFBTyxDQUFQO0FBRUg7OzttQ0FFVSxRLEVBQVU7O0FBRWpCLHFCQUFTLGNBQVQsR0FBMEI7QUFDdEIsb0JBQUksR0FBSjtBQUFBLG9CQUFTLElBQUksRUFBYjtBQUFBLG9CQUFpQixJQUFJLFNBQVMsb0JBQVQsQ0FBOEIsR0FBOUIsQ0FBckI7QUFDQSxvQkFBSSxFQUFFLEtBQUYsQ0FBUSxJQUFSLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixFQUFFLE1BQXJCLENBQUo7QUFDQSx1QkFBTyxFQUFFLE1BQVQsRUFBaUI7QUFDYiwwQkFBTSxTQUFTLE9BQVQsQ0FBaUIsRUFBRSxLQUFGLEVBQWpCLEVBQTRCLGtCQUE1QixDQUFOO0FBQ0Esd0JBQUksR0FBSixFQUFTLE1BQU0scUJBQXFCLElBQXJCLENBQTBCLEdBQTFCLEtBQWtDLEVBQXhDO0FBQ1QsMEJBQU0sSUFBSSxDQUFKLENBQU47QUFDQSx3QkFBSSxPQUFPLEVBQUUsT0FBRixDQUFVLEdBQVYsS0FBa0IsQ0FBQyxDQUE5QixFQUFpQyxFQUFFLEVBQUUsTUFBSixJQUFjLEdBQWQ7QUFDcEM7QUFDRCx1QkFBTyxDQUFQO0FBQ0g7O0FBRUQscUJBQVMsT0FBVCxHQUFtQixVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CO0FBQ25DLG9CQUFJLENBQUMsR0FBRCxJQUFRLENBQUMsSUFBSSxLQUFqQixFQUF3QixPQUFPLEVBQVA7QUFDeEIsb0JBQUksTUFBTSxJQUFJLE9BQUosQ0FBWSxZQUFaLEVBQTBCLFVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0I7QUFDaEQsMkJBQU8sRUFBRSxXQUFGLEVBQVA7QUFDSCxpQkFGUyxDQUFWO0FBR0Esb0JBQUksSUFBSSxZQUFSLEVBQXNCO0FBQ2xCLDJCQUFPLElBQUksS0FBSixDQUFVLEdBQVYsS0FBa0IsSUFBSSxZQUFKLENBQWlCLEdBQWpCLENBQWxCLElBQTJDLEVBQWxEO0FBQ0g7QUFDRCxvQkFBSSxLQUFLLFNBQVMsV0FBVCxJQUF3QixNQUFqQztBQUNBLHVCQUFPLElBQUksS0FBSixDQUFVLEdBQVYsS0FDSCxHQUFHLGdCQUFILENBQW9CLEdBQXBCLEVBQXlCLEVBQXpCLEVBQTZCLGdCQUE3QixDQUE4QyxHQUE5QyxDQURHLElBQ21ELEVBRDFEO0FBRUgsYUFYRDs7QUFhQSxrQkFBTSxPQUFOLEdBQWdCLE1BQU0sT0FBTixJQUNaLFVBQVUsSUFBVixFQUFnQixLQUFoQixFQUF1QjtBQUNuQix3QkFBUSxTQUFTLENBQWpCO0FBQ0Esb0JBQUksSUFBSSxLQUFLLE1BQWI7QUFDQSx1QkFBTyxRQUFRLENBQWYsRUFBa0I7QUFDZCx3QkFBSSxLQUFLLEtBQUwsTUFBZ0IsSUFBcEIsRUFBMEIsT0FBTyxLQUFQO0FBQzFCLHNCQUFFLEtBQUY7QUFDSDtBQUNELHVCQUFPLENBQUMsQ0FBUjtBQUNILGFBVEw7O0FBV0EsZ0JBQUksU0FBUyxDQUFiO0FBQUEsZ0JBQ0ksU0FBUyxnQkFEYjtBQUFBLGdCQUVJLFlBQVksT0FBTyxNQUZ2Qjs7QUFJQSxxQkFBUyxnQkFBVCxDQUEwQixFQUExQixFQUE4Qjs7QUFFMUIsb0JBQUksU0FBSixFQUFlO0FBQUEsd0JBTUYsYUFORSxHQU1YLFNBQVMsYUFBVCxDQUFzQixHQUF0QixFQUEyQjtBQUN2Qiw0QkFBSSxNQUFNLElBQUksS0FBSixFQUFWO0FBQ0EsNEJBQUksR0FBSixHQUFVLEdBQVY7QUFDQSw0QkFBSSxNQUFKLEdBQWEsWUFBWTs7QUFFckI7QUFDQSxnQ0FBSSxXQUFXLFNBQWYsRUFBMEI7QUFDdEIsb0NBQUksRUFBSixFQUFRO0FBQ1g7QUFFSix5QkFQRDtBQVFILHFCQWpCVTs7QUFFWCx5QkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFNBQXBCLEVBQStCLEdBQS9CLEVBQW9DO0FBQ2hDLHNDQUFhLE9BQU8sQ0FBUCxDQUFiO0FBQ0g7QUFlSixpQkFuQkQsTUFtQk87O0FBRUgsd0JBQUksRUFBSixFQUFRO0FBRVg7QUFFSjs7QUFFRCw2QkFBaUIsUUFBakI7QUFFSDs7OzRDQUVtQjtBQUNoQixpQkFBSyxVQUFMO0FBQ0g7Ozs7OztrQkExR2dCLEk7Ozs7Ozs7QUNBckI7Ozs7QUFDQTs7Ozs7Ozs7SUFFTSxNO0FBRUYsc0JBQWM7QUFBQTs7QUFFVixhQUFLLElBQUwsR0FBWSxFQUFaO0FBQ0EsYUFBSyxJQUFMLENBQVUsTUFBVixHQUFtQixDQUFuQjtBQUNBLGFBQUssSUFBTCxDQUFVLEtBQVYsR0FBa0IsQ0FBbEI7QUFDQSxhQUFLLElBQUwsQ0FBVSxNQUFWLEdBQW1CLENBQ2YsQ0FBQyxVQUFELEVBQWEsOEZBQWIsQ0FEZSxDQUFuQjs7QUFJQSxhQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxhQUFLLFNBQUwsR0FBaUIsRUFBakI7QUFFSDs7OzttQ0FFVSxHLEVBQUssUSxFQUFVLEssRUFBTzs7QUFFN0IsZ0JBQUksT0FBTyxJQUFYOztBQUVBLGdCQUFJLENBQUosRUFDSSxDQURKO0FBRUEsZ0JBQUksS0FBSjtBQUNBLGdCQUFJLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFKO0FBQ0EsY0FBRSxHQUFGLEdBQVEsR0FBUjtBQUNBLGNBQUUsS0FBRixHQUFVLE9BQVY7QUFDQSxjQUFFLE1BQUYsR0FBVyxFQUFFLGtCQUFGLEdBQXVCLFlBQVc7QUFDekMsb0JBQUssQ0FBQyxDQUFELEtBQU8sQ0FBQyxLQUFLLFVBQU4sSUFBb0IsS0FBSyxVQUFMLElBQW1CLFVBQTlDLENBQUwsRUFBaUU7QUFDN0Qsd0JBQUksSUFBSjtBQUNBLHdCQUFHLEtBQUgsRUFBVSxLQUFLLElBQUwsQ0FBVSxNQUFWO0FBQ1Ysd0JBQUksT0FBTyxRQUFQLEtBQW9CLFdBQXhCLEVBQXFDO0FBQ3hDO0FBQ0osYUFORDtBQU9BLGNBQUUsT0FBRixHQUFZLFlBQVc7QUFDbkIsd0JBQVEsR0FBUixDQUFZLCtCQUErQixHQUEzQztBQUNBLG9CQUFJLE9BQU8sUUFBUCxLQUFvQixXQUF4QixFQUFxQztBQUNyQyxvQkFBRyxLQUFILEVBQVUsS0FBSyxJQUFMLENBQVUsS0FBVjtBQUNiLGFBSkQ7QUFLQSxxQkFBUyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxFQUF5QyxXQUF6QyxDQUFxRCxDQUFyRDtBQUVIOzs7Z0NBRVE7O0FBRUwsZ0JBQUksS0FBSyxJQUFMLENBQVUsS0FBVixHQUFrQixFQUF0QixFQUEwQjs7QUFFMUIsZ0JBQUksS0FBSyxJQUFMLENBQVUsTUFBVixHQUFtQixLQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLE1BQXhDLEVBQWdEO0FBQzVDLG9CQUFJLE9BQU8sS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixLQUFLLElBQUwsQ0FBVSxNQUEzQixFQUFtQyxDQUFuQyxDQUFQLENBQUosRUFBbUQ7QUFDL0MseUJBQUssSUFBTCxDQUFVLE1BQVY7QUFDQSx5QkFBSyxLQUFMLEdBQWEsSUFBYixDQUFrQixJQUFsQjtBQUNILGlCQUhELE1BR087QUFDSCx5QkFBSyxVQUFMLENBQWdCLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsS0FBSyxJQUFMLENBQVUsTUFBM0IsRUFBbUMsQ0FBbkMsQ0FBaEIsRUFBdUQsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUF2RCxFQUE4RSxJQUE5RTtBQUNIO0FBQ0osYUFQRCxNQU9PO0FBQ0gscUJBQUssSUFBTDtBQUNIO0FBRUo7OzsrQkFFTTs7QUFFSCxnQkFBSSxTQUFTO0FBQ1Qsc0JBQU0sb0JBREc7QUFFVCwyQkFBVztBQUZGLGFBQWI7O0FBS0EsaUJBQUssUUFBTCxHQUFnQixPQUFPLElBQVAsQ0FBWSxrQkFBWixDQUErQixLQUFLLFFBQXBDLENBQWhCO0FBQ0E7O0FBRUEsbUJBQU8sU0FBUCxDQUFpQixJQUFqQixDQUFzQixLQUFLLFFBQTNCO0FBQ0EsaUJBQUssU0FBTCxHQUFpQixPQUFPLElBQVAsQ0FBWSxlQUFaLENBQTRCLE9BQU8sU0FBUCxDQUFpQixRQUE3QyxDQUFqQjtBQUVIOzs7Ozs7QUFJTCxPQUFPLE1BQVAsR0FBZ0IsWUFBVztBQUN2QixRQUFJLElBQUksTUFBSixFQUFKO0FBQ0EsTUFBRSxLQUFGO0FBQ0gsQ0FIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5UaW1lbGluZSA9IHt9O1xuICAgICAgICBcbiAgICB9XG5cbiAgICBpbml0KEVsZW1lbnRzKSB7XG5cbiAgICAgICAgdGhpcy5FbGVtZW50cyA9IEVsZW1lbnRzO1xuICAgICAgICB0aGlzLlRpbWVsaW5lLm1haW4gPSBuZXcgVGltZWxpbmVNYXgoKTtcblxuICAgICAgICB0aGlzLmFuaW1hdGUoY29uZmlnLmFuaW1hdGlvbik7XG5cbiAgICB9XG4gICAgXG4gICAgYW5pbWF0ZShjKSB7XG5cbiAgICAgICAgbGV0IHRoZSA9IHRoaXMuRWxlbWVudHMsXG4gICAgICAgICAgICB0aW1lbGluZSA9IHRoaXMuVGltZWxpbmU7XG5cbiAgICAgICAgdGltZWxpbmUubWFpblxuICAgICAgICAgICAgLnRvKHRoZS5CYW5uZXIsIDAuMiwge29wYWNpdHk6IDF9KVxuICAgICAgICAgICAgLmZyb20odGhlLkNUQSwgMSwge29wYWNpdHk6IDB9KVxuICAgICAgICA7XG4gICAgICAgIFxuICAgIH1cblxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvcmUge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0QWxsRWxlbWVudHNCeUlkKEVsZW1lbnRzKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAoRWxlbWVudHMubGVuZ3RoKSBFbGVtZW50cyA9IHt9O1xuICAgICAgICBcbiAgICAgICAgdmFyIG5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYm9keSBbaWRdJyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgRWxlbWVudHNbbm9kZXNbaV0uZ2V0QXR0cmlidXRlKCdpZCcpXSA9IG5vZGVzW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEVsZW1lbnRzO1xuXG4gICAgfVxuXG4gICAgZ2V0QWxsVGltZWxpbmVzKHRpbWVsaW5lcykge1xuXG4gICAgICAgIGxldCB0ID0gW107XG4gICAgICAgIGZvciAobGV0IHRpbWVsaW5lIGluIHRpbWVsaW5lcykge1xuICAgICAgICAgICAgaWYgKHRpbWVsaW5lcy5oYXNPd25Qcm9wZXJ0eSh0aW1lbGluZSkpIHQucHVzaCh0aW1lbGluZXNbdGltZWxpbmVdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcblxuICAgIH1cblxuICAgIGxvYWRJbWFnZXMoY2FsbGJhY2spIHtcblxuICAgICAgICBmdW5jdGlvbiBnZXRhbGxCZ2ltYWdlcygpIHtcbiAgICAgICAgICAgIHZhciB1cmwsIEIgPSBbXSwgQSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyk7XG4gICAgICAgICAgICBBID0gQi5zbGljZS5jYWxsKEEsIDAsIEEubGVuZ3RoKTtcbiAgICAgICAgICAgIHdoaWxlIChBLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHVybCA9IGRvY3VtZW50LmRlZXBDc3MoQS5zaGlmdCgpLCAnYmFja2dyb3VuZC1pbWFnZScpO1xuICAgICAgICAgICAgICAgIGlmICh1cmwpIHVybCA9IC91cmxcXChbJ1wiXT8oW15cIildKykvLmV4ZWModXJsKSB8fCBbXTtcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmxbMV07XG4gICAgICAgICAgICAgICAgaWYgKHVybCAmJiBCLmluZGV4T2YodXJsKSA9PSAtMSkgQltCLmxlbmd0aF0gPSB1cmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gQjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmRlZXBDc3MgPSBmdW5jdGlvbiAod2hvLCBjc3MpIHtcbiAgICAgICAgICAgIGlmICghd2hvIHx8ICF3aG8uc3R5bGUpIHJldHVybiAnJztcbiAgICAgICAgICAgIHZhciBzdHkgPSBjc3MucmVwbGFjZSgvXFwtKFthLXpdKS9nLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBiLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh3aG8uY3VycmVudFN0eWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdoby5zdHlsZVtzdHldIHx8IHdoby5jdXJyZW50U3R5bGVbc3R5XSB8fCAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkdiA9IGRvY3VtZW50LmRlZmF1bHRWaWV3IHx8IHdpbmRvdztcbiAgICAgICAgICAgIHJldHVybiB3aG8uc3R5bGVbc3R5XSB8fFxuICAgICAgICAgICAgICAgIGR2LmdldENvbXB1dGVkU3R5bGUod2hvLCBcIlwiKS5nZXRQcm9wZXJ0eVZhbHVlKGNzcykgfHwgJyc7XG4gICAgICAgIH07XG5cbiAgICAgICAgQXJyYXkuaW5kZXhPZiA9IEFycmF5LmluZGV4T2YgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uICh3aGF0LCBpbmRleCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kZXggfHwgMDtcbiAgICAgICAgICAgICAgICB2YXIgTCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpbmRleCA8IEwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbaW5kZXhdID09PSB3aGF0KSByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICsraW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgdmFyIGxvYWRlZCA9IDAsXG4gICAgICAgICAgICBpbWFnZXMgPSBnZXRhbGxCZ2ltYWdlcygpLFxuICAgICAgICAgICAgaW1hZ2VzTnVtID0gaW1hZ2VzLmxlbmd0aDtcblxuICAgICAgICBmdW5jdGlvbiBwcmVsb2FkQWxsSW1hZ2VzKGNiKSB7XG5cbiAgICAgICAgICAgIGlmIChpbWFnZXNOdW0pIHtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1hZ2VzTnVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcHJlbG9hZEltYWdlKGltYWdlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcHJlbG9hZEltYWdlKHVybCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSB1cmw7XG4gICAgICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRlZCA9PT0gaW1hZ2VzTnVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSBjYigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2IpIGNiKCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcHJlbG9hZEFsbEltYWdlcyhjYWxsYmFjayk7XG5cbiAgICB9XG5cbiAgICBjaGVja0Fzc2V0c0xvYWRlZCgpIHtcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2VzKCk7XG4gICAgfVxuXG59XG5cbiIsImltcG9ydCBDb3JlIGZyb20gJy4vYmFubmVyL2NvcmUnO1xuaW1wb3J0IEFuaW1hdGlvbiBmcm9tICcuL2Jhbm5lci9hbmltYXRpb24nO1xuXG5jbGFzcyBCYW5uZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5MaWJzID0ge307XG4gICAgICAgIHRoaXMuTGlicy5sb2FkZWQgPSAwO1xuICAgICAgICB0aGlzLkxpYnMuZmFpbHMgPSAwO1xuICAgICAgICB0aGlzLkxpYnMuc291cmNlID0gW1xuICAgICAgICAgICAgWydUd2Vlbk1heCcsICcvL3MwLjJtZG4ubmV0L2Fkcy9zdHVkaW8vY2FjaGVkX2xpYnMvdHdlZW5tYXhfMS4xOC4wXzQ5OWJhNjRhMjMzNzg1NDU3NDhmZjEyZDM3MmU1OWU5X21pbi5qcyddXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5FbGVtZW50cyA9IHt9O1xuICAgICAgICB0aGlzLlRpbWVsaW5lcyA9IFtdO1xuXG4gICAgfVxuICAgIFxuICAgIGxvYWRTY3JpcHQoc3JjLCBjYWxsYmFjaywgaXNMaWIpIHtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIFxuICAgICAgICB2YXIgcyxcbiAgICAgICAgICAgIHI7XG4gICAgICAgIHIgPSBmYWxzZTtcbiAgICAgICAgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzLnNyYyA9IHNyYztcbiAgICAgICAgcy5hc3luYyA9ICdhc3luYyc7XG4gICAgICAgIHMub25sb2FkID0gcy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICggIXIgJiYgKCF0aGlzLnJlYWR5U3RhdGUgfHwgdGhpcy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpICkge1xuICAgICAgICAgICAgICAgIHIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmKGlzTGliKSBzZWxmLkxpYnMubG9hZGVkKys7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHMub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIGxvYWRpbmcgdGhpcyBzY3JpcHQgJyArIHNyYyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAndW5kZWZpbmVkJykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIGlmKGlzTGliKSBzZWxmLkxpYnMuZmFpbHMrKztcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzKTtcblxuICAgIH1cblxuICAgIFN0YWN5ICgpIHtcblxuICAgICAgICBpZiAodGhpcy5MaWJzLmZhaWxzID4gMTApIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5MaWJzLmxvYWRlZCA8IHRoaXMuTGlicy5zb3VyY2UubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAod2luZG93W3RoaXMuTGlicy5zb3VyY2VbdGhpcy5MaWJzLmxvYWRlZF1bMF1dKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5MaWJzLmxvYWRlZCsrO1xuICAgICAgICAgICAgICAgIHRoaXMuU3RhY3koKS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRTY3JpcHQodGhpcy5MaWJzLnNvdXJjZVt0aGlzLkxpYnMubG9hZGVkXVsxXSwgdGhpcy5TdGFjeS5iaW5kKHRoaXMpLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuSW5pdCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBJbml0KCkge1xuXG4gICAgICAgIGxldCBiYW5uZXIgPSB7XG4gICAgICAgICAgICBjb3JlOiBuZXcgQ29yZSxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogbmV3IEFuaW1hdGlvblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuRWxlbWVudHMgPSBiYW5uZXIuY29yZS5nZXRBbGxFbGVtZW50c0J5SWQodGhpcy5FbGVtZW50cyk7XG4gICAgICAgIC8vIGJhbm5lci5jb3JlLmNoZWNrQXNzZXRzTG9hZGVkKCk7XG5cbiAgICAgICAgYmFubmVyLmFuaW1hdGlvbi5pbml0KHRoaXMuRWxlbWVudHMpO1xuICAgICAgICB0aGlzLlRpbWVsaW5lcyA9IGJhbm5lci5jb3JlLmdldEFsbFRpbWVsaW5lcyhiYW5uZXIuYW5pbWF0aW9uLlRpbWVsaW5lKTtcblxuICAgIH1cblxufVxuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgYiA9IG5ldyBCYW5uZXI7XG4gICAgYi5TdGFjeSgpO1xufTsiXX0=
