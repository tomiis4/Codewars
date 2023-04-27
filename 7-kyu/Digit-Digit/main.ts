export class Kata {
  static squareDigits(num: number): number {
    return parseInt(num.toString().split('').map(e => {
      return Math.pow(parseInt(e), 2)
    }).join(''));
  }
}
