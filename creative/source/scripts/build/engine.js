(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        key: 'sayHello',
        value: function sayHello() {
            console.log('hello');
        }
    }]);

    return Core;
}();

// Banner.init = function () {
//
//     console.log('engine init started');
//
//     Banner.getElementsBy('id');
//
//     Banner.Component.init();
//
//     Banner.getElementsBy('id');
//
//     Banner.loadImages(function () {
//
//         Banner.Animation.init();
//
//         Banner.Events.init();
//
//         Banner.callback();
//
//     });
//
// };


exports.default = Core;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjcmVhdGl2ZS9zb3VyY2Uvc2NyaXB0cy9lbmdpbmUvaW5pdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBcUIsSTs7Ozs7OzttQ0FDTjtBQUNQLG9CQUFRLEdBQVIsQ0FBWSxPQUFaO0FBQ0g7Ozs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O2tCQTFCcUIsSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb3JlIHtcbiAgICBzYXlIZWxsbygpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2hlbGxvJylcbiAgICB9XG59XG5cbi8vIEJhbm5lci5pbml0ID0gZnVuY3Rpb24gKCkge1xuLy9cbi8vICAgICBjb25zb2xlLmxvZygnZW5naW5lIGluaXQgc3RhcnRlZCcpO1xuLy9cbi8vICAgICBCYW5uZXIuZ2V0RWxlbWVudHNCeSgnaWQnKTtcbi8vXG4vLyAgICAgQmFubmVyLkNvbXBvbmVudC5pbml0KCk7XG4vL1xuLy8gICAgIEJhbm5lci5nZXRFbGVtZW50c0J5KCdpZCcpO1xuLy9cbi8vICAgICBCYW5uZXIubG9hZEltYWdlcyhmdW5jdGlvbiAoKSB7XG4vL1xuLy8gICAgICAgICBCYW5uZXIuQW5pbWF0aW9uLmluaXQoKTtcbi8vXG4vLyAgICAgICAgIEJhbm5lci5FdmVudHMuaW5pdCgpO1xuLy9cbi8vICAgICAgICAgQmFubmVyLmNhbGxiYWNrKCk7XG4vL1xuLy8gICAgIH0pO1xuLy9cbi8vIH07Il19
