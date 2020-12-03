import React from 'react';
import { Stage, Layer } from 'react-konva';
import Bubble from './Bubble';

const BubbleContainer = props => {
  const {
    checkDeselect,
    bubbles,
    setBubbles,
    selectedIndex,
    setSelectedIndex
  } = props;

  return (
    <div className="col">
      <Stage
        width={800}
        height={450}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {bubbles.map((bubble, i) => {
            return (
              <Bubble
                key={i}
                shapeProps={bubble}
                isSelected={i === selectedIndex}
                onSelect={() => {
                  setSelectedIndex(i);
                }}
                onChange={(newAttrs) => {
                  const bubblesCopy = bubbles.slice();
                  bubblesCopy[i] = newAttrs;
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
