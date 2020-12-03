const makeBubble = (() => {
  const colors = ['red', 'blue', 'green', 'orange'];
  let index = 0;
  return () => {
    index = (index + 1) % colors.length;
    return {
      x: 0.3,
      y: 0.3,
      radius: 0.25,
      fill: colors[index]
    };
  };
})();

export default makeBubble;
