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

            timeline.main.to(the.Banner, 0.2, { opacity: 1 }).from(the.CTA, 5, { opacity: 0 });
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

        this.Libs = {};
        this.Libs.loaded = 0;
        this.Libs.fails = 0;
        this.Libs.source = [['TweenMax', '//s0.2mdn.net/ads/studio/cached_libs/tweenmax_1.18.0_499ba64a23378545748ff12d372e59e9_min.js']];

        this.Elements = {};
        this.Timelines = [];
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
        key: 'loadScript',
        value: function loadScript(src, isLib) {

            var self = this;
            return new Promise(function (resolve, reject) {

                var s, r;
                r = false;
                s = document.createElement('script');
                s.src = src;
                s.async = 'async';
                s.onload = s.onreadystatechange = function () {
                    if (!r && (!this.readyState || this.readyState == 'complete')) {
                        r = true;
                        if (isLib) self.Libs.loaded++;
                        resolve();
                    }
                };
                s.onerror = function () {
                    if (isLib) self.Libs.fails++;
                    reject(src);
                };
                document.getElementsByTagName('head')[0].appendChild(s);
            });
        }
    }, {
        key: 'getAllImages',
        value: function getAllImages() {

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
    }, {
        key: 'loadImages',
        value: function loadImages() {
            var _this = this;

            return new Promise(function (resolve, reject) {

                var loaded = 0,
                    images = _this.getAllImages(),
                    imagesTotal = images.length;

                if (imagesTotal) {
                    var _preloadImage = function _preloadImage(url) {
                        var img = new Image();
                        img.src = url;
                        img.onload = function () {

                            loaded++;
                            if (loaded === imagesTotal) {
                                resolve();
                            }
                        };
                        img.onerror = function () {
                            reject(url);
                        };
                    };

                    for (var i = 0; i < imagesTotal; i++) {
                        _preloadImage(images[i]);
                    }
                } else {

                    resolve();
                }
            });
        }
    }, {
        key: 'checkAssetsLoaded',
        value: function checkAssetsLoaded() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.loadImages().then(resolve).catch(reject);
            });
        }
    }]);

    return Core;
}();

exports.default = Core;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _core = require('./banner/core');

var _core2 = _interopRequireDefault(_core);

var _animation = require('./banner/animation');

var _animation2 = _interopRequireDefault(_animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Banner = function (_Core) {
    _inherits(Banner, _Core);

    function Banner() {
        _classCallCheck(this, Banner);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Banner).apply(this, arguments));
    }

    _createClass(Banner, [{
        key: 'Stacy',
        value: function Stacy() {
            var _this2 = this;

            if (this.Libs.fails > 10) return;

            if (this.Libs.loaded < this.Libs.source.length) {

                if (window[this.Libs.source[this.Libs.loaded][0]]) {

                    this.Libs.loaded++;
                    self.Stacy();
                } else {

                    _get(Object.getPrototypeOf(Banner.prototype), 'loadScript', this).call(this, this.Libs.source[this.Libs.loaded][1], true).then(function () {
                        return _this2.Stacy();
                    }).catch(function (src) {
                        console.log('Error loading script: ' + src);
                        _this2.Stacy();
                    });
                }
            } else {
                this.Init();
            }
        }
    }, {
        key: 'Init',
        value: function Init() {

            var banner = {};

            this.Elements = _get(Object.getPrototypeOf(Banner.prototype), 'getAllElementsById', this).call(this, this.Elements);

            banner.animation = new _animation2.default(this.Elements, config);

            _get(Object.getPrototypeOf(Banner.prototype), 'checkAssetsLoaded', this).call(this).then(function () {
                return banner.animation.animate();
            });

            this.Timelines = _get(Object.getPrototypeOf(Banner.prototype), 'getAllTimelines', this).call(this, banner.animation.Timeline);
        }
    }]);

    return Banner;
}(_core2.default);

window.onload = function () {
    b = new Banner();
    b.Stacy();
};

},{"./banner/animation":1,"./banner/core":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjcmVhdGl2ZS9zb3VyY2Uvc2NyaXB0cy9iYW5uZXIvYW5pbWF0aW9uLmpzIiwiY3JlYXRpdmUvc291cmNlL3NjcmlwdHMvYmFubmVyL2NvcmUuanMiLCJjcmVhdGl2ZS9zb3VyY2Uvc2NyaXB0cy9pbml0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FxQixTO0FBRWpCLHVCQUFZLFFBQVosRUFBc0IsTUFBdEIsRUFBOEI7QUFBQTs7QUFFMUIsYUFBSyxRQUFMLEdBQWdCO0FBQ1osa0JBQU0sSUFBSSxXQUFKO0FBRE0sU0FBaEI7O0FBSUEsYUFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUVIOzs7O2tDQUVTOztBQUVOLGdCQUFJLE1BQU0sS0FBSyxRQUFmO0FBQUEsZ0JBQ0ksV0FBVyxLQUFLLFFBRHBCO0FBQUEsZ0JBRUksSUFBSSxLQUFLLE1BQUwsQ0FBWSxTQUZwQjs7QUFJQSxxQkFBUyxJQUFULENBQ0ssRUFETCxDQUNRLElBQUksTUFEWixFQUNvQixHQURwQixFQUN5QixFQUFDLFNBQVMsQ0FBVixFQUR6QixFQUVLLElBRkwsQ0FFVSxJQUFJLEdBRmQsRUFFbUIsQ0FGbkIsRUFFc0IsRUFBQyxTQUFTLENBQVYsRUFGdEI7QUFLSDs7Ozs7O2tCQXhCZ0IsUzs7Ozs7Ozs7Ozs7OztJQ0FBLEk7QUFFakIsb0JBQWM7QUFBQTs7QUFFVixhQUFLLElBQUwsR0FBWSxFQUFaO0FBQ0EsYUFBSyxJQUFMLENBQVUsTUFBVixHQUFtQixDQUFuQjtBQUNBLGFBQUssSUFBTCxDQUFVLEtBQVYsR0FBa0IsQ0FBbEI7QUFDQSxhQUFLLElBQUwsQ0FBVSxNQUFWLEdBQW1CLENBQ2YsQ0FBQyxVQUFELEVBQWEsOEZBQWIsQ0FEZSxDQUFuQjs7QUFJQSxhQUFLLFFBQUwsR0FBZ0Is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aUJBQUssU0FBTCxxRkFBdUMsT0FBTyxTQUFQLENBQWlCLFFBQXhEO0FBRUg7Ozs7OztBQUlMLE9BQU8sTUFBUCxHQUFnQixZQUFXO0FBQ3ZCLFFBQUksSUFBSSxNQUFKLEVBQUo7QUFDQSxNQUFFLEtBQUY7QUFDSCxDQUhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuaW1hdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50cywgY29uZmlnKSB7XG5cbiAgICAgICAgdGhpcy5UaW1lbGluZSA9IHtcbiAgICAgICAgICAgIG1haW46IG5ldyBUaW1lbGluZU1heCgpXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5FbGVtZW50cyA9IGVsZW1lbnRzO1xuICAgICAgICB0aGlzLkNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGFuaW1hdGUoKSB7XG5cbiAgICAgICAgbGV0IHRoZSA9IHRoaXMuRWxlbWVudHMsXG4gICAgICAgICAgICB0aW1lbGluZSA9IHRoaXMuVGltZWxpbmUsXG4gICAgICAgICAgICBjID0gdGhpcy5Db25maWcuYW5pbWF0aW9uO1xuXG4gICAgICAgIHRpbWVsaW5lLm1haW5cbiAgICAgICAgICAgIC50byh0aGUuQmFubmVyLCAwLjIsIHtvcGFjaXR5OiAxfSlcbiAgICAgICAgICAgIC5mcm9tKHRoZS5DVEEsIDUsIHtvcGFjaXR5OiAwfSlcbiAgICAgICAgO1xuXG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29yZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLkxpYnMgPSB7fTtcbiAgICAgICAgdGhpcy5MaWJzLmxvYWRlZCA9IDA7XG4gICAgICAgIHRoaXMuTGlicy5mYWlscyA9IDA7XG4gICAgICAgIHRoaXMuTGlicy5zb3VyY2UgPSBbXG4gICAgICAgICAgICBbJ1R3ZWVuTWF4JywgJy8vczAuMm1kbi5uZXQvYWRzL3N0dWRpby9jYWNoZWRfbGlicy90d2Vlbm1heF8xLjE4LjBfNDk5YmE2NGEyMzM3ODU0NTc0OGZmMTJkMzcyZTU5ZTlfbWluLmpzJ11cbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLkVsZW1lbnRzID0ge307XG4gICAgICAgIHRoaXMuVGltZWxpbmVzID0gW107XG4gICAgICAgIFxuICAgIH1cblxuICAgIGdldEFsbEVsZW1lbnRzQnlJZChFbGVtZW50cykge1xuICAgICAgICBcbiAgICAgICAgaWYgKEVsZW1lbnRzLmxlbmd0aCkgRWxlbWVudHMgPSB7fTtcbiAgICAgICAgXG4gICAgICAgIHZhciBub2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2JvZHkgW2lkXScpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIEVsZW1lbnRzW25vZGVzW2ldLmdldEF0dHJpYnV0ZSgnaWQnKV0gPSBub2Rlc1tpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBFbGVtZW50cztcblxuICAgIH1cblxuICAgIGdldEFsbFRpbWVsaW5lcyh0aW1lbGluZXMpIHtcblxuICAgICAgICBsZXQgdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCB0aW1lbGluZSBpbiB0aW1lbGluZXMpIHtcbiAgICAgICAgICAgIGlmICh0aW1lbGluZXMuaGFzT3duUHJvcGVydHkodGltZWxpbmUpKSB0LnB1c2godGltZWxpbmVzW3RpbWVsaW5lXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG5cbiAgICB9XG4gICAgXG5cbiAgICBsb2FkU2NyaXB0KHNyYywgaXNMaWIpIHtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIHZhciBzLFxuICAgICAgICAgICAgICAgIHI7XG4gICAgICAgICAgICByID0gZmFsc2U7XG4gICAgICAgICAgICBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICBzLnNyYyA9IHNyYztcbiAgICAgICAgICAgIHMuYXN5bmMgPSAnYXN5bmMnO1xuICAgICAgICAgICAgcy5vbmxvYWQgPSBzLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICggIXIgJiYgKCF0aGlzLnJlYWR5U3RhdGUgfHwgdGhpcy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpICkge1xuICAgICAgICAgICAgICAgICAgICByID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNMaWIpIHNlbGYuTGlicy5sb2FkZWQrKztcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihpc0xpYikgc2VsZi5MaWJzLmZhaWxzKys7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHNyYyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcblxuICAgIH1cbiAgICBcbiAgICBcbiAgICBnZXRBbGxJbWFnZXMoKSB7XG5cbiAgICAgICAgZG9jdW1lbnQuZGVlcENzcyA9IGZ1bmN0aW9uICh3aG8sIGNzcykge1xuICAgICAgICAgICAgaWYgKCF3aG8gfHwgIXdoby5zdHlsZSkgcmV0dXJuICcnO1xuICAgICAgICAgICAgdmFyIHN0eSA9IGNzcy5yZXBsYWNlKC9cXC0oW2Etel0pL2csIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHdoby5jdXJyZW50U3R5bGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2hvLnN0eWxlW3N0eV0gfHwgd2hvLmN1cnJlbnRTdHlsZVtzdHldIHx8ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGR2ID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93O1xuICAgICAgICAgICAgcmV0dXJuIHdoby5zdHlsZVtzdHldIHx8XG4gICAgICAgICAgICAgICAgZHYuZ2V0Q29tcHV0ZWRTdHlsZSh3aG8sIFwiXCIpLmdldFByb3BlcnR5VmFsdWUoY3NzKSB8fCAnJztcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdXJsLCBCID0gW10sIEEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpO1xuICAgICAgICBBID0gQi5zbGljZS5jYWxsKEEsIDAsIEEubGVuZ3RoKTtcbiAgICAgICAgd2hpbGUgKEEubGVuZ3RoKSB7XG4gICAgICAgICAgICB1cmwgPSBkb2N1bWVudC5kZWVwQ3NzKEEuc2hpZnQoKSwgJ2JhY2tncm91bmQtaW1hZ2UnKTtcbiAgICAgICAgICAgIGlmICh1cmwpIHVybCA9IC91cmxcXChbJ1wiXT8oW15cIildKykvLmV4ZWModXJsKSB8fCBbXTtcbiAgICAgICAgICAgIHVybCA9IHVybFsxXTtcbiAgICAgICAgICAgIGlmICh1cmwgJiYgQi5pbmRleE9mKHVybCkgPT0gLTEpIEJbQi5sZW5ndGhdID0gdXJsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBCO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBsb2FkSW1hZ2VzKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgbGV0IGxvYWRlZCA9IDAsXG4gICAgICAgICAgICAgICAgaW1hZ2VzID0gdGhpcy5nZXRBbGxJbWFnZXMoKSxcbiAgICAgICAgICAgICAgICBpbWFnZXNUb3RhbCA9IGltYWdlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChpbWFnZXNUb3RhbCkge1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWFnZXNUb3RhbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZWxvYWRJbWFnZShpbWFnZXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHByZWxvYWRJbWFnZSh1cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjID0gdXJsO1xuICAgICAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkZWQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2FkZWQgPT09IGltYWdlc1RvdGFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHVybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KVxuXG4gICAgfVxuICAgIFxuXG4gICAgY2hlY2tBc3NldHNMb2FkZWQoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkSW1hZ2VzKClcbiAgICAgICAgICAgICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxufSIsImltcG9ydCBDb3JlIGZyb20gJy4vYmFubmVyL2NvcmUnO1xuaW1wb3J0IEFuaW1hdGlvbiBmcm9tICcuL2Jhbm5lci9hbmltYXRpb24nO1xuXG5jbGFzcyBCYW5uZXIgZXh0ZW5kcyBDb3JlIHtcblxuICAgIFN0YWN5ICgpIHtcblxuICAgICAgICBpZiAodGhpcy5MaWJzLmZhaWxzID4gMTApIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5MaWJzLmxvYWRlZCA8IHRoaXMuTGlicy5zb3VyY2UubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIGlmICh3aW5kb3dbdGhpcy5MaWJzLnNvdXJjZVt0aGlzLkxpYnMubG9hZGVkXVswXV0pIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuTGlicy5sb2FkZWQrKztcbiAgICAgICAgICAgICAgICBzZWxmLlN0YWN5KCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBzdXBlci5sb2FkU2NyaXB0KHRoaXMuTGlicy5zb3VyY2VbdGhpcy5MaWJzLmxvYWRlZF1bMV0sIHRydWUpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuU3RhY3koKSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChzcmMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBsb2FkaW5nIHNjcmlwdDogJyArIHNyYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlN0YWN5KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuSW5pdCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBJbml0KCkge1xuICAgICAgICBcbiAgICAgICAgbGV0IGJhbm5lciA9IHt9O1xuXG4gICAgICAgIHRoaXMuRWxlbWVudHMgPSBzdXBlci5nZXRBbGxFbGVtZW50c0J5SWQodGhpcy5FbGVtZW50cyk7XG4gICAgICAgIFxuICAgICAgICBiYW5uZXIuYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbih0aGlzLkVsZW1lbnRzLCBjb25maWcpO1xuXG4gICAgICAgIHN1cGVyLmNoZWNrQXNzZXRzTG9hZGVkKClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiBiYW5uZXIuYW5pbWF0aW9uLmFuaW1hdGUoKSApO1xuXG4gICAgICAgIHRoaXMuVGltZWxpbmVzID0gc3VwZXIuZ2V0QWxsVGltZWxpbmVzKGJhbm5lci5hbmltYXRpb24uVGltZWxpbmUpO1xuXG4gICAgfVxuXG59XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBiID0gbmV3IEJhbm5lcjtcbiAgICBiLlN0YWN5KCk7XG59OyJdfQ==
