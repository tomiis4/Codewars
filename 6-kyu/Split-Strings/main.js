function solution(str){
  let arr = [];
  
  const strArr = str.split('');
  for (let i=0; i < strArr.length; i+=2) {
    if (!strArr[i+1]) {
      arr.push(`${strArr[i]}_`);
    } else {
      arr.push(`${strArr[i]}${strArr[i+1]}`);
    }
  }
  
  return arr;
}
