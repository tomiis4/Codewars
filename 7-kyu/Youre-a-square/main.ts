export default function isSquare(n: number): boolean {
  if (n == 0 ) return true;
  if (n < 0 ) return false;
  
  if (Math.sqrt(n) % 1 == 0) {
    return true;
  } else {
    return false;
  }
};
