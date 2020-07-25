/* ascii-canvas - string based text rendering for Node and Browser
 * inspired by Python module with same name
 *
 * Copyright (C) 2020 Jakub T. Jankiewicz <https://jcubic.pl>
 * Relased under MIT license
 */

import { auto } from './constants';

class Item {
    constructor(text, {x = 0, y = 0, z = auto} = {}) {
        this._text = text;
        this._x = x;
        this._y = y;
        this._z = z;
    }
    clone() {
        return new Item(text, { x: this._x, y: this._y, z: this._z });
    }
    update(text) {
        this._text = text;
        return this;
    }
    move({x = auto, y = auto, z = auto} = {}) {
        if (x !== auto) {
            this._x = x;
        }
        if (y !== auto) {
            this._y = y;
        }
        if (z !== auto) {
            this._z = z;
        }
        return this;
    }
    set canvas(c) {
        if (this._canvas) {
            this._canvas.remove_child(this);
        }
        this._canvas = c;
    }
    get canvas() {
        return this._canvas;
    }
    get text() {
        return this._text;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get z() {
        return this._z;
    }
}

export default Item;
