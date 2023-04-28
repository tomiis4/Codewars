package kata

func PositiveSum(numbers []int) (result int) {
  for _, c := range numbers {
    if c > 0 {
      result += c
    }
  }
  
  return result
}

