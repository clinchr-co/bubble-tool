import React, { useEffect, useState } from 'react';
import BubbleContainer from './BubbleContainer';
import Output from './Output';
import makeBubble from '../util/makeBubble';

const BubbleTool = () => {
  const [bubbles, setBubbles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedIndex(null);
    }
  };

  const addCircle = () => {
    setBubbles([...bubbles, makeBubble()]);
  };

  const removeSelectedCircle = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(null);
      const bubblesCopy = [...bubbles];
      bubblesCopy.splice(selectedIndex, 1);
      setBubbles(bubblesCopy);
    }
  };

  useEffect(() => {
    const handleDelete = ({ code }) => {
      if (code === 'Backspace') {
        removeSelectedCircle();
      }
    };

    window.addEventListener('keydown', handleDelete);
    return () => window.removeEventListener('keydown', handleDelete);
  }, [selectedIndex, bubbles]);

  return (
    <>
      <button onClick={addCircle}>Add Bubble</button>
      <div className="bubble-tool">
        <BubbleContainer
          checkDeselect={checkDeselect}
          bubbles={bubbles}
          setBubbles={setBubbles}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Output bubbles={bubbles} selectedIndex={selectedIndex} />
      </div>
    </>
  );
};

export default BubbleTool;
