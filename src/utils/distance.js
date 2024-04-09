export const compareDistances = (distance1, distance2) => {
  const value1 = parseFloat(distance1.replace(',', '.').split(' ')[0]);
  const value2 = parseFloat(distance2.replace(',', '.').split(' ')[0]);

  return value1 > value2 ? 2 : value1 < value2 ? 1 : 2;
};
