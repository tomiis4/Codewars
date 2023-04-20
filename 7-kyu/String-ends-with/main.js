function solution(str, ending){
  const strArr = str.split('').reverse();
  const endArr = ending.split('').reverse();
  let check = new Array(endArr);
  
  for (let i=0; i<endArr.length; i++) {
    if (strArr[i] == endArr[i]) {
      check[i] = true;
    } else {
      check[i] = false;
    }
  }
  
  if (check.includes(false)) {
    return false;
  } else {
    return true;
  }
  
}  
