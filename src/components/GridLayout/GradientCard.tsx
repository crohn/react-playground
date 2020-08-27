import React, { useMemo } from 'react';
import { Layout } from 'react-grid-layout';
import styled from '@emotion/styled';
import { computeGradients, Gradients } from './utils';

const Wrapper = styled('div')<{ gradients: Gradients }>`
  height: 100%;
  overflow: hidden;

  background: linear-gradient(${(p) => p.gradients.red.start}, ${(p) => p.gradients.red.end}),
    linear-gradient(to right, ${(p) => p.gradients.green.start}, ${(p) => p.gradients.green.end}),
    linear-gradient(to right, ${(p) => p.gradients.blue.start}, ${(p) => p.gradients.blue.end});
  background-blend-mode: screen;

  &:hover {
    cursor: move;
  }
`;

interface Props {
  layout: Layout;
  maxX: number;
  maxY: number;
}

export const GradientCard = ({ layout, maxX, maxY }: Props): JSX.Element => {
  const gradients = useMemo(() => computeGradients(layout, maxX, maxY), [layout, maxX, maxY]);

  return <Wrapper gradients={gradients}>{JSON.stringify(layout)}</Wrapper>;
};
