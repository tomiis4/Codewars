export function findUniq(arr: number[]): number {
  const a = arr[0]
  const b = arr[1]

  if (a != b) {
    const c = arr[2];
      
    if (a == c) return b
    if (b == c) return a
  }
  
  for (let i=0; i < arr.length; i++) {
    if (a != arr[i]) {
      return arr[i]
    }
  }

  return 0
}
