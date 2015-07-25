###
# @class Polygon
# @require Viewport
# @require Config
# @extend Line
#
var Polygon = (function() {
    'use strict';

    var Polygon = function(options) {
        this._config = options.config
    };

    Polygon.prototype = new Line(options);

    Polygon.prototype.render = function() {
        var ctx = this._viewport.context;
        var nextPt;
        var i, len;
        
        ctx.beginPath();
        ctx.moveTo(this._points[0].x, this._points[0].y);

        for(i = 1, len = this._points.length; i < len; i += 1) {
            ctx.lineTo(this._points[0].x, this._points[0].y);
        }

        ctx.closePath();
        ctx.fill();

        for(i = 0, len = this._points.length; i < len; i += 1) {
            nextPt = this._points[i + 1];

            if (typeof nextPt === 'object' && nextPt != null) {
                this._bresenhamise(this._points[i], nextPt);
            } else {
                this._bresenhamise(this._points[i], this.points[0]);
            }
        }
    };

    return Polygon;
}());

###