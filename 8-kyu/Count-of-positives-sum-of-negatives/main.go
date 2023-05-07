package kata

func CountPositivesSumNegatives(numbers []int) []int {
  res := []int{0,0}
  
  for _, num := range numbers {
    if num < 0 {
      res[1] += num 
    } 

    if num > 0 {
      res[0]++
    }
  }
  
  
  return res
}
