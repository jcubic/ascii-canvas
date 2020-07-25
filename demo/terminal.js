/* ascii-canvas - string based text rendering for Node and Browser
 * inspired by Python module with same name
 *
 * Copyright (C) 2020 Jakub T. Jankiewicz <https://jcubic.pl>
 * Relased under MIT license
 */

import unix from 'jquery.terminal/js/unix_formatting.js';

export const ROWS = 24;
export const COLS = 80;

// mocking jQuery & jQuery Terminal
export const jquery = {
    terminal: {
        defaults: {
            formatters: []
        },
        substring: (str, start, end) => str.substring(start, end),
        strip: x => x,
        active: () => ({
            rows: () => ROWS,
            cols: () => COLS
        }),
        unescape_brackets: x => x
    },
    fn: { terminal: () => {}},
    extend: Object.assign
};

const window = {};
export const { from_ansi } = unix(window, jquery).terminal;
