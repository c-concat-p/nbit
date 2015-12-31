import MaintainMax from './lib/MaintainMax';
import Sprite from './Sprite';

/**
 * @class       Canvas
 * @description Creates and renders to the canvas DOM element
 * @extends     GetSet
 * @required    MaintainMax
 * @author      Chris Peters
 */
export default class Canvas {
    /**
     * @param {object} deps
     * @param {object} deps.config
     * @param {object} [deps.document]
     * @param {object} [deps.window]
     */
    constructor(deps) {
        this._config = deps.config;
        this._document = deps.document || document;
        this._window = deps.window || window;

        this._canvas = this._document.createElement('canvas');
        this._context = this._canvas.getContext('2d');

        this._canvas.width = this._config.viewportWidth * this._config.ppp;
        this._canvas.height = this._config.viewportHeight * this._config.ppp;
        this._canvas.style.position = 'absolute';
        this._canvas.style.backgroundColor = this._config.canvasBgColor;

        this._config.parentEl.style.backgroundColor = this._config.parentElBgColor;
        this._config.parentEl.appendChild(this._canvas);

        this._window.addEventListener('resize', this._handleResize.bind(this));

        this._handleResize();
    }

    /**
     * adjust canvas MaintainMax to fit canvas to resized window
     */
    _handleResize() {
        let config = this._config;
        let { top, left, width, height } = MaintainMax.fit(
            config.viewportWidth * config.ppp,
            config.viewportHeight * config.ppp
        );

        this._canvas.style.top = `${Math.round(top)}px`;
        this._canvas.style.left = `${Math.round(left)}px`;
        this._canvas.style.width = `${Math.round(width)}px`;
        this._canvas.style.height = `${Math.round(height)}px`;
    }

    /**
     * render Picls to the canvas
     *
     * @private
     * @param  {Integer} x     [description]
     * @param  {Integer} y     [description]
     * @param  {String}  color [description]
     */
    _renderPicl(x, y, color) {
        let size = this._config.ppp;

        this._context.fillStyle = color;
        this._context.fillRect(x * size, y * size, size, size);
        this._context.restore();
    }

    /**
     * adjust the canvas based on the Sprite's attrs
     */
    _setSpriteContext(sprite) {
        let size = this._config.ppp;

        this._context.translate(sprite.getX() * size, sprite.getY() * size);

        this._context.scale(sprite.getScaleX(), sprite.getScaleY());

        this._context.rotate(sprite.getRotation());

        if (sprite.getOpacity() !== 1) {
            this._context.globalAlpha = sprite.getOpacity();
        }

        if (sprite.getComposite() !== Sprite.getCompositeDefault()) {
            this._context.globalCompositeOperation = sprite.getComposite();
        }
    }

    /**
     * collects object's Picls and renders them to canvas
     *
     * @param {Object} object Any nbit object
     */
    render(object) {
        let picls = object.render();

        this._context.save();

        if (object instanceof Sprite) {
            this._setSpriteContext(object);
        }

        for (let picl of picls) {
            this._renderPicl(picl.x, picl.y, picl.color);
        }
    }
}
