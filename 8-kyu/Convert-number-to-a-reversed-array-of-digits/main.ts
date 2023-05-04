export const digitize = (n: number): number[] => {
  return n.toString().split('').map(num => parseInt(num)).reverse();
};
