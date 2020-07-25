/* ascii-canvas - string based text rendering for Node and Browser
 * inspired by Python module with same name
 *
 * Copyright (C) 2020 Jakub T. Jankiewicz <https://jcubic.pl>
 * Relased under MIT license
 */

import ervy from 'ervy';
import boxen from 'boxen';
import { stringifyTree } from 'stringify-tree';

const tree = {
    name: "Grandmarti", children: [
        {
            name: "Cyndi", children: [
                {
                    name: "Jess", children: [
                        { name: "Evelyn", children: [] },
                        { name: "Linda", children: [] },
                    ],
                },
            ],
        },
        { name: "Celia", children: [] },
    ],
};

import { Canvas, Item } from '..';
import { ROWS, COLS, from_ansi } from './terminal';


const canvas = new Canvas(COLS, ROWS);

const str = boxen('unicorn', { padding: 1 });

const x_start = 10;
const y_start = 5;

for (var i = 0; i < 3; ++i) {
  const x = i * 10;
  const y = i * 3;
  const box = new Item(str, { x: x_start + x, y: y_start + y });
  canvas.append(box);
}


function plot() {
    // based on ervy demo.js
    const data = [];

    for (let i = 1; i < 17; i++) {
        if (i < 6) {
            data.push({ key: 'Hash', value: [i, i], style: '#' });
        } else {
            data.push({ key: 'Asterisk', value: [i, 6], style: '*' });
        }
    }

    const plot = ervy.scatter(data, { legendGap: 18, width: 15 });
    return from_ansi(plot);
}

canvas.append(new Item(plot(), {x: 55, y: 3}));
canvas.append(new Item(stringifyTree(tree, t => t.name, t => t.children), {x: 5, y: 14}));

console.log(canvas.toString());
