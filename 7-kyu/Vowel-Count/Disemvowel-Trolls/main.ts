export class Kata {
  static disemvowel(str: string): string {
    return str.split('').filter(e => {
      return "aeiou".includes(e.toLowerCase()) ? '' : e;
    }).join('')
  }
}
