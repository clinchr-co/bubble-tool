import React, { useRef, useState, useEffect } from 'react';

const formatAttrs = ({ x, y, radius }) => `
{
  x: ${x.toFixed(3)},
  y: ${y.toFixed(3)},
  radius: ${radius.toFixed(3)}
}
`.trim();

const Output = ({ bubbles, selectedIndex }) => {
  const outputRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [bubbles]);

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

  return (
    <div className="col-right">
      <button onClick={copyText} className="copy-button">
        {copied ? 'Copied!!!' : 'Copy Text'}
      </button>
      <div className="output" ref={outputRef}>
        {bubbles.map(formatAttrs).map((bubbleString, i) => {
          return <pre key={i} className={i === selectedIndex ? "highlighted" : ""}>
            {bubbleString}{i === bubbles.length - 1 ? "" : ","}
          </pre>
        })}
      </div>
    </div>
  );
};

export default Output;
