import React, { Fragment } from 'react';
import { css, Global } from '@emotion/core';
import { GridLayout } from './GridLayout';

export const GridLayoutPage = (): JSX.Element => (
  <Fragment>
    <Global
      styles={css`
        .react-grid-layout {
          position: relative;
          transition: height 200ms ease;
        }
        .react-grid-item {
          border: 1px solid black;
          transition: all 200ms ease;
          transition-property: left, top;
        }
        .react-grid-item.cssTransforms {
          transition-property: transform;
        }
        .react-grid-item.resizing {
          z-index: 1;
          will-change: width, height;
        }

        .react-grid-item.react-draggable-dragging {
          transition: none;
          z-index: 3;
          will-change: transform;
        }

        .react-grid-item.dropping {
          visibility: hidden;
        }

        .react-grid-item.react-grid-placeholder {
          background: red;
          opacity: 0.2;
          transition-duration: 100ms;
          z-index: 2;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -o-user-select: none;
          user-select: none;
        }

        .react-grid-item > .react-resizable-handle {
          position: absolute;
          width: 20px;
          height: 20px;
          bottom: 0;
          right: 0;
          cursor: se-resize;
        }

        .react-grid-item > .react-resizable-handle::after {
          content: '';
          position: absolute;
          right: 3px;
          bottom: 3px;
          width: 5px;
          height: 5px;
          border-right: 2px solid rgba(0, 0, 0, 0.4);
          border-bottom: 2px solid rgba(0, 0, 0, 0.4);
        }

        .react-resizable-hide > .react-resizable-handle {
          display: none;
        }
      `}
    />
    <h2>React Grid Layout</h2>
    <GridLayout />
  </Fragment>
);