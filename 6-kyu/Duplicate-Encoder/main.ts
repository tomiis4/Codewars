export function duplicateEncode(word: string){
  const arr = word.toLowerCase().split('');
  let s = arr.map((letter) => {
    return arr.filter(e => e == letter).length > 1 ? ')' : '(';
  });
  
  return s.join('');
}
