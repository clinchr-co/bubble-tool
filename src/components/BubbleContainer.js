import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import Bubbles from './Bubbles';
import BubbleTransformer from './BubbleTransformer';

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
          <Bubbles
            bubbles={bubbles}
            setBubbles={setBubbles}
            setSelectedIndex={setSelectedIndex}
            stageProps={stageProps}
          />
          <BubbleTransformer bubbles={bubbles} index={selectedIndex} />
        </Layer>
      </Stage>
    </div>
  );
}

export default BubbleContainer;
