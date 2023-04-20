export function sameCase(a : string, b : string): number {
  const isUpperCase = (e: string) => e.match(/[A-Z]/);
  const isLowerCase = (e: string) => e.match(/[a-z]/);
  const isNotLetter = (e: string) => e.match(/[^a-zA-Z]/);
  
  if (isLowerCase(a) && isLowerCase(b) || isUpperCase(a) && isUpperCase(b) ) {
    return 1
  } else if (isLowerCase(a) && isUpperCase(b) ||  isUpperCase(a) && isLowerCase(b) ) {
    return 0
  } else {
    return -1
  }
}
