![ASCII Canvas Logo](https://github.com/jcubic/ascii-canvas/blob/master/assets/logo.svg?raw=true)

[![npm](https://img.shields.io/badge/npm-0.1.0-blue.svg)](https://www.npmjs.com/package/ascii-canvas)
[![LICENSE MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jcubic/ascii-canvas/blob/master/LICENSE)

ASCII canvas is library that help position elements on the screen. I can be used
with Node.js or Browser to render ASCII Text. I can be used with other ASCII libraries
like charts and position them on the screen.

## Installation

```bash
npm install ascii-canvas
```

## Usage

### Node

```javascript
const { Canvas, Item } = require('ascii-canvas');
```

### Browser

```html
<script src="https://unpkg.com/isomorphic-lolcat"></script>
<script>
const { Canvas, Item } = canvas;
</script>
```

## Example

```javascript
const ROWS = 24;
const COLS = 80;
const myCanvas = new Canvas(COLS, ROWS);

// see boxen on npm
const str = boxen('unicorn', { padding: 1 });

const x_start = 10;
const y_start = 5;

for (var i = 0; i < 3; ++i) {
  const x = i * 10;
  const y = i * 3;
  const box = new Item(str, { x: x_start + x, y: y_start + y });
  myCanvas.append(box);
}

console.log(myCanvas.toString());
```

![Terminal Screenshot](https://github.com/jcubic/ascii-canvas/blob/master/assets/screenshot.png?raw=true)

## Demo

[Browser Demo](https://codepen.io/jcubic/pen/xxZebyK).
To see demo in Node.js you need to do those steps.

```bash
# clone repo
git clone https://github.com/jcubic/ascii-canvas.git
cd ascii-canvas
# install example ASCII libraries
npm install boxen ervy jquery.terminal stringify-tree
# install ES loader
npm install -g esm
# run the code
node -r esm ./demo/demo.js
```

## API

* **Canvas**

```javascript
class Canvas {
    constructor(width, height);
    remove_child(item);
    append(item);
    toString();
}
```

* **Item**

```javascript
class Item {
    constructor(string, {x, y, z});
    clone();
    update(string)
    move({x,y,z});
}
```

## Changelog

* 0.1.0 Initial version

## License

Copyright (C) 2020 [Jakub T. Jankiewicz](https://jcubic.pl) <jcubic@onet.pl><br/>
Released with MIT License
