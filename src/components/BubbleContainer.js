import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import Bubble from './Bubble';
import calculateSize from '../util/calculateSize';

const ASPECT_RATIO = 9 / 16;

const BubbleContainer = props => {
  const {
    checkDeselect,
    bubbles,
    setBubbles,
    selectedIndex,
    setSelectedIndex
  } = props;

  const containerRef = useRef(null);
  const [stageProps, setStageProps] = useState(null)

  useEffect(() => {
    const adjustStageSize = () => {
      const { width } = containerRef.current.getBoundingClientRect();
      setStageProps({ width, height: width * ASPECT_RATIO });
    }
    adjustStageSize();
    window.addEventListener('resize', adjustStageSize);
    return () => window.removeEventListener('resize', adjustStageSize);
  }, []);

  return (
    <div ref={containerRef} className="col-left bubble-container">
      <Stage
        {...stageProps}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {bubbles.map((bubble, i) => {
            const shapeProps = {
              ...bubble,
              radius: bubble.radius * stageProps.height,
              x: bubble.x * stageProps.width,
              y: bubble.y * stageProps.height
            }
            return (
              <Bubble
                key={i}
                shapeProps={shapeProps}
                isSelected={i === selectedIndex}
                onSelect={() => {
                  setSelectedIndex(i);
                }}
                onChange={(newAttrs) => {
                  const bubblesCopy = bubbles.slice();
                  const sizeAttrs = calculateSize(newAttrs, stageProps);
                  bubblesCopy[i] = { ...newAttrs, ...sizeAttrs };
                  setBubbles(bubblesCopy);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}

export default BubbleContainer;
