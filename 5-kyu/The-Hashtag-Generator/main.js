function generateHashtag (str) {
  if (str.trim() == "") return false;
  let s = str;
  let sArr = str.split('');
  
  sArr.forEach((e, i) => {
    if (sArr[i+1] && sArr[i+1] != ' ' && e == ' ') {
      sArr[i+1] = sArr[i+1].toUpperCase();
    } else if (i == 0) {
      sArr[i] = sArr[i].toUpperCase();
    }
  });
  
  sArr = "#" + sArr.join('').replace(/ /gm, '')
  
  return sArr.length > 140 ? false : sArr;
}
