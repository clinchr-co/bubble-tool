import React, { useEffect } from 'react';
import { Stage, Layer, Circle, Transformer } from 'react-konva';

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Circle
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            radius: node.radius() * scaleX
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 50) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const makeCircle = (() => {
  const colors = ['red', 'blue', 'green', 'orange'];
  let index = 0;
  return () => {
    index = (index + 1) % colors.length;
    return {
      x: 200,
      y: 200,
      radius: 100,
      fill: colors[index]
    };
  };
})();

const BubbleTool = () => {
  const [circles, setCircles] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedIndex(null);
    }
  };

  const addCircle = () => {
    setCircles([...circles, makeCircle()]);
  };

  const removeSelectedCircle = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(null);
      const circlesCopy = [...circles];
      circlesCopy.splice(selectedIndex, 1);
      setCircles(circlesCopy);
    }
  };

  useEffect(() => {
    console.log('setem up:', selectedIndex, circles)
    const handleDelete = ({ code }) => {
      if (code === 'Backspace') {
        removeSelectedCircle();
      }
    };

    window.addEventListener('keydown', handleDelete);
    return () => window.removeEventListener('keydown', handleDelete);
  }, [selectedIndex, circles]);

  return (
    <div>
      <button onClick={addCircle}>Add Circle</button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {circles.map((rect, i) => {
            return (
              <Rectangle
                key={i}
                shapeProps={rect}
                isSelected={i === selectedIndex}
                onSelect={() => {
                  setSelectedIndex(i);
                }}
                onChange={(newAttrs) => {
                  const rects = circles.slice();
                  rects[i] = newAttrs;
                  setCircles(rects);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default BubbleTool;
