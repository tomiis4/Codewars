package kata

func FindMultiples(integer, limit int) []int {
  numbers := []int{}
  
  for i:=1; i <= limit; i++ {
    if i % integer == 0 {
      numbers = append(numbers, i)
    }
  }
  
  return numbers
}

