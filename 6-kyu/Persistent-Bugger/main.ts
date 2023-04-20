const multiply = (arr: string[]): number => {
  let num = 1;
  
  arr.forEach((elem: string) => {
    num *= parseInt(elem);
  })
  console.log(arr)
  
  return num;
}


export function persistence(num: number): number {
  if (num.toString().length == 1) return 0;
  
  let multNum = num;
  let n = 0;
  
  while (multNum.toString().length != 1) {
    multNum = multiply(multNum.toString().split(''))
    n++;
  }
  
  return n
}
