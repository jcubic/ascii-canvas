const $char = document.querySelector('.char');
const rect = $char.getBoundingClientRect();
const $canvas = document.querySelector('canvas');

let width, height, ROWS, COLS;

const padding = { x: 10, y: 10 };

var ctx = $canvas.getContext('2d');

reset();

import { Canvas, Item } from '../src/index.js';

const stage = new Canvas(COLS, ROWS, { overflow: false });
const border = new Item(frame(COLS, ROWS));
stage.append(border);
const status = new Item('x: ; y: ', {x: 2, y: ROWS - 2});
stage.append(status);
stage.append(new Item([
    'TODO:',
    '[x]: Dragable',
    '[x]: Checkbox UI element',
    '[ ]: Button with State (require: formatter)',
    '[ ]: Text selection restore',
    '[ ]: Draw Box',
    '[ ]: Resizible',
    '[ ]: putpixel API to create Line (for Bresenham’s Algorithm)',
    '[ ]: Draw Circle (Bresenham’s)',
    '[ ]: Draw line (Bresenham’s)',
    '[ ]: ASCII Canvas Formatter',
    '[ ]: Try filling algorithm'
].join('\n'), {x: 2, y: 2}));
stage.append(new Item([
    'ASCII Canvas API:',
    '[ ]: Formatters',
    '[x]: Canvas::resize',
    '[x]: Canvas::children',
    '[x]: Overflow option (hidden/visible)',
    '[ ]: Item::width + Item::height',
    '[ ]: Items::data',
    '[ ]: Ignore draw outside',
    '[ ]: Behaviors resizable, dragable, clickable ???',
    '[ ]: Component UI library (class based)',
    '[ ]: Render dispatch on classes (innerHTML,canvas)',
    '[ ]: Nested components (e.g.: checkbox = label + state)',
    '[ ]: Think about React like API'
].join('\n'), {x: 90, y: 2}));
stage.append(new Item('   : Real Checkbox', {y: 15, x: 2}));
const checkbox = new Item('[ ]', {y: 15, x: 2});
const radio = [];
const labels = [
    'Foo',
    'Bar',
    'Baz'
]
for (let i = 0; i < 3; ++i) {
    const y = 16 + i;
    const label = new Item('   : ' + labels[i], { x: 2, y });
    const component = new Item('( )', { x: 2, y });
    stage.append(label);
    stage.append(component);
    radio.push(component);
}
stage.append(checkbox);

// -----------------------------------------------------------------------------
const draggable = [];

(function() {
    const str = box('Drag Me');
    const len = str.match(/^.*/g)[0].length;
    const x = (COLS - 2 - len) / 2;
    const y = (ROWS - 2) / 2;
    draggable.push(new Item(str, { x, y }));
})();
stage.append(draggable[0]);

// -----------------------------------------------------------------------------
const clickable = [checkbox];


// -----------------------------------------------------------------------------
function clear() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#cccccc';
}

// -----------------------------------------------------------------------------
function frame(width, height) {
    const line = '+' + new Array(width - 2).fill('-').join('') + '+';
    const empty = '|' + new Array(width - 2).fill(' ').join('') + '|';
    let output = [line];
    output = output.concat(new Array(height - 2).fill(empty));
    output.push(line);
    return output.join('\n');
}

// -----------------------------------------------------------------------------
function box(label) {
    const line = '+' + new Array(label.length).fill('-').join('') + '+';
    return [line, '|' + label + '|', line].join('\n');
}

// -----------------------------------------------------------------------------
function render() {
    clear();
    const text = stage.toString().split('\n');
    for (let line = 0; line < text.length; ++line) {
        ctx.fillText(text[line], 10, 10 + (rect.height * line));
    }
}

// -----------------------------------------------------------------------------
var drag;
var offset;

// -----------------------------------------------------------------------------
function coords(e) {
    const x = e.clientX - padding.x;
    const y = e.clientY - padding.y;
    return transform_cord({ x, y });
}

// -----------------------------------------------------------------------------
function transform_cord({ x = 0, y = 0 } = {}) {
    return {
        y: Math.floor(y / rect.height),
        x: Math.floor(x / rect.width)
    };
}

// -----------------------------------------------------------------------------
function reset() {
    width = window.innerWidth;
    height = window.innerHeight;
    const pad_x = padding.x * 2;
    const pad_y = padding.y * 2;
    ROWS = Math.floor((height - pad_y) / rect.height);
    COLS = Math.floor((width - pad_x) / rect.width);

    console.log({rect, COLS, width});

    $canvas.width = width;
    $canvas.height = height;

    ctx.font = '14px monospace';
    ctx.textBaseline = "hanging";

}

// -----------------------------------------------------------------------------
function find(arr, { x = 0, y = 0 } = {}) {
    return arr.find(item => {
        if (x >= item.x && y >= item.y) {
            const { width, height } = item.rect;
            return x - item.x < width && y - item.y < height;
        }
        return false;
    });
}

// -----------------------------------------------------------------------------
$canvas.addEventListener('mousemove', (e) => {
    const { x, y } = coords(e);
    if (drag) {
        status.update(`x: ${x}; y: ${y}`);
        drag.move({ x: x - offset.x , y: y - offset.y });
        render();
    }
});

// -----------------------------------------------------------------------------
$canvas.addEventListener('mousedown', e => {
    const pos = coords(e);
    drag = find(draggable, pos);
    if (drag) {
        offset = {
            x: pos.x - drag.x,
            y: pos.y - drag.y
        };
    } else {
        const c = find(clickable, pos);
        if (c) {
            var state = c.text === '[x]';
            c.update(state ? '[ ]' : '[x]');
            e.preventDefault();
            render();
        } else {
            const r = find(radio, pos);
            if (r) {
                e.preventDefault();
                r.update('(o)');
                radio.filter(radio => r !== radio).forEach(radio => {
                    radio.update('( )');
                });
                render();
            }
        }
    }
});

// -----------------------------------------------------------------------------
$canvas.addEventListener('mouseup', e => {
    drag = null;
});


// -----------------------------------------------------------------------------
window.addEventListener('resize', e => {
    reset();
    stage.resize(COLS, ROWS);
    border.update(frame(COLS, ROWS));
    status.move({y: ROWS - 2});
    render();
});

// -----------------------------------------------------------------------------
render();
