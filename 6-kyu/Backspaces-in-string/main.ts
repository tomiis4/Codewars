export function cleanString(s: string): string {
  let str: string[] = [];
  
  s.split('').forEach((e) => {
    if (e != '#') {
      str.push(e);
    } else {
      str.pop();
    }
  })
  
  return str.join('');
}
