import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
  color: #ffffff;
  font-size: 10px;
  padding: 4px;
`;

interface Props {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const GeometryViewer = ({ id, height, x, y, width }: Props): JSX.Element => (
  <Wrapper>
    {id}: {x} {y} {width}x{height}
  </Wrapper>
);
