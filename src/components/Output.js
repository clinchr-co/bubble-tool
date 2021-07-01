import React, { useRef, useState, useEffect } from 'react';

const formatAttrs = ({ x, y, radius }) => `
{ x: ${x.toFixed(3)}, y: ${y.toFixed(3)}, radius: ${radius.toFixed(3)} }
`.trim();

const formatAttrsSquare = ({ x, y, radius }, i) => {
  const leftPad = 0.5 - (8 / 9);
  const squareX = leftPad + (16 / 9) * x;
  const height = radius * 2;
  return `
${i}: Object.freeze({ x: ${squareX.toFixed(3)}, y: ${y.toFixed(3)}, height: ${height.toFixed(3)} })
`.trim();
};

const Output = ({ bubbles, selectedIndex }) => {
  const outputRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [squareFormat, setSquareFormat] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [bubbles, squareFormat]);

  const copyText = () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(outputRef.current);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    setCopied(true);
  };

  const toggleFormat = () => {
    setSquareFormat(oldValue => !oldValue);
  };

  const formatButtonText = squareFormat ?
    'Use Rectangular Coordinates (Breakout Sessions)' :
    'Use Square Coordinates (Videographer)';

  const formatter = squareFormat ? formatAttrsSquare : formatAttrs;

  return (
    <div className="col-right">
      <button onClick={copyText} className="copy-button">
        {copied ? 'Copied!!!' : 'Copy Text'}
      </button>
      <button onClick={toggleFormat} className="copy-button">
        {formatButtonText}
      </button>
      <div className="output" ref={outputRef}>
        {bubbles.map(formatter).map((bubbleString, i) => {
          return <pre key={i} className={i === selectedIndex ? "highlighted" : ""}>
            {bubbleString}{i === bubbles.length - 1 ? "" : ","}
          </pre>
        })}
      </div>
    </div>
  );
};

export default Output;
