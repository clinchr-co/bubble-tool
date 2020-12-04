const calculateSize = (bubble, stageProps) => {
  const { width, height } = stageProps;

  const radius = Math.min(bubble.radius, height / 2);
  const x = Math.min(Math.max(bubble.x, radius), width - radius);
  const y = Math.min(Math.max(bubble.y, radius), height - radius);

  return {
    radius: radius / height,
    x: x / width,
    y: y / height
  };
};

export default calculateSize;
