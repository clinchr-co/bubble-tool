import React from 'react';
import { Transformer } from 'react-konva';

const BubbleTransformer = ({ trRef }) => (
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

export default BubbleTransformer;
