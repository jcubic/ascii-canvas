import { describe, expect, it } from 'vitest';
import Canvas from '../src/Canvas.js';
import Item from '../src/Item.js';

describe('Canvas', () => {
  it('renders an empty canvas as blank rows', () => {
    const canvas = new Canvas(5, 3);
    expect(canvas.toString()).toBe('\n\n');
  });

  it('pads a line with spaces up to the item x position, trimming the rest', () => {
    const canvas = new Canvas(10, 2);
    canvas.append(new Item('ab', { x: 3, y: 0 }));
    expect(canvas.toString()).toBe('   ab\n');
  });

  it('draws an item flush against the left edge', () => {
    const canvas = new Canvas(5, 1);
    canvas.append(new Item('hi', { x: 0, y: 0 }));
    expect(canvas.toString()).toBe('hi');
  });

  it('skips drawing a line above the canvas (negative y)', () => {
    const canvas = new Canvas(5, 3);
    const item = new Item('x', { x: 0, y: 0 }).move({ y: -1 });
    canvas.append(item);
    expect(canvas.toString()).toBe('\n\n');
  });

  it('skips drawing below the canvas height when overflow is disabled', () => {
    const canvas = new Canvas(5, 3, { overflow: false });
    canvas.append(new Item('x', { x: 0, y: 5 }));
    expect(canvas.toString()).toBe('\n\n');
  });

  it('truncates text past the canvas width when overflow is disabled', () => {
    const canvas = new Canvas(3, 1);
    canvas.append(new Item('abcdef', { x: 0, y: 0 }));
    expect(canvas.toString()).toBe('abc');
  });

  it('draws the full text past the canvas width when overflow is enabled', () => {
    const canvas = new Canvas(3, 1, { overflow: true });
    canvas.append(new Item('abcdef', { x: 0, y: 0 }));
    expect(canvas.toString()).toBe('abcdef');
  });

  it('draws later-appended items on top when z is left to auto-increment', () => {
    const canvas = new Canvas(3, 1);
    canvas.append(new Item('AAA', { x: 0, y: 0 }));
    canvas.append(new Item('B', { x: 1, y: 0 }));
    expect(canvas.toString()).toBe('ABA');
  });

  it('orders overlapping items by z regardless of append order', () => {
    const canvas = new Canvas(3, 1);
    const front = new Item('B', { x: 1, y: 0, z: 2 });
    const back = new Item('AAA', { x: 0, y: 0, z: 1 });
    canvas.append(front);
    canvas.append(back);
    expect(canvas.toString()).toBe('ABA');
  });

  it('stops rendering a removed item', () => {
    const canvas = new Canvas(3, 1);
    const item = new Item('A', { x: 0, y: 0 });
    canvas.append(item);
    canvas.remove(item);
    expect(canvas.toString()).toBe('');
  });

  it('remove is a no-op for an item that was never appended', () => {
    const canvas = new Canvas(3, 1);
    expect(canvas.remove(new Item('A'))).toBe(canvas);
  });

  it('renders against the new dimensions after resize', () => {
    const canvas = new Canvas(2, 1);
    canvas.append(new Item('AB', { x: 0, y: 0 }));
    expect(canvas.toString()).toBe('AB');

    canvas.resize(4, 1);
    canvas.append(new Item('CD', { x: 2, y: 0 }));
    expect(canvas.toString()).toBe('ABCD');
  });

  it('exposes appended items with their assigned z through children', () => {
    const canvas = new Canvas(5, 5);
    const item = new Item('x');
    canvas.append(item);
    expect(canvas.children).toHaveLength(1);
    expect(canvas.children[0]?.item).toBe(item);
    expect(canvas.children[0]?.z).toBe(1);
  });
});
