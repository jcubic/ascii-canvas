/* ascii-canvas - string based text rendering for Node and Browser
 * inspired by Python module with same name
 *
 * Copyright (C) 2020 Jakub T. Jankiewicz <https://jcubic.pl>
 * Relased under MIT license
 */

import { auto } from './constants.js';
import type Item from './Item.js';

export interface CanvasOptions {
  overflow?: boolean;
}

export interface CanvasEntry {
  z: number;
  item: Item;
}

type Matrix = (string | undefined)[][];

class Canvas {
  #width: number;
  #height: number;
  #items: CanvasEntry[];
  #topZ: number;
  #options: CanvasOptions;

  constructor(width: number, height: number, options: CanvasOptions = { overflow: false }) {
    this.#width = width;
    this.#height = height;
    this.#items = [];
    this.#topZ = 0;
    this.#options = options;
  }

  get children(): CanvasEntry[] {
    return this.#items;
  }

  remove(item: Item): this {
    const index = this.#items.findIndex((entry) => entry.item === item);
    if (index !== -1) {
      this.#items.splice(index, 1);
    }
    return this;
  }

  resize(width: number, height: number): void {
    this.#width = width;
    this.#height = height;
  }

  append(item: Item): void {
    let z: number;
    if (item.z === auto) {
      this.#topZ++;
      z = this.#topZ;
    } else {
      z = item.z;
      this.#topZ = z;
    }
    this.#items.push({ z, item });
    item.canvas = this;
  }

  #sort(): void {
    this.#items.sort((a, b) => a.z - b.z);
  }

  #matrix(): Matrix {
    const matrix: Matrix = [];
    for (let i = this.#height; i--;) {
      matrix.push(Array.from<string | undefined>({ length: this.#width }));
    }
    return matrix;
  }

  #inBound(i: number): boolean {
    return i < this.#width || !!this.#options.overflow;
  }

  #draw(matrix: Matrix, string: string, x: number, y: number): void {
    if (y < 0 || (y > this.#height - 1 && !this.#options.overflow)) {
      return;
    }
    let i = x;
    if (x > 0) {
      for (let j = x; j--;) {
        if (!matrix[y]![j] && this.#inBound(j)) {
          matrix[y]![j] = ' ';
        }
      }
    }
    for (const chr of string) {
      if (!this.#inBound(i)) {
        break;
      }
      matrix[y]![i++] = chr;
    }
  }

  toString(): string {
    this.#sort();
    const matrix = this.#matrix();
    for (const { item } of this.#items) {
      const lines = item.text.split('\n');
      let y = item.y;
      for (const line of lines) {
        this.#draw(matrix, line, item.x, y++);
      }
    }
    return matrix.map((row) => row.join('')).join('\n');
  }
}

export default Canvas;
