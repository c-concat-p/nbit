// Generated by CoffeeScript 1.9.3
(function() {
  var Bitmap, Sprite,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Sprite = require('./sprite');

  Bitmap = (function(superClass) {
    extend(Bitmap, superClass);

    function Bitmap(options) {
      Bitmap.__super__.constructor.call(this, options);
      this._deps = options;
      this._bitmap = null;
      this._legend = null;
    }

    Bitmap.prototype.render = function() {
      return Bitmap.__super__.render.call(this);
    };

    return Bitmap;

  })(Sprite);

}).call(this);
