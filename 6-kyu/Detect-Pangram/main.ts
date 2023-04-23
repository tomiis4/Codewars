export const isPangram = (phrase: string): boolean => {
  let res = true;
  const s = phrase.toLowerCase();
  const a = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
  'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X',
  'Y', 'Z' ];
  
  a.forEach((letter) => {
    if (s.split(letter.toLowerCase()).length <= 1) {
      res = false
    }
  })
  return res;
}
