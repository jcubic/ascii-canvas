![ASCII Canvas Logo](https://github.com/jcubic/ascii-canvas/blob/master/assets/logo.svg?raw=true)

[![npm](https://img.shields.io/badge/npm-0.3.0-blue.svg)](https://www.npmjs.com/package/ascii-canvas)
[![LICENSE MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jcubic/ascii-canvas/blob/master/LICENSE)

[ASCII canvas is library that help position elements on the screen](https://github.com/jcubic/ascii-canvas).

I can be used with Node.js or Browser to render ASCII Text. I can be used with other ASCII libraries
like charts and position them on the screen.

## Installation

```bash
npm install ascii-canvas
```

## Usage

### Node

```javascript
const { Canvas, Item } = require('ascii-canvas');
// or
import { Canvas, Item } from 'ascii-canvas';
```

### Browser

```html
<script src="https://unpkg.com/ascii-canvas"></script>
<script>
const { Canvas, Item } = canvas;
</script>
```

## Example

```javascript
const ROWS = 24;
const COLS = 80;
const my_canvas = new Canvas(COLS, ROWS);

// see boxen on npm
const str = boxen('unicorn', { padding: 1 });

const x_start = 10;
const y_start = 5;

myCanvas.append(new Item(frame()));

for (var i = 0; i < 3; ++i) {
  const x = i * 10;
  const y = i * 3;
  const box = new Item(str, { x: x_start + x, y: y_start + y });
  my_canvas.append(box);
}

console.log(my_canvas.toString());

// functions to render box frame
function rep(str, count) {
    return new Array(count).fill(str).join('');
}

function frame() {
    const output = [];
    const x_count = COLS - 2;
    const y_Count = ROWS - 2;
    output.push(`+${rep('-', x_count)}+`);
    for (let i = 0; i < y_Count; ++i) {
        output.push(`|${rep(' ', x_count)}|`);
    }
    output.push(`+${rep('-', x_count)}+`);
    return output.join('\n');
}
```

![Terminal Screenshot](https://github.com/jcubic/ascii-canvas/blob/master/assets/screenshot.png?raw=true&nocache=1)

## Demo

[Browser Demo](https://codepen.io/jcubic/pen/xxZebyK).
To see demo in Node.js you need to do those steps.

```bash
# clone repo
git clone https://github.com/jcubic/ascii-canvas.git
cd ascii-canvas
# install dev dependencies (including example ASCII libraries)
npm install
# run the code
node --experimental-modules ./demo/demo.js
```

## API

* **Canvas**

```javascript
class Canvas {
    constructor(width, height, { overflow: true || false });
    remove(item);
    resize(width, height);
    append(item);
    toString();
    get children;
}
```

* **Item**

```javascript
class Item {
    constructor(string, {x, y, z});
    clone();
    remove();
    update(string)
    move({x,y,z});
    get width;
    get height;
    get x;
    get y;
    get z;
    get rect;
}
```

## Changelog
### 0.3.0
* add Canvas::resize
* add read only Canvas::children
* add overflow option to Canvas
* fix negative y when rendering item
* add read only Item::rect/width/height
* rename Canvas::remove_child() to Canvas::remove()
### 0.2.0
* add Item::remove
* fix Item::clone
### 0.1.2
* throw exception when x or y outside of Canvas dimensions
### 0.1.1
* fix infinite loop when x or y is float
### 0.1.0
* Initial version

## License

Copyright (C) 2020-2023 [Jakub T. Jankiewicz](https://jcubic.pl/me) <jcubic@onet.pl><br/>
Released with MIT License
