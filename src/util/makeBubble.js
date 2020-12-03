const makeBubble = (() => {
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

export default makeBubble;
