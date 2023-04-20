export function findOutlier(integers: number[]): number {
  let odd = 0;
  let oddT = 0
  let evenT = 0; 
  let even = 0;
  
  integers.forEach(elem => {
    if (elem%2) {
      odd = elem;
      oddT++;
    } else {
      even = elem;
      evenT++;
    }
  });
  
  if (evenT == 1) {
    return even;
  } else {
    return odd;
  }
}

