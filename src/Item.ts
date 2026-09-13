/* ascii-canvas - string based text rendering for Node and Browser
 * inspired by Python module with same name
 *
 * Copyright (C) 2020 Jakub T. Jankiewicz <https://jcubic.pl>
 * Relased under MIT license
 */

import { auto, type Auto } from './constants.js';
import type Canvas from './Canvas.js';

export interface ItemOptions {
  x?: number;
  y?: number;
  z?: number | Auto;
}

export interface ItemMoveOptions {
  x?: number | Auto;
  y?: number | Auto;
  z?: number | Auto;
}

export interface ItemRect {
  x: number;
  y: number;
  z: number | Auto;
  width: number;
  height: number;
}

function toValidInt(num: number): number {
  const rounded = Math.round(num);
  return rounded < 0 ? 0 : rounded;
}

class Item {
  #text: string;
  #width: number;
  #height: number;
  #x: number;
  #y: number;
  #z: number | Auto;
  #canvas?: Canvas | undefined;

  constructor(text = '', { x = 0, y = 0, z = auto }: ItemOptions = {}) {
    this.#text = text;
    this.#width = 0;
    this.#height = 0;
    this.update(text);
    this.#x = toValidInt(x);
    this.#y = toValidInt(y);
    this.#z = z;
  }

  clone(): Item {
    return new Item(this.#text, { x: this.#x, y: this.#y, z: this.#z });
  }

  update(text: string): this {
    this.#text = text;
    const lines = text.split('\n');
    this.#height = lines.length;
    this.#width = Math.max(...lines.map((line) => line.length));
    return this;
  }

  move({ x = auto, y = auto, z = auto }: ItemMoveOptions = {}): this {
    if (x !== auto) {
      this.#x = x;
    }
    if (y !== auto) {
      this.#y = y;
    }
    if (z !== auto) {
      this.#z = z;
    }
    return this;
  }

  remove(): void {
    this.#canvas?.remove(this);
  }

  set canvas(c: Canvas | undefined) {
    this.remove();
    this.#canvas = c;
  }

  get canvas(): Canvas | undefined {
    return this.#canvas;
  }

  get text(): string {
    return this.#text;
  }

  get x(): number {
    return this.#x;
  }

  get y(): number {
    return this.#y;
  }

  get z(): number | Auto {
    return this.#z;
  }

  get rect(): ItemRect {
    return {
      x: this.#x,
      y: this.#y,
      z: this.#z,
      width: this.#width,
      height: this.#height,
    };
  }

  get width(): number {
    return this.#width;
  }

  get height(): number {
    return this.#height;
  }
}

export default Item;
