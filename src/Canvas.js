/* ascii-canvas - string based text rendering for Node and Browser
 * inspired by Python module with same name
 *
 * Copyright (C) 2020 Jakub T. Jankiewicz <https://jcubic.pl>
 * Relased under MIT license
 */

import { auto } from './constants.js';

class Canvas {
    constructor(width, height, options = { overflow: false }) {
        this._width = width;
        this._height = height;
        this._items = [];
        this._top_z = 0;
        this._options = options;
    }
    get children() {
        return this._items;
    }
    remove(item) {
        for (const i in this._items) {
            const { item: search } = this._items[i];
            if (search === item) {
                this._items.splice(i, 1);
                break;
            }
        }
        return this;
    }
    resize(width, height) {
        this._width = width;
        this._height = height;
    }
    append(item) {
        let z;
        if (item.z === auto) {
           this._top_z++;
           z = this._top_z;
        } else {
           this._top_z = z = item.z;
        }
        this._items.push({
            z,
            item
        });
        item.canvas = this;
    }
    _sort() {
        this._items.sort((a, b) => a.z - b.z);
    }
    _matrix() {
        const matrix = [];
        for (let i = this._height; i--;) {
            matrix.push(new Array(this._width));
        }
        return matrix;
    }
    _in_bound(i) {
        return i < this._width || this._options.overflow;
    }
    _draw(matrix, string, x, y) {
        if (y > this._height - 1 && !this._options.overflow) {
            return;
        }
        let i = x;
        if (x > 0) {
            for (let i = x; i--;) {
                if (!matrix[y][i] && this._in_bound(i)) {
                    matrix[y][i] = ' ';
                }
            }
        }
        for (const chr of string) {
            if (!this._in_bound(i)) {
                break;
            }
            matrix[y][i++] = chr;
        }
    }
    toString() {
        this._sort();
        const matrix = this._matrix();
        for (const { item } of this._items) {
            const lines = item.text.split('\n');
            let y = item.y;
            for (const line of lines) {
                this._draw(matrix, line, item.x, y++);
            }
        }
        return matrix.map(row => row.join('')).join('\n');
    }
}


export default Canvas;
