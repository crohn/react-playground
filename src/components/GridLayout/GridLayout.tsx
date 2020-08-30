import React, { useCallback, useRef, useState } from 'react';
import ReactGridLayout, { Layout } from 'react-grid-layout';
import { useWidthProvider } from '../../hooks/useWidthProvider';
import { GradientCard } from './GradientCard';
import { createLayout } from './utils';

/** number of columns */
const GRID_COLS = 10;

/** row height in pixels */
const GRID_ROW_HEIGHT = 30;

interface LayoutState {
  layout: Layout[];
  /** maximum grid item's (y + h) used to compute gradient */
  maxY: number;
}

export const GridLayout = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [layoutState, setLayoutState] = useState<LayoutState>({ layout: createLayout(), maxY: 1 });

  const handleLayoutChange = useCallback((nextLayout: Layout[]) => {
    const maxY = nextLayout.reduce((maxValue, item) => Math.max(maxValue, item.h + item.y), 1);

    setLayoutState({ layout: nextLayout, maxY });
  }, []);

  const width = useWidthProvider({ containerRef });

  return (
    <div ref={containerRef}>
      {width ? (
        <ReactGridLayout
          className="layout"
          cols={GRID_COLS}
          layout={layoutState.layout}
          onLayoutChange={handleLayoutChange}
          rowHeight={GRID_ROW_HEIGHT}
          useCSSTransforms={true}
          width={width}
        >
          {layoutState.layout.map((item) => (
            <div key={item.i}>
              <GradientCard layout={item} maxX={GRID_COLS} maxY={layoutState.maxY} />
            </div>
          ))}
        </ReactGridLayout>
      ) : (
        <div className="layout" />
      )}
    </div>
  );
};
