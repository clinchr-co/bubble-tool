import React, { useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';

const BubbleTransformer = ({ bubbles, index }) => {
  const trRef = useRef(null);
  const bubbleNode = (index !== null) && bubbles[index].node;

  useEffect(() => {
    if (trRef.current && bubbleNode) {
      trRef.current.nodes([bubbleNode]);
      trRef.current.getLayer().batchDraw();
    }
  }, [trRef, bubbleNode]);

  if (!bubbleNode) return null;
  return (
    <Transformer
      ref={trRef}
      boundBoxFunc={(oldBox, newBox) => {
        if (newBox.width < 50) {
          return oldBox;
        }
        return newBox;
      }}
    />
  );
}

export default BubbleTransformer;
