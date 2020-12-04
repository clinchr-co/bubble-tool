import React, { useEffect, useRef } from 'react';
import { Circle } from 'react-konva';

const Bubble = ({ shapeProps, onSelect, onChange, onRef }) => {
  const bubbleRef = useRef();

  useEffect(() => {
    onRef(bubbleRef.current);
  }, [bubbleRef.current]);

  return (
    <Circle
      onClick={onSelect}
      onTap={onSelect}
      ref={bubbleRef}
      {...shapeProps}
      x={shapeProps.x + Math.random() / 1000}
      y={shapeProps.y + Math.random() / 1000}
      draggable
      onDragEnd={(e) => {
        onChange({
          ...shapeProps,
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      onTransformEnd={(e) => {
        const node = bubbleRef.current;
        const scaleX = node.scaleX();

        node.scaleX(1);
        node.scaleY(1);
        onChange({
          ...shapeProps,
          x: node.x(),
          y: node.y(),
          radius: node.radius() * scaleX
        });
      }}
    />
  );
};

export default Bubble;
