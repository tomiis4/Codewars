package kata

func FindOdd(seq []int) int {
  n := map[int]int{}
  
  for _, c := range seq {
    _, k := n[c]
    if k {
      n[c]++
    } else {
      n[c] = 1
    }
  }
  
  res := 0
  for k, v := range n {
    if v%2 == 1 {
      res = k
    }
  }
  
  return res
}
