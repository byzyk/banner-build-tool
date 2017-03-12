(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = function () {
    function Animation(elements, config) {
        _classCallCheck(this, Animation);

        this.Timeline = {
            main: new TimelineMax(),
            op: new TimelineMax()
        };

        this.Elements = elements;
        this.Config = config;
    }

    _createClass(Animation, [{
        key: 'init',
        value: function init() {

            var the = this.Elements,
                timeline = this.Timeline,
                c = this.Config.animation,
                animate = this.Config.animate;

            typeof animate === 'function' ? animate(timeline, the, c) : this.animate(timeline, the, c);
        }
    }, {
        key: 'animate',
        value: function animate(timeline, the, c) {

            timeline.main.to(the.Banner, 2, { opacity: 1 }).from(the.CTA, 5, { opacity: 0 }).add('BACKUP');
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
            var _this = this;

            this.add('Comp', function (el) {

                console.log(el, _this);
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
        value: function loadScript(src, isLib, resolve, reject) {

            var self = this;

            var s = void 0,
                r = void 0;
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

            var url = void 0,
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
        value: function loadImages(resolve, reject) {

            var loaded = 0,
                images = this.getAllImages(),
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
        }
    }, {
        key: 'checkAssetsLoaded',
        value: function checkAssetsLoaded(resolve, reject) {

            this.loadImages(resolve, reject);
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

            var the = this.Elements;

            this.add('#clickTag', 'click', function () {
                window.open(clickTag, '_blank');
            });

            this.add('#Banner', 'mouseover', function () {
                TweenMax.to(the.CTA, .2, { ease: Power3.easeInOut, scale: 1.2 });
            });

            this.add('#Banner', 'mouseout', function () {
                TweenMax.to(the.CTA, .2, { ease: Power3.easeInOut, scale: 1 });
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

        return _possibleConstructorReturn(this, (Banner.__proto__ || Object.getPrototypeOf(Banner)).apply(this, arguments));
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

                    _get(Banner.prototype.__proto__ || Object.getPrototypeOf(Banner.prototype), 'loadScript', this).call(this, this.Libs.source[this.Libs.loaded][1], true, function () {
                        return _this2.Stacy();
                    }, function (src) {
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

            _get(Banner.prototype.__proto__ || Object.getPrototypeOf(Banner.prototype), 'getAllElementsById', this).call(this);

            banner.components = new _components2.default(this.Elements);
            banner.components.init();

            _get(Banner.prototype.__proto__ || Object.getPrototypeOf(Banner.prototype), 'getAllElementsById', this).call(this);

            banner.events = new _events2.default(this.Elements, config);

            banner.animation = new _animation2.default(this.Elements, config);

            _get(Banner.prototype.__proto__ || Object.getPrototypeOf(Banner.prototype), 'checkAssetsLoaded', this).call(this, function () {
                banner.events.init();
                banner.animation.init();
            });

            _get(Banner.prototype.__proto__ || Object.getPrototypeOf(Banner.prototype), 'getAllTimelines', this).call(this, banner.animation.Timeline);
        }
    }]);

    return Banner;
}(_core2.default);

window.onload = function () {
    b = new Banner();
    b.Stacy();
};

},{"./banner/animation":1,"./banner/components":2,"./banner/core":3,"./banner/events":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjcmVhdGl2ZS9zb3VyY2Uvc2NyaXB0cy9iYW5uZXIvYW5pbWF0aW9uLmpzIiwiY3JlYXRpdmUvc291cmNlL3NjcmlwdHMvYmFubmVyL2NvbXBvbmVudHMuanMiLCJjcmVhdGl2ZS9zb3VyY2Uvc2NyaXB0cy9iYW5uZXIvY29yZS5qcyIsImNyZWF0aXZlL3NvdXJjZS9zY3JpcHRzL2Jhbm5lci9ldmVudHMuanMiLCJjcmVhdGl2ZS9zb3VyY2Uvc2NyaXB0cy9pbml0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FxQixTO0FBRWpCLHVCQUFZLFFBQVosRUFBc0IsTUFBdEIsRUFBOEI7QUFBQTs7QUFFMUIsYUFBSyxRQUFMLEdBQWdCO0FBQ1osa0JBQU0sSUFBSSxXQUFKLEVBRE07QUFFWixnQkFBSSxJQUFJLFdBQUo7QUFGUSxTQUFoQjs7QUFLQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBRUg7Ozs7K0JBRU07O0FBRUgsZ0JBQUksTUFBTSxLQUFLLFFBQWY7QUFBQSxnQkFDSSxXQUFXLEtBQUssUUFEcEI7QUFBQSxnQkFFSSxJQUFJLEtBQUssTUFBTCxDQUFZLFNBRnBCO0FBQUEsZ0JBR0ksVUFBVSxLQUFLLE1BQUwsQ0FBWSxPQUgxQjs7QUFLQyxtQkFBTyxPQUFQLEtBQW1CLFVBQXBCLEdBQWtDLFFBQVEsUUFBUixFQUFrQixHQUFsQixFQUF1QixDQUF2QixDQUFsQyxHQUE4RCxLQUFLLE9BQUwsQ0FBYSxRQUFiLEVBQXVCLEdBQXZCLEVBQTRCLENBQTVCLENBQTlEO0FBRUg7OztnQ0FFTyxRLEVBQVUsRyxFQUFLLEMsRUFBRzs7QUFFdEIscUJBQVMsSUFBVCxDQUNLLEVBREwsQ0FDUSxJQUFJLE1BRFosRUFDb0IsQ0FEcEIsRUFDdUIsRUFBQyxTQUFTLENBQVYsRUFEdkIsRUFFSyxJQUZMLENBRVUsSUFBSSxHQUZkLEVBRW1CLENBRm5CLEVBRXNCLEVBQUMsU0FBUyxDQUFWLEVBRnRCLEVBR0ssR0FITCxDQUdTLFFBSFQ7QUFNSDs7Ozs7O2tCQWpDZ0IsUzs7Ozs7Ozs7Ozs7OztJQ0FBLFU7QUFFakIsd0JBQVksUUFBWixFQUFzQjtBQUFBOztBQUVsQixhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsRUFBbEI7O0FBRUEsYUFBSyxhQUFMO0FBRUg7Ozs7K0JBRU07O0FBRUgsZ0JBQUksSUFBSSxLQUFLLFVBQWI7QUFBQSxnQkFDSSxXQUFXLGdCQURmO0FBQUEsZ0JBRUksUUFBUSxTQUFTLGdCQUFULENBQTBCLE1BQU0sUUFBTixHQUFpQixHQUEzQyxDQUZaO0FBQUEsZ0JBR0ksYUFBYSxFQUhqQjtBQUFBLGdCQUlJLFdBSko7O0FBTUEsaUJBQUssSUFBSSxHQUFULElBQWdCLENBQWhCLEVBQW1CO0FBQ2Ysb0JBQUksRUFBRSxjQUFGLENBQWlCLEdBQWpCLENBQUosRUFBMkIsV0FBVyxJQUFYLENBQWdCLEdBQWhCO0FBQzlCOztBQUVELGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBTSxNQUExQixFQUFrQyxHQUFsQyxFQUF1QztBQUNuQyxxQkFBSyxNQUFNLENBQU4sQ0FBTDtBQUNBLHFCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksV0FBVyxNQUEvQixFQUF1QyxHQUF2QyxFQUE0QztBQUN4Qyx3QkFBSSxHQUFHLFlBQUgsQ0FBZ0IsUUFBaEIsTUFBOEIsV0FBVyxDQUFYLENBQWxDLEVBQWlELEVBQUUsV0FBVyxDQUFYLENBQUYsRUFBaUIsRUFBakI7QUFDcEQ7QUFDSjtBQUVKOzs7NEJBRUcsQyxFQUFHLEMsRUFBRztBQUNOLGlCQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsSUFBcUIsQ0FBckI7QUFDSDs7O3dDQUVlO0FBQUE7O0FBRVosaUJBQUssR0FBTCxDQUFTLE1BQVQsRUFBaUIsY0FBTTs7QUFFbkIsd0JBQVEsR0FBUixDQUFZLEVBQVo7QUFFSCxhQUpEO0FBTUg7Ozs7OztrQkE1Q2dCLFU7Ozs7Ozs7Ozs7Ozs7SUNBQSxJO0FBRWpCLG9CQUFjO0FBQUE7O0FBRVYsYUFBSyxJQUFMLEdBQVksRUFBWjtBQUNBLGFBQUssSUFBTCxDQUFVLE1BQVYsR0FBbUIsQ0FBbkI7QUFDQSxhQUFLLElBQUwsQ0FBVSxLQUFWLEdBQWtCLENBQWxCO0FBQ0EsYUFBSyxJQUFMLENBQVUsTUFBVixHQUFtQixDQUNmLENBQUMsVUFBRCxFQUFhLDhGQUFiLENBRGUsQ0FBbkI7O0FBSUEsYUFBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLEVBQWpCO0FBRUg7Ozs7NkNBRW9COztBQUVqQixnQkFBSSxLQUFLLFFBQUwsQ0FBYyxNQUFsQixFQUEwQixLQUFLLFFBQUwsR0FBZ0IsRUFBaEI7O0FBRTFCLGdCQUFJLFFBQVEsU0FBUyxnQkFBVCxDQUEwQixXQUExQixDQUFaOztBQUVBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBTSxNQUExQixFQUFrQyxHQUFsQyxFQUF1QztBQUNuQyxxQkFBSyxRQUFMLENBQWMsTUFBTSxDQUFOLEVBQVMsWUFBVCxDQUFzQixJQUF0QixDQUFkLElBQTZDLE1BQU0sQ0FBTixDQUE3QztBQUNIOztBQUVELG1CQUFPLEtBQUssUUFBWjtBQUVIOzs7d0NBRWUsUyxFQUFXOztBQUV2QixnQkFBSSxJQUFJLEVBQVI7QUFDQSxpQkFBSyxJQUFJLFFBQVQsSUFBcUIsU0FBckIsRUFBZ0M7QUFDNUIsb0JBQUksVUFBVSxjQUFWLENBQXlCLFFBQXpCLENBQUosRUFBd0MsRUFBRSxJQUFGLENBQU8sVUFBVSxRQUFWLENBQVA7QUFDM0M7QUFDRCxpQkFBSyxTQUFMLEdBQWlCLENBQWpCO0FBRUg7OzttQ0FHVSxHLEVBQUssSyxFQUFPLE8sRUFBUyxNLEVBQVE7O0FBRXBDLGdCQUFJLE9BQU8sSUFBWDs7QUFFQSxnQkFBSSxVQUFKO0FBQUEsZ0JBQ0ksVUFESjtBQUVBLGdCQUFJLEtBQUo7QUFDQSxnQkFBSSxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBSjtBQUNBLGNBQUUsR0FBRixHQUFRLEdBQVI7QUFDQSxjQUFFLEtBQUYsR0FBVSxPQUFWO0FBQ0EsY0FBRSxNQUFGLEdBQVcsRUFBRSxrQkFBRixHQUF1QixZQUFXO0FBQ3pDLG9CQUFLLENBQUMsQ0FBRCxLQUFPLENBQUMsS0FBSyxVQUFOLElBQW9CLEtBQUssVUFBTCxJQUFtQixVQUE5QyxDQUFMLEVBQWlFO0FBQzdELHdCQUFJLElBQUo7QUFDQSx3QkFBRyxLQUFILEVBQVUsS0FBSyxJQUFMLENBQVUsTUFBVjtBQUNWO0FBQ0g7QUFDSixhQU5EO0FBT0EsY0FBRSxPQUFGLEdBQVksWUFBVztBQUNuQixvQkFBRyxLQUFILEVBQVUsS0FBSyxJQUFMLENBQVUsS0FBVjtBQUNWLHVCQUFPLEdBQVA7QUFDSCxhQUhEO0FBSUEscUJBQVMsb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsRUFBeUMsV0FBekMsQ0FBcUQsQ0FBckQ7QUFHSDs7O3VDQUdjOztBQUVYLHFCQUFTLE9BQVQsR0FBbUIsVUFBVSxHQUFWLEVBQWUsR0FBZixFQUFvQjtBQUNuQyxvQkFBSSxDQUFDLEdBQUQsSUFBUSxDQUFDLElBQUksS0FBakIsRUFBd0IsT0FBTyxFQUFQO0FBQ3hCLG9CQUFJLE1BQU0sSUFBSSxPQUFKLENBQVksWUFBWixFQUEwQixVQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCO0FBQ2hELDJCQUFPLEVBQUUsV0FBRixFQUFQO0FBQ0gsaUJBRlMsQ0FBVjtBQUdBLG9CQUFJLElBQUksWUFBUixFQUFzQjtBQUNsQiwyQkFBTyxJQUFJLEtBQUosQ0FBVSxHQUFWLEtBQWtCLElBQUksWUFBSixDQUFpQixHQUFqQixDQUFsQixJQUEyQyxFQUFsRDtBQUNIO0FBQ0Qsb0JBQUksS0FBSyxTQUFTLFdBQVQsSUFBd0IsTUFBakM7QUFDQSx1QkFBTyxJQUFJLEtBQUosQ0FBVSxHQUFWLEtBQ0gsR0FBRyxnQkFBSCxDQUFvQixHQUFwQixFQUF5QixFQUF6QixFQUE2QixnQkFBN0IsQ0FBOEMsR0FBOUMsQ0FERyxJQUNtRCxFQUQxRDtBQUVILGFBWEQ7O0FBYUEsZ0JBQUksWUFBSjtBQUFBLGdCQUFTLElBQUksRUFBYjtBQUFBLGdCQUFpQixJQUFJLFNBQVMsb0JBQVQsQ0FBOEIsR0FBOUIsQ0FBckI7QUFDQSxnQkFBSSxFQUFFLEtBQUYsQ0FBUSxJQUFSLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixFQUFFLE1BQXJCLENBQUo7QUFDQSxtQkFBTyxFQUFFLE1BQVQsRUFBaUI7QUFDYixzQkFBTSxTQUFTLE9BQVQsQ0FBaUIsRUFBRSxLQUFGLEVBQWpCLEVBQTRCLGtCQUE1QixDQUFOO0FBQ0Esb0JBQUksR0FBSixFQUFTLE1BQU0scUJBQXFCLElBQXJCLENBQTBCLEdBQTFCLEtBQWtDLEVBQXhDO0FBQ1Qsc0JBQU0sSUFBSSxDQUFKLENBQU47QUFDQSxvQkFBSSxPQUFPLEVBQUUsT0FBRixDQUFVLEdBQVYsS0FBa0IsQ0FBQyxDQUE5QixFQUFpQyxFQUFFLEVBQUUsTUFBSixJQUFjLEdBQWQ7QUFDcEM7QUFDRCxtQkFBTyxDQUFQO0FBRUg7OzttQ0FFVSxPLEVBQVMsTSxFQUFROztBQUV4QixnQkFBSSxTQUFTLENBQWI7QUFBQSxnQkFDSSxTQUFTLEtBQUssWUFBTCxFQURiO0FBQUEsZ0JBRUksY0FBYyxPQUFPLE1BRnpCOztBQUlBLGdCQUFJLFdBQUosRUFBaUI7QUFBQSxvQkFNSixhQU5JLEdBTWIsU0FBUyxhQUFULENBQXNCLEdBQXRCLEVBQTJCO0FBQ3ZCLHdCQUFJLE1BQU0sSUFBSSxLQUFKLEVBQVY7QUFDQSx3QkFBSSxHQUFKLEdBQVUsR0FBVjtBQUNBLHdCQUFJLE1BQUosR0FBYSxZQUFZOztBQUVyQjtBQUNBLDRCQUFJLFdBQVcsV0FBZixFQUE0QjtBQUN4QjtBQUNIO0FBRUoscUJBUEQ7QUFRQSx3QkFBSSxPQUFKLEdBQWMsWUFBWTtBQUN0QiwrQkFBTyxHQUFQO0FBQ0gscUJBRkQ7QUFHSCxpQkFwQlk7O0FBRWIscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxXQUFwQixFQUFpQyxHQUFqQyxFQUFzQztBQUNsQyxrQ0FBYSxPQUFPLENBQVAsQ0FBYjtBQUNIO0FBa0JKLGFBdEJELE1Bc0JPOztBQUVIO0FBRUg7QUFFSjs7OzBDQUdpQixPLEVBQVMsTSxFQUFROztBQUUvQixpQkFBSyxVQUFMLENBQWdCLE9BQWhCLEVBQXlCLE1BQXpCO0FBRUg7Ozs7OztrQkF4SWdCLEk7Ozs7Ozs7Ozs7Ozs7SUNBQSxNO0FBRWpCLG9CQUFZLFFBQVosRUFBc0I7QUFBQTs7QUFFbEIsYUFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsRUFBZDs7QUFFQSxhQUFLLFNBQUw7QUFFSDs7OzsrQkFFTTs7QUFFSCxnQkFBSSxRQUFRLEtBQUssTUFBakI7O0FBRUEsaUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLE1BQTFCLEVBQWtDLEdBQWxDLEVBQXVDO0FBQ25DLG9CQUFJLE9BQU8sTUFBTSxDQUFOLENBQVg7QUFDQSxvQkFBSSxXQUFXLFNBQVMsZ0JBQVQsQ0FBMEIsS0FBSyxPQUEvQixDQUFmO0FBQ0EscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxTQUFTLE1BQTdCLEVBQXFDLEdBQXJDLEVBQTBDO0FBQ3RDLDZCQUFTLENBQVQsRUFBWSxnQkFBWixDQUE2QixLQUFLLEtBQWxDLEVBQXlDLEtBQUssUUFBOUMsRUFBd0QsS0FBeEQ7QUFDSDtBQUNKO0FBRUo7Ozs0QkFFRyxFLEVBQUksQyxFQUFHLEMsRUFBRztBQUNWLGlCQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCO0FBQ2IseUJBQVMsRUFESTtBQUViLHVCQUFPLENBRk07QUFHYiwwQkFBVTtBQUhHLGFBQWpCO0FBS0g7OztvQ0FFVzs7QUFFUixnQkFBSSxNQUFNLEtBQUssUUFBZjs7QUFFQSxpQkFBSyxHQUFMLENBQVMsV0FBVCxFQUFzQixPQUF0QixFQUErQixZQUFNO0FBQ2pDLHVCQUFPLElBQVAsQ0FBWSxRQUFaLEVBQXNCLFFBQXRCO0FBQ0gsYUFGRDs7QUFJQSxpQkFBSyxHQUFMLENBQVMsU0FBVCxFQUFvQixXQUFwQixFQUFpQyxZQUFNO0FBQ25DLHlCQUFTLEVBQVQsQ0FBWSxJQUFJLEdBQWhCLEVBQXFCLEVBQXJCLEVBQXlCLEVBQUMsTUFBTSxPQUFPLFNBQWQsRUFBeUIsT0FBTyxHQUFoQyxFQUF6QjtBQUNILGFBRkQ7O0FBSUEsaUJBQUssR0FBTCxDQUFTLFNBQVQsRUFBb0IsVUFBcEIsRUFBZ0MsWUFBTTtBQUNsQyx5QkFBUyxFQUFULENBQVksSUFBSSxHQUFoQixFQUFxQixFQUFyQixFQUF5QixFQUFDLE1BQU0sT0FBTyxTQUFkLEVBQXlCLE9BQU8sQ0FBaEMsRUFBekI7QUFDSCxhQUZEO0FBSUg7Ozs7OztrQkFqRGdCLE07Ozs7Ozs7OztBQ0FyQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU0sTTs7Ozs7Ozs7Ozs7Z0NBRU87QUFBQTs7QUFFTCxnQkFBSSxLQUFLLElBQUwsQ0FBVSxLQUFWLEdBQWtCLEVBQXRCLEVBQTBCOztBQUUxQixnQkFBSSxLQUFLLElBQUwsQ0FBVSxNQUFWLEdBQW1CLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsTUFBeEMsRUFBZ0Q7O0FBRTVDLG9CQUFJLE9BQU8sS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixLQUFLLElBQUwsQ0FBVSxNQUEzQixFQUFtQyxDQUFuQyxDQUFQLENBQUosRUFBbUQ7O0FBRS9DLHlCQUFLLElBQUwsQ0FBVSxNQUFWO0FBQ0EseUJBQUssS0FBTDtBQUVILGlCQUxELE1BS087O0FBRUgsK0hBQ0ksS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixLQUFLLElBQUwsQ0FBVSxNQUEzQixFQUFtQyxDQUFuQyxDQURKLEVBRUksSUFGSixFQUdJO0FBQUEsK0JBQU0sT0FBSyxLQUFMLEVBQU47QUFBQSxxQkFISixFQUlJLFVBQUMsR0FBRCxFQUFTO0FBQ0wsZ0NBQVEsR0FBUixDQUFZLDJCQUEyQixHQUF2QztBQUNBLCtCQUFLLEtBQUw7QUFDSCxxQkFQTDtBQVVIO0FBRUosYUFyQkQsTUFxQk87QUFDSCxxQkFBSyxJQUFMO0FBQ0g7QUFFSjs7OytCQUdNOztBQUVILGdCQUFJLFNBQVMsRUFBYjs7QUFFQTs7QUFFQSxtQkFBTyxVQUFQLEdBQW9CLHlCQUFlLEtBQUssUUFBcEIsQ0FBcEI7QUFDQSxtQkFBTyxVQUFQLENBQWtCLElBQWxCOztBQUVBOztBQUVBLG1CQUFPLE1BQVAsR0FBZ0IscUJBQVUsS0FBSyxRQUFmLEVBQXlCLE1BQXpCLENBQWhCOztBQUVBLG1CQUFPLFNBQVAsR0FBbUIsd0JBQWMsS0FBSyxRQUFuQixFQUE2QixNQUE3QixDQUFuQjs7QUFFQSw4SEFDSSxZQUFNO0FBQ0YsdUJBQU8sTUFBUCxDQUFjLElBQWQ7QUFDQSx1QkFBTyxTQUFQLENBQWlCLElBQWpCO0FBQ0gsYUFKTDs7QUFPQSw0SEFBc0IsT0FBTyxTQUFQLENBQWlCLFFBQXZDO0FBRUg7Ozs7OztBQUtMLE9BQU8sTUFBUCxHQUFnQixZQUFXO0FBQ3ZCLFFBQUksSUFBSSxNQUFKLEVBQUo7QUFDQSxNQUFFLEtBQUY7QUFDSCxDQUhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuaW1hdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50cywgY29uZmlnKSB7XG5cbiAgICAgICAgdGhpcy5UaW1lbGluZSA9IHtcbiAgICAgICAgICAgIG1haW46IG5ldyBUaW1lbGluZU1heCgpLFxuICAgICAgICAgICAgb3A6IG5ldyBUaW1lbGluZU1heCgpXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5FbGVtZW50cyA9IGVsZW1lbnRzO1xuICAgICAgICB0aGlzLkNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGluaXQoKSB7XG5cbiAgICAgICAgbGV0IHRoZSA9IHRoaXMuRWxlbWVudHMsXG4gICAgICAgICAgICB0aW1lbGluZSA9IHRoaXMuVGltZWxpbmUsXG4gICAgICAgICAgICBjID0gdGhpcy5Db25maWcuYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0ZSA9IHRoaXMuQ29uZmlnLmFuaW1hdGU7XG5cbiAgICAgICAgKHR5cGVvZiBhbmltYXRlID09PSAnZnVuY3Rpb24nKSA/IGFuaW1hdGUodGltZWxpbmUsIHRoZSwgYykgOiB0aGlzLmFuaW1hdGUodGltZWxpbmUsIHRoZSwgYyk7XG5cbiAgICB9XG5cbiAgICBhbmltYXRlKHRpbWVsaW5lLCB0aGUsIGMpIHtcblxuICAgICAgICB0aW1lbGluZS5tYWluXG4gICAgICAgICAgICAudG8odGhlLkJhbm5lciwgMiwge29wYWNpdHk6IDF9KVxuICAgICAgICAgICAgLmZyb20odGhlLkNUQSwgNSwge29wYWNpdHk6IDB9KVxuICAgICAgICAgICAgLmFkZCgnQkFDS1VQJylcbiAgICAgICAgO1xuXG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50cyB7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50cykge1xuXG4gICAgICAgIHRoaXMuRWxlbWVudHMgPSBlbGVtZW50cztcbiAgICAgICAgdGhpcy5Db21wb25lbnRzID0ge307XG5cbiAgICAgICAgdGhpcy5hZGRDb21wb25lbnRzKCk7XG5cbiAgICB9XG5cbiAgICBpbml0KCkge1xuXG4gICAgICAgIGxldCBDID0gdGhpcy5Db21wb25lbnRzLFxuICAgICAgICAgICAgc2VsZWN0b3IgPSAnZGF0YS1jb21wb25lbnQnLFxuICAgICAgICAgICAgbm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbJyArIHNlbGVjdG9yICsgJ10nKSxcbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSBbXSxcbiAgICAgICAgICAgIGVsO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBDKSB7XG4gICAgICAgICAgICBpZiAoQy5oYXNPd25Qcm9wZXJ0eShrZXkpKSBjb21wb25lbnRzLnB1c2goa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGVsID0gbm9kZXNbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbXBvbmVudHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKHNlbGVjdG9yKSA9PT0gY29tcG9uZW50c1tqXSkgQ1tjb21wb25lbnRzW2pdXShlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGFkZChuLCBmKSB7XG4gICAgICAgIHRoaXMuQ29tcG9uZW50c1tuXSA9IGY7XG4gICAgfVxuXG4gICAgYWRkQ29tcG9uZW50cygpIHtcblxuICAgICAgICB0aGlzLmFkZCgnQ29tcCcsIGVsID0+IHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coZWwsIHRoaXMpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29yZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLkxpYnMgPSB7fTtcbiAgICAgICAgdGhpcy5MaWJzLmxvYWRlZCA9IDA7XG4gICAgICAgIHRoaXMuTGlicy5mYWlscyA9IDA7XG4gICAgICAgIHRoaXMuTGlicy5zb3VyY2UgPSBbXG4gICAgICAgICAgICBbJ1R3ZWVuTWF4JywgJy8vczAuMm1kbi5uZXQvYWRzL3N0dWRpby9jYWNoZWRfbGlicy90d2Vlbm1heF8xLjE4LjBfNDk5YmE2NGEyMzM3ODU0NTc0OGZmMTJkMzcyZTU5ZTlfbWluLmpzJ11cbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLkVsZW1lbnRzID0ge307XG4gICAgICAgIHRoaXMuVGltZWxpbmVzID0gW107XG4gICAgICAgIFxuICAgIH1cblxuICAgIGdldEFsbEVsZW1lbnRzQnlJZCgpIHtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLkVsZW1lbnRzLmxlbmd0aCkgdGhpcy5FbGVtZW50cyA9IHt9O1xuICAgICAgICBcbiAgICAgICAgbGV0IG5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYm9keSBbaWRdJyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5FbGVtZW50c1tub2Rlc1tpXS5nZXRBdHRyaWJ1dGUoJ2lkJyldID0gbm9kZXNbaV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5FbGVtZW50cztcblxuICAgIH1cblxuICAgIGdldEFsbFRpbWVsaW5lcyh0aW1lbGluZXMpIHtcblxuICAgICAgICBsZXQgdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCB0aW1lbGluZSBpbiB0aW1lbGluZXMpIHtcbiAgICAgICAgICAgIGlmICh0aW1lbGluZXMuaGFzT3duUHJvcGVydHkodGltZWxpbmUpKSB0LnB1c2godGltZWxpbmVzW3RpbWVsaW5lXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5UaW1lbGluZXMgPSB0O1xuXG4gICAgfVxuXG5cbiAgICBsb2FkU2NyaXB0KHNyYywgaXNMaWIsIHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICBsZXQgcyxcbiAgICAgICAgICAgIHI7XG4gICAgICAgIHIgPSBmYWxzZTtcbiAgICAgICAgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzLnNyYyA9IHNyYztcbiAgICAgICAgcy5hc3luYyA9ICdhc3luYyc7XG4gICAgICAgIHMub25sb2FkID0gcy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICggIXIgJiYgKCF0aGlzLnJlYWR5U3RhdGUgfHwgdGhpcy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpICkge1xuICAgICAgICAgICAgICAgIHIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmKGlzTGliKSBzZWxmLkxpYnMubG9hZGVkKys7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKGlzTGliKSBzZWxmLkxpYnMuZmFpbHMrKztcbiAgICAgICAgICAgIHJlamVjdChzcmMpO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHMpO1xuXG5cbiAgICB9XG5cblxuICAgIGdldEFsbEltYWdlcygpIHtcblxuICAgICAgICBkb2N1bWVudC5kZWVwQ3NzID0gZnVuY3Rpb24gKHdobywgY3NzKSB7XG4gICAgICAgICAgICBpZiAoIXdobyB8fCAhd2hvLnN0eWxlKSByZXR1cm4gJyc7XG4gICAgICAgICAgICBsZXQgc3R5ID0gY3NzLnJlcGxhY2UoL1xcLShbYS16XSkvZywgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYi50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAod2hvLmN1cnJlbnRTdHlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3aG8uc3R5bGVbc3R5XSB8fCB3aG8uY3VycmVudFN0eWxlW3N0eV0gfHwgJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZHYgPSBkb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3c7XG4gICAgICAgICAgICByZXR1cm4gd2hvLnN0eWxlW3N0eV0gfHxcbiAgICAgICAgICAgICAgICBkdi5nZXRDb21wdXRlZFN0eWxlKHdobywgXCJcIikuZ2V0UHJvcGVydHlWYWx1ZShjc3MpIHx8ICcnO1xuICAgICAgICB9O1xuXG4gICAgICAgIGxldCB1cmwsIEIgPSBbXSwgQSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyk7XG4gICAgICAgIEEgPSBCLnNsaWNlLmNhbGwoQSwgMCwgQS5sZW5ndGgpO1xuICAgICAgICB3aGlsZSAoQS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHVybCA9IGRvY3VtZW50LmRlZXBDc3MoQS5zaGlmdCgpLCAnYmFja2dyb3VuZC1pbWFnZScpO1xuICAgICAgICAgICAgaWYgKHVybCkgdXJsID0gL3VybFxcKFsnXCJdPyhbXlwiKV0rKS8uZXhlYyh1cmwpIHx8IFtdO1xuICAgICAgICAgICAgdXJsID0gdXJsWzFdO1xuICAgICAgICAgICAgaWYgKHVybCAmJiBCLmluZGV4T2YodXJsKSA9PSAtMSkgQltCLmxlbmd0aF0gPSB1cmw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEI7XG5cbiAgICB9XG5cbiAgICBsb2FkSW1hZ2VzKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIGxldCBsb2FkZWQgPSAwLFxuICAgICAgICAgICAgaW1hZ2VzID0gdGhpcy5nZXRBbGxJbWFnZXMoKSxcbiAgICAgICAgICAgIGltYWdlc1RvdGFsID0gaW1hZ2VzLmxlbmd0aDtcblxuICAgICAgICBpZiAoaW1hZ2VzVG90YWwpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXNUb3RhbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcHJlbG9hZEltYWdlKGltYWdlc1tpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHByZWxvYWRJbWFnZSh1cmwpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9IHVybDtcbiAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGxvYWRlZCsrO1xuICAgICAgICAgICAgICAgICAgICBpZiAobG9hZGVkID09PSBpbWFnZXNUb3RhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QodXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcblxuICAgIGNoZWNrQXNzZXRzTG9hZGVkKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2VzKHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudHMge1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudHMpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuRWxlbWVudHMgPSBlbGVtZW50cztcbiAgICAgICAgdGhpcy5FdmVudHMgPSBbXTtcblxuICAgICAgICB0aGlzLmFkZEV2ZW50cygpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBpbml0KCkge1xuXG4gICAgICAgIGxldCBpdGVtcyA9IHRoaXMuRXZlbnRzO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgICAgICBsZXQgc2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW0uZWxlbWVudCk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNlbGVjdG9yLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3Jbal0uYWRkRXZlbnRMaXN0ZW5lcihpdGVtLmV2ZW50LCBpdGVtLmZ1bmN0aW9uLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGFkZChlbCwgZSwgZikge1xuICAgICAgICB0aGlzLkV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsLFxuICAgICAgICAgICAgZXZlbnQ6IGUsXG4gICAgICAgICAgICBmdW5jdGlvbjogZlxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFkZEV2ZW50cygpIHtcblxuICAgICAgICBsZXQgdGhlID0gdGhpcy5FbGVtZW50cztcblxuICAgICAgICB0aGlzLmFkZCgnI2NsaWNrVGFnJywgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93Lm9wZW4oY2xpY2tUYWcsICdfYmxhbmsnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGQoJyNCYW5uZXInLCAnbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgVHdlZW5NYXgudG8odGhlLkNUQSwgLjIsIHtlYXNlOiBQb3dlcjMuZWFzZUluT3V0LCBzY2FsZTogMS4yfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkKCcjQmFubmVyJywgJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICAgICAgVHdlZW5NYXgudG8odGhlLkNUQSwgLjIsIHtlYXNlOiBQb3dlcjMuZWFzZUluT3V0LCBzY2FsZTogMX0pO1xuICAgICAgICB9KTtcblxuICAgIH1cblxufSIsImltcG9ydCBDb3JlIGZyb20gJy4vYmFubmVyL2NvcmUnO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAnLi9iYW5uZXIvY29tcG9uZW50cyc7XG5pbXBvcnQgQW5pbWF0aW9uIGZyb20gJy4vYmFubmVyL2FuaW1hdGlvbic7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9iYW5uZXIvZXZlbnRzJztcblxuY2xhc3MgQmFubmVyIGV4dGVuZHMgQ29yZSB7XG5cbiAgICBTdGFjeSAoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuTGlicy5mYWlscyA+IDEwKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMuTGlicy5sb2FkZWQgPCB0aGlzLkxpYnMuc291cmNlLmxlbmd0aCkge1xuXG4gICAgICAgICAgICBpZiAod2luZG93W3RoaXMuTGlicy5zb3VyY2VbdGhpcy5MaWJzLmxvYWRlZF1bMF1dKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLkxpYnMubG9hZGVkKys7XG4gICAgICAgICAgICAgICAgc2VsZi5TdGFjeSgpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgc3VwZXIubG9hZFNjcmlwdChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5MaWJzLnNvdXJjZVt0aGlzLkxpYnMubG9hZGVkXVsxXSxcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5TdGFjeSgpLFxuICAgICAgICAgICAgICAgICAgICAoc3JjKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgbG9hZGluZyBzY3JpcHQ6ICcgKyBzcmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TdGFjeSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLkluaXQoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBJbml0KCkge1xuICAgICAgICBcbiAgICAgICAgbGV0IGJhbm5lciA9IHt9O1xuICAgICAgICBcbiAgICAgICAgc3VwZXIuZ2V0QWxsRWxlbWVudHNCeUlkKCk7XG5cbiAgICAgICAgYmFubmVyLmNvbXBvbmVudHMgPSBuZXcgQ29tcG9uZW50cyh0aGlzLkVsZW1lbnRzKTtcbiAgICAgICAgYmFubmVyLmNvbXBvbmVudHMuaW5pdCgpO1xuXG4gICAgICAgIHN1cGVyLmdldEFsbEVsZW1lbnRzQnlJZCgpO1xuXG4gICAgICAgIGJhbm5lci5ldmVudHMgPSBuZXcgRXZlbnQodGhpcy5FbGVtZW50cywgY29uZmlnKTtcblxuICAgICAgICBiYW5uZXIuYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbih0aGlzLkVsZW1lbnRzLCBjb25maWcpO1xuXG4gICAgICAgIHN1cGVyLmNoZWNrQXNzZXRzTG9hZGVkKFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGJhbm5lci5ldmVudHMuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJhbm5lci5hbmltYXRpb24uaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHN1cGVyLmdldEFsbFRpbWVsaW5lcyhiYW5uZXIuYW5pbWF0aW9uLlRpbWVsaW5lKTtcblxuICAgIH1cblxufVxuXG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBiID0gbmV3IEJhbm5lcjtcbiAgICBiLlN0YWN5KCk7XG59OyJdfQ==
