import React from 'react';
import Bubble from './Bubble';
import calculateSize from '../util/calculateSize';

const Bubbles = props => {
  const {
    bubbles,
    setBubbles,
    selectedIndex,
    setSelectedIndex,
    stageProps,
    trRef
  } = props;
  return (
    <>
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
            transformer={i === selectedIndex ? trRef.current : null }
            onSelect={() => {
              setSelectedIndex(i);
              setBubbles(bubbles.slice());
            }}
            onChange={(newAttrs) => {
              const bubblesCopy = bubbles.slice();
              const sizeAttrs = calculateSize(newAttrs, stageProps);
              bubblesCopy[i] = { ...newAttrs, ...sizeAttrs };
              setSelectedIndex(i);
              setBubbles(bubblesCopy);
            }}
          />
        );
      })}
    </>
  );
}

export default Bubbles
