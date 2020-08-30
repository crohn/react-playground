import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Layout } from 'react-grid-layout';
import styled from '@emotion/styled';
import { GeometryViewer } from './GeometryViewer';
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
  const { x, y, i: id } = layout;

  const containerRef = useRef<HTMLDivElement>(null);

  const [rect, setRect] = useState<DOMRect>();

  const gradients = useMemo(() => computeGradients(layout, maxX, maxY), [layout, maxX, maxY]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    setRect(containerRef.current.getBoundingClientRect());
  }, [layout]);

  return (
    <Wrapper ref={containerRef} gradients={gradients}>
      {rect && <GeometryViewer id={id} x={x} y={y} width={rect.width} height={rect.height} />}
    </Wrapper>
  );
};
