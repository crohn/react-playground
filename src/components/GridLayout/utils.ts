import curry from 'lodash.curry';
import { Layout } from 'react-grid-layout';

export const createGridItem = (x: number, y: number, i: number): Layout => ({ w: 1, h: 1, x, y, i: i.toString() });

export const createLayout = (n = 100): Layout[] =>
  Array(n)
    .fill(null)
    .reduce<{ items: Layout[]; y: number }>(
      (prev, _, index) => {
        const x = index % 10;
        const y = x === 0 ? prev.y + 1 : prev.y;

        return { items: prev.items.concat(createGridItem(x, y, index)), y };
      },
      { items: [], y: -1 },
    ).items;

type Range = { start: number; end: number };
export type TranslateFn = (value: number) => number;

/** Translate 1D */
export const translate = (domain: Range, range: Range): TranslateFn => (value: number) => {
  const lambda = (range.end - range.start) / (domain.end - domain.start);
  const offset = range.start - domain.start;

  return lambda * value + offset;
};

/** decimal to hexadecimal conversion */
export const hex = (value: number): string => Math.round(value).toString(16).padStart(2, '0');

/** color values including alpha */
export const rgba = (red: number, green: number, blue: number, alpha: number): string =>
  `#${hex(red)}${hex(green)}${hex(blue)}${hex(alpha)}`;

//

const COLOR_RANGE = { start: 0, end: 255 };

export type Gradient = { start: string; end: string };
export type Gradients = {
  red: Gradient;
  green: Gradient;
  blue: Gradient;
};

const redColor = curry(rgba)(255, 0, 0);
const greenColor = curry(rgba)(0, 255, 0);
const blueColor = curry(rgba)(0, 0, 255);

const alphaGradientFromCoordinates = (
  start: number,
  end: number,
  scale: TranslateFn,
  colorFn: (alpha: number) => string,
): Gradient => ({
  start: colorFn(scale(start)),
  end: colorFn(scale(end)),
});

export const computeGradients = (layout: Layout, maxX: number, maxY: number): Gradients => {
  const scaleX = translate({ start: 0, end: maxX }, COLOR_RANGE);
  const scaleY = translate({ start: 0, end: maxY }, COLOR_RANGE);

  const red = alphaGradientFromCoordinates(layout.y, layout.y + layout.h, scaleY, redColor);
  const green = alphaGradientFromCoordinates(layout.x, layout.x + layout.w, scaleX, greenColor);
  const blue = alphaGradientFromCoordinates(maxX - layout.x, maxX - layout.x - layout.w, scaleX, blueColor);

  return { red, green, blue };
};
