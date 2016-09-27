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

var Components = function () {
    function Components(elements) {
        _classCallCheck(this, Components);

        this.Elements = elements;
        this.Components = {};

        this.addComponents();
    }

    _createClass(Components, [{
        key: 'init',
        value: function init() {

            var C = this.Components,
                selector = 'data-component',
                nodes = document.querySelectorAll('[' + selector + ']'),
                components = [],
                el = void 0;

            for (var key in C) {
                if (C.hasOwnProperty(key)) components.push(key);
            }

            for (var i = 0; i < nodes.length; i++) {
                el = nodes[i];
                for (var j = 0; j < components.length; j++) {
                    if (el.getAttribute(selector) === components[j]) C[components[j]](el);
                }
            }
        }
    }, {
        key: 'add',
        value: function add(n, f) {
            this.Components[n] = f;
        }
    }, {
        key: 'addComponents',
        value: function addComponents() {

            this.add('Comp', function (el) {
                console.log('component');
            });
        }
    }]);

    return Components;
}();

exports.default = Components;

},{}],3:[function(require,module,exports){
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
        value: function getAllElementsById() {

            if (this.Elements.length) this.Elements = {};

            var nodes = document.querySelectorAll('body [id]');

            for (var i = 0; i < nodes.length; i++) {
                this.Elements[nodes[i].getAttribute('id')] = nodes[i];
            }

            return this.Elements;
        }
    }, {
        key: 'getAllTimelines',
        value: function getAllTimelines(timelines) {

            var t = [];
            for (var timeline in timelines) {
                if (timelines.hasOwnProperty(timeline)) t.push(timelines[timeline]);
            }
            this.Timelines = t;
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = function () {
    function Events(elements) {
        _classCallCheck(this, Events);

        this.Elements = elements;
        this.Events = [];

        this.addEvents();
    }

    _createClass(Events, [{
        key: 'init',
        value: function init() {

            var items = this.Events;

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var selector = document.querySelectorAll(item.element);
                for (var j = 0; j < selector.length; j++) {
                    selector[j].addEventListener(item.event, item.function, false);
                }
            }
        }
    }, {
        key: 'add',
        value: function add(el, e, f) {
            this.Events.push({
                element: el,
                event: e,
                function: f
            });
        }
    }, {
        key: 'addEvents',
        value: function addEvents() {
            var _this = this;

            this.add('#clickTag', 'click', function () {
                window.open(clickTag, '_blank');
            });

            this.add('#Banner', 'mouseover', function () {
                TweenMax.to(_this.Elements.CTA, .2, { ease: Power3.easeInOut, scale: 1.2 });
            });

            this.add('#Banner', 'mouseout', function () {
                TweenMax.to(_this.Elements.CTA, .2, { ease: Power3.easeInOut, scale: 1 });
            });
        }
    }]);

    return Events;
}();

exports.default = Events;

},{}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _core = require('./banner/core');

var _core2 = _interopRequireDefault(_core);

var _components = require('./banner/components');

var _components2 = _interopRequireDefault(_components);

var _animation = require('./banner/animation');

var _animation2 = _interopRequireDefault(_animation);

var _events = require('./banner/events');

var _events2 = _interopRequireDefault(_events);

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

            _get(Object.getPrototypeOf(Banner.prototype), 'getAllElementsById', this).call(this);

            banner.components = new _components2.default(this.Elements);
            banner.components.init();

            _get(Object.getPrototypeOf(Banner.prototype), 'getAllElementsById', this).call(this);

            banner.events = new _events2.default(this.Elements);

            banner.animation = new _animation2.default(this.Elements, config);

            _get(Object.getPrototypeOf(Banner.prototype), 'checkAssetsLoaded', this).call(this).then(function () {
                banner.events.init();
                banner.animation.animate();
            });

            _get(Object.getPrototypeOf(Banner.prototype), 'getAllTimelines', this).call(this, banner.animation.Timeline);
        }
    }]);

    return Banner;
}(_core2.default);

window.onload = function () {
    b = new Banner();
    b.Stacy();
};

},{"./banner/animation":1,"./banner/components":2,"./banner/core":3,"./banner/events":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjcmVhdGl2ZS9zb3VyY2Uvc2NyaXB0cy9iYW5uZXIvYW5pbWF0aW9uLmpzIiwiY3JlYXRpdmUvc291cmNlL3NjcmlwdHMvYmFubmVyL2NvbXBvbmVudHMuanMiLCJjcmVhdGl2ZS9zb3VyY2Uvc2NyaXB0cy9iYW5uZXIvY29yZS5qcyIsImNyZWF0aXZlL3NvdXJjZS9zY3JpcHRzL2Jhbm5lci9ldmVudHMuanMiLCJjcmVhdGl2ZS9zb3VyY2Uvc2NyaXB0cy9pbml0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FxQixTO0FBRWpCLHVCQUFZLFFBQVosRUFBc0IsTUFBdEIsRUFBOEI7QUFBQTs7QUFFMUIsYUFBSyxRQUFMLEdBQWdCO0FBQ1osa0JBQU0sSUFBSSxXQUFKO0FBRE0sU0FBaEI7O0FBSUEsYUFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUVIOzs7O2tDQUVTOztBQUVOLGdCQUFJLE1BQU0sS0FBSyxRQUFmO0FBQUEsZ0JBQ0ksV0FBVyxLQUFLLFFBRHBCO0FBQUEsZ0JBRUksSUFBSSxLQUFLLE1BQUwsQ0FBWSxTQUZwQjs7QUFJQSxxQkFBUyxJQUFULENBQ0ssRUFETCxDQUNRLElBQUksTUFEWixFQUNvQixHQURwQixFQUN5QixFQUFDLFNBQVMsQ0FBVixFQUR6QixFQUVLLElBRkwsQ0FFVSxJQUFJLEdBRmQsRUFFbUIsQ0FGbkIsRUFFc0IsRUFBQyxTQUFTLENBQVYsRUFGdEI7QUFLSDs7Ozs7O2tCQXhCZ0IsUzs7Ozs7Ozs7Ozs7OztJQ0FBLFU7QUFFakIsd0JBQVksUUFBWixFQUFzQjtBQUFBOztBQUVsQixhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsRUFBbEI7O0FBRUEsYUFBSyxhQUFMO0FBRUg7Ozs7K0JBRU07O0FB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Q0gscUJBQUssSUFBTDtBQUNIO0FBRUo7OzsrQkFFTTs7QUFFSCxnQkFBSSxTQUFTLEVBQWI7O0FBRUE7O0FBRUEsbUJBQU8sVUFBUCxHQUFvQix5QkFBZSxLQUFLLFFBQXBCLENBQXBCO0FBQ0EsbUJBQU8sVUFBUCxDQUFrQixJQUFsQjs7QUFFQTs7QUFFQSxtQkFBTyxNQUFQLEdBQWdCLHFCQUFVLEtBQUssUUFBZixDQUFoQjs7QUFFQSxtQkFBTyxTQUFQLEdBQW1CLHdCQUFjLEtBQUssUUFBbkIsRUFBNkIsTUFBN0IsQ0FBbkI7O0FBRUEsZ0dBQ0ssSUFETCxDQUNXLFlBQU07QUFDVCx1QkFBTyxNQUFQLENBQWMsSUFBZDtBQUNBLHVCQUFPLFNBQVAsQ0FBaUIsT0FBakI7QUFDSCxhQUpMOztBQU1BLDhGQUFzQixPQUFPLFNBQVAsQ0FBaUIsUUFBdkM7QUFFSDs7Ozs7O0FBS0wsT0FBTyxNQUFQLEdBQWdCLFlBQVc7QUFDdkIsUUFBSSxJQUFJLE1BQUosRUFBSjtBQUNBLE1BQUUsS0FBRjtBQUNILENBSEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWF0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRzLCBjb25maWcpIHtcblxuICAgICAgICB0aGlzLlRpbWVsaW5lID0ge1xuICAgICAgICAgICAgbWFpbjogbmV3IFRpbWVsaW5lTWF4KClcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLkVsZW1lbnRzID0gZWxlbWVudHM7XG4gICAgICAgIHRoaXMuQ29uZmlnID0gY29uZmlnO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgYW5pbWF0ZSgpIHtcblxuICAgICAgICBsZXQgdGhlID0gdGhpcy5FbGVtZW50cyxcbiAgICAgICAgICAgIHRpbWVsaW5lID0gdGhpcy5UaW1lbGluZSxcbiAgICAgICAgICAgIGMgPSB0aGlzLkNvbmZpZy5hbmltYXRpb247XG5cbiAgICAgICAgdGltZWxpbmUubWFpblxuICAgICAgICAgICAgLnRvKHRoZS5CYW5uZXIsIDAuMiwge29wYWNpdHk6IDF9KVxuICAgICAgICAgICAgLmZyb20odGhlLkNUQSwgNSwge29wYWNpdHk6IDB9KVxuICAgICAgICA7XG5cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnRzIHtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRzKSB7XG5cbiAgICAgICAgdGhpcy5FbGVtZW50cyA9IGVsZW1lbnRzO1xuICAgICAgICB0aGlzLkNvbXBvbmVudHMgPSB7fTtcblxuICAgICAgICB0aGlzLmFkZENvbXBvbmVudHMoKTtcblxuICAgIH1cblxuICAgIGluaXQoKSB7XG5cbiAgICAgICAgbGV0IEMgPSB0aGlzLkNvbXBvbmVudHMsXG4gICAgICAgICAgICBzZWxlY3RvciA9ICdkYXRhLWNvbXBvbmVudCcsXG4gICAgICAgICAgICBub2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1snICsgc2VsZWN0b3IgKyAnXScpLFxuICAgICAgICAgICAgY29tcG9uZW50cyA9IFtdLFxuICAgICAgICAgICAgZWw7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIEMpIHtcbiAgICAgICAgICAgIGlmIChDLmhhc093blByb3BlcnR5KGtleSkpIGNvbXBvbmVudHMucHVzaChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZWwgPSBub2Rlc1tpXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29tcG9uZW50cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoc2VsZWN0b3IpID09PSBjb21wb25lbnRzW2pdKSBDW2NvbXBvbmVudHNbal1dKGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgYWRkKG4sIGYpIHtcbiAgICAgICAgdGhpcy5Db21wb25lbnRzW25dID0gZjtcbiAgICB9XG5cbiAgICBhZGRDb21wb25lbnRzKCkge1xuXG4gICAgICAgIHRoaXMuYWRkKCdDb21wJywgZWwgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbXBvbmVudCcpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvcmUge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5MaWJzID0ge307XG4gICAgICAgIHRoaXMuTGlicy5sb2FkZWQgPSAwO1xuICAgICAgICB0aGlzLkxpYnMuZmFpbHMgPSAwO1xuICAgICAgICB0aGlzLkxpYnMuc291cmNlID0gW1xuICAgICAgICAgICAgWydUd2Vlbk1heCcsICcvL3MwLjJtZG4ubmV0L2Fkcy9zdHVkaW8vY2FjaGVkX2xpYnMvdHdlZW5tYXhfMS4xOC4wXzQ5OWJhNjRhMjMzNzg1NDU3NDhmZjEyZDM3MmU1OWU5X21pbi5qcyddXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5FbGVtZW50cyA9IHt9O1xuICAgICAgICB0aGlzLlRpbWVsaW5lcyA9IFtdO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBnZXRBbGxFbGVtZW50c0J5SWQoKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5FbGVtZW50cy5sZW5ndGgpIHRoaXMuRWxlbWVudHMgPSB7fTtcbiAgICAgICAgXG4gICAgICAgIHZhciBub2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2JvZHkgW2lkXScpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuRWxlbWVudHNbbm9kZXNbaV0uZ2V0QXR0cmlidXRlKCdpZCcpXSA9IG5vZGVzW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuRWxlbWVudHM7XG5cbiAgICB9XG5cbiAgICBnZXRBbGxUaW1lbGluZXModGltZWxpbmVzKSB7XG5cbiAgICAgICAgbGV0IHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgdGltZWxpbmUgaW4gdGltZWxpbmVzKSB7XG4gICAgICAgICAgICBpZiAodGltZWxpbmVzLmhhc093blByb3BlcnR5KHRpbWVsaW5lKSkgdC5wdXNoKHRpbWVsaW5lc1t0aW1lbGluZV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuVGltZWxpbmVzID0gdDtcblxuICAgIH1cbiAgICBcblxuICAgIGxvYWRTY3JpcHQoc3JjLCBpc0xpYikge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgdmFyIHMsXG4gICAgICAgICAgICAgICAgcjtcbiAgICAgICAgICAgIHIgPSBmYWxzZTtcbiAgICAgICAgICAgIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgIHMuc3JjID0gc3JjO1xuICAgICAgICAgICAgcy5hc3luYyA9ICdhc3luYyc7XG4gICAgICAgICAgICBzLm9ubG9hZCA9IHMub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhciAmJiAoIXRoaXMucmVhZHlTdGF0ZSB8fCB0aGlzLnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJykgKSB7XG4gICAgICAgICAgICAgICAgICAgIHIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZihpc0xpYikgc2VsZi5MaWJzLmxvYWRlZCsrO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHMub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKGlzTGliKSBzZWxmLkxpYnMuZmFpbHMrKztcbiAgICAgICAgICAgICAgICByZWplY3Qoc3JjKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHMpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfVxuICAgIFxuICAgIFxuICAgIGdldEFsbEltYWdlcygpIHtcblxuICAgICAgICBkb2N1bWVudC5kZWVwQ3NzID0gZnVuY3Rpb24gKHdobywgY3NzKSB7XG4gICAgICAgICAgICBpZiAoIXdobyB8fCAhd2hvLnN0eWxlKSByZXR1cm4gJyc7XG4gICAgICAgICAgICB2YXIgc3R5ID0gY3NzLnJlcGxhY2UoL1xcLShbYS16XSkvZywgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYi50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAod2hvLmN1cnJlbnRTdHlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3aG8uc3R5bGVbc3R5XSB8fCB3aG8uY3VycmVudFN0eWxlW3N0eV0gfHwgJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZHYgPSBkb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3c7XG4gICAgICAgICAgICByZXR1cm4gd2hvLnN0eWxlW3N0eV0gfHxcbiAgICAgICAgICAgICAgICBkdi5nZXRDb21wdXRlZFN0eWxlKHdobywgXCJcIikuZ2V0UHJvcGVydHlWYWx1ZShjc3MpIHx8ICcnO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB1cmwsIEIgPSBbXSwgQSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyk7XG4gICAgICAgIEEgPSBCLnNsaWNlLmNhbGwoQSwgMCwgQS5sZW5ndGgpO1xuICAgICAgICB3aGlsZSAoQS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHVybCA9IGRvY3VtZW50LmRlZXBDc3MoQS5zaGlmdCgpLCAnYmFja2dyb3VuZC1pbWFnZScpO1xuICAgICAgICAgICAgaWYgKHVybCkgdXJsID0gL3VybFxcKFsnXCJdPyhbXlwiKV0rKS8uZXhlYyh1cmwpIHx8IFtdO1xuICAgICAgICAgICAgdXJsID0gdXJsWzFdO1xuICAgICAgICAgICAgaWYgKHVybCAmJiBCLmluZGV4T2YodXJsKSA9PSAtMSkgQltCLmxlbmd0aF0gPSB1cmw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEI7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGxvYWRJbWFnZXMoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgbG9hZGVkID0gMCxcbiAgICAgICAgICAgICAgICBpbWFnZXMgPSB0aGlzLmdldEFsbEltYWdlcygpLFxuICAgICAgICAgICAgICAgIGltYWdlc1RvdGFsID0gaW1hZ2VzLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKGltYWdlc1RvdGFsKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltYWdlc1RvdGFsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcHJlbG9hZEltYWdlKGltYWdlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcHJlbG9hZEltYWdlKHVybCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSB1cmw7XG4gICAgICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRlZCA9PT0gaW1hZ2VzVG90YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QodXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pXG5cbiAgICB9XG4gICAgXG5cbiAgICBjaGVja0Fzc2V0c0xvYWRlZCgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRJbWFnZXMoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRzIHtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRzKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLkVsZW1lbnRzID0gZWxlbWVudHM7XG4gICAgICAgIHRoaXMuRXZlbnRzID0gW107XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudHMoKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgaW5pdCgpIHtcblxuICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLkV2ZW50cztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgbGV0IHNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpdGVtLmVsZW1lbnQpO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZWxlY3Rvci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yW2pdLmFkZEV2ZW50TGlzdGVuZXIoaXRlbS5ldmVudCwgaXRlbS5mdW5jdGlvbiwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBhZGQoZWwsIGUsIGYpIHtcbiAgICAgICAgdGhpcy5FdmVudHMucHVzaCh7XG4gICAgICAgICAgICBlbGVtZW50OiBlbCxcbiAgICAgICAgICAgIGV2ZW50OiBlLFxuICAgICAgICAgICAgZnVuY3Rpb246IGZcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhZGRFdmVudHMoKSB7XG5cbiAgICAgICAgdGhpcy5hZGQoJyNjbGlja1RhZycsICdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKGNsaWNrVGFnLCAnX2JsYW5rJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkKCcjQmFubmVyJywgJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMuRWxlbWVudHMuQ1RBLCAuMiwge2Vhc2U6IFBvd2VyMy5lYXNlSW5PdXQsIHNjYWxlOiAxLjJ9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGQoJyNCYW5uZXInLCAnbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLkVsZW1lbnRzLkNUQSwgLjIsIHtlYXNlOiBQb3dlcjMuZWFzZUluT3V0LCBzY2FsZTogMX0pO1xuICAgICAgICB9KTtcblxuICAgIH1cblxufSIsImltcG9ydCBDb3JlIGZyb20gJy4vYmFubmVyL2NvcmUnO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAnLi9iYW5uZXIvY29tcG9uZW50cyc7XG5pbXBvcnQgQW5pbWF0aW9uIGZyb20gJy4vYmFubmVyL2FuaW1hdGlvbic7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9iYW5uZXIvZXZlbnRzJztcblxuY2xhc3MgQmFubmVyIGV4dGVuZHMgQ29yZSB7XG5cbiAgICBTdGFjeSAoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuTGlicy5mYWlscyA+IDEwKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMuTGlicy5sb2FkZWQgPCB0aGlzLkxpYnMuc291cmNlLmxlbmd0aCkge1xuXG4gICAgICAgICAgICBpZiAod2luZG93W3RoaXMuTGlicy5zb3VyY2VbdGhpcy5MaWJzLmxvYWRlZF1bMF1dKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLkxpYnMubG9hZGVkKys7XG4gICAgICAgICAgICAgICAgc2VsZi5TdGFjeSgpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgc3VwZXIubG9hZFNjcmlwdCh0aGlzLkxpYnMuc291cmNlW3RoaXMuTGlicy5sb2FkZWRdWzFdLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLlN0YWN5KCkpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoc3JjKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgbG9hZGluZyBzY3JpcHQ6ICcgKyBzcmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TdGFjeSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLkluaXQoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgSW5pdCgpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBiYW5uZXIgPSB7fTtcbiAgICAgICAgXG4gICAgICAgIHN1cGVyLmdldEFsbEVsZW1lbnRzQnlJZCgpO1xuXG4gICAgICAgIGJhbm5lci5jb21wb25lbnRzID0gbmV3IENvbXBvbmVudHModGhpcy5FbGVtZW50cyk7XG4gICAgICAgIGJhbm5lci5jb21wb25lbnRzLmluaXQoKTtcblxuICAgICAgICBzdXBlci5nZXRBbGxFbGVtZW50c0J5SWQoKTtcblxuICAgICAgICBiYW5uZXIuZXZlbnRzID0gbmV3IEV2ZW50KHRoaXMuRWxlbWVudHMpO1xuXG4gICAgICAgIGJhbm5lci5hbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKHRoaXMuRWxlbWVudHMsIGNvbmZpZyk7XG5cbiAgICAgICAgc3VwZXIuY2hlY2tBc3NldHNMb2FkZWQoKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgICAgICBiYW5uZXIuZXZlbnRzLmluaXQoKTtcbiAgICAgICAgICAgICAgICBiYW5uZXIuYW5pbWF0aW9uLmFuaW1hdGUoKTtcbiAgICAgICAgICAgIH0gKTtcblxuICAgICAgICBzdXBlci5nZXRBbGxUaW1lbGluZXMoYmFubmVyLmFuaW1hdGlvbi5UaW1lbGluZSk7XG5cbiAgICB9XG5cbn1cblxuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgYiA9IG5ldyBCYW5uZXI7XG4gICAgYi5TdGFjeSgpO1xufTsiXX0=
