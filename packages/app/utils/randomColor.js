export const random = number => {
  return Math.floor(Math.random() * number);
};
const randomColor = () => {
  return 'rgba(' + random(255) + ',' + random(255) + ',' + random(255) + 0.5, +')';
};
export default randomColor;
