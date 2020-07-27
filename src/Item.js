/* ascii-canvas - string based text rendering for Node and Browser
 * inspired by Python module with same name
 *
 * Copyright (C) 2020 Jakub T. Jankiewicz <https://jcubic.pl>
 * Relased under MIT license
 */

import { auto } from './constants.js';

function to_valid_int(num) {
    num = Math.round(num);
    if (num < 0) {
        return 0;
    }
    return num;
}

class Item {
    constructor(text, {x = 0, y = 0, z = auto} = {}) {
        this._text = text;
        this._x = to_valid_int(x);
        this._y = to_valid_int(y);
        this._z = z;
    }
    clone() {
        return new Item(this._text, { x: this._x, y: this._y, z: this._z });
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
    remove() {
        if (this._canvas) {
            this._canvas.remove_child(this);
        }
    }
    set canvas(c) {
        this.remove();
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
