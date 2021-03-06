'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Canvas = require('./Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Bresenham = require('../lib/Bresenham');

var _Bresenham2 = _interopRequireDefault(_Bresenham);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       draw.Line
 * @description Plots Blocks between (and at) two Points
 * @requires    Canvas
 * @requires    Bresenham
 * @author      Chris Peters
 */

var Line = (function () {
    /**
     * @param {String} [color] Initial color
     */

    function Line(color) {
        _classCallCheck(this, Line);

        this._points = [];
        this._strokeColor = color || '#000';
    }

    /**
     * The wrapper method to pass to Bresenham.plotLine
     *
     * @private
     * @param  {[type]} x [description]
     * @param  {[type]} y [description]
     */

    _createClass(Line, [{
        key: '_plot',
        value: function _plot(x, y) {
            _Canvas2.default.renderPicl(x, y, this._strokeColor);
        }

        /**
         * Set the line's points
         *
         *
         */

    }, {
        key: 'setPoints',
        value: function setPoints() {
            this._points = [ptA, ptB];

            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            if (this._points[0] && this._points[1]) {
                _Bresenham2.default.plotLine(this._points[0], this._points[1], this._plot.bind(this));
            } else {
                throw new Error('Line must have at least two points');
            }
        }
    }]);

    return Line;
})();

exports.default = Line;