const getRandomColor = () => {
  const randomColor = [
    `bg-lime-600`,
    `bg-lime-700`,
    "bg-red-700",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-amber-400",
    "bg-emerald-300",
    "bg-teal-600",
    "bg-cyan-700",
  ];
  const color = randomColor[Math.floor(Math.random() * randomColor.length)];
  return color;
};

export default getRandomColor;
