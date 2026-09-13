import { describe, expect, it } from 'vitest';
import Canvas from '../src/Canvas.js';
import Item from '../src/Item.js';

describe('Item', () => {
  it('defaults to position (0, 0) and derives width/height from the text', () => {
    const item = new Item('foo\nbarbaz');
    expect(item.x).toBe(0);
    expect(item.y).toBe(0);
    expect(item.text).toBe('foo\nbarbaz');
    expect(item.width).toBe(6);
    expect(item.height).toBe(2);
  });

  it('accepts an explicit position', () => {
    const item = new Item('x', { x: 3, y: 4 });
    expect(item.x).toBe(3);
    expect(item.y).toBe(4);
  });

  it('rounds fractional coordinates', () => {
    const item = new Item('x', { x: 2.6, y: 2.4 });
    expect(item.x).toBe(3);
    expect(item.y).toBe(2);
  });

  it('clamps negative coordinates to zero', () => {
    const item = new Item('x', { x: -5, y: -1 });
    expect(item.x).toBe(0);
    expect(item.y).toBe(0);
  });

  it('updates text and recomputes width/height', () => {
    const item = new Item('a');
    item.update('longer\ntext');
    expect(item.text).toBe('longer\ntext');
    expect(item.width).toBe(6);
    expect(item.height).toBe(2);
  });

  it('update returns the item for chaining', () => {
    const item = new Item('a');
    expect(item.update('b')).toBe(item);
  });

  it('moves only the given axes, leaving the rest untouched', () => {
    const item = new Item('a', { x: 1, y: 2 });
    item.move({ x: 10 });
    expect(item.x).toBe(10);
    expect(item.y).toBe(2);

    item.move({ y: 20 });
    expect(item.x).toBe(10);
    expect(item.y).toBe(20);

    item.move({ z: 5 });
    expect(item.z).toBe(5);
  });

  it('exposes the canvas it was appended to', () => {
    const canvas = new Canvas(10, 10);
    const item = new Item('a');
    expect(item.canvas).toBeUndefined();

    canvas.append(item);
    expect(item.canvas).toBe(canvas);
  });

  it('move returns the item for chaining', () => {
    const item = new Item('a');
    expect(item.move({ x: 1 })).toBe(item);
  });

  it('clones with the same text and position', () => {
    const item = new Item('hello', { x: 1, y: 2, z: 3 });
    const clone = item.clone();
    expect(clone).not.toBe(item);
    expect(clone.text).toBe(item.text);
    expect(clone.x).toBe(item.x);
    expect(clone.y).toBe(item.y);
    expect(clone.z).toBe(item.z);
  });

  it('exposes its bounding rect', () => {
    const item = new Item('ab\nc', { x: 1, y: 2 });
    expect(item.rect).toEqual({ x: 1, y: 2, z: item.z, width: 2, height: 2 });
  });

  it('removes itself from its canvas', () => {
    const canvas = new Canvas(10, 10);
    const item = new Item('a');
    canvas.append(item);
    expect(canvas.children).toHaveLength(1);

    item.remove();
    expect(canvas.children).toHaveLength(0);
  });

  it('does nothing when removed without a canvas', () => {
    const item = new Item('a');
    expect(() => item.remove()).not.toThrow();
  });

  it('is re-parented when appended to another canvas', () => {
    const first = new Canvas(10, 10);
    const second = new Canvas(10, 10);
    const item = new Item('a');

    first.append(item);
    second.append(item);

    expect(first.children).toHaveLength(0);
    expect(second.children).toHaveLength(1);
  });
});
