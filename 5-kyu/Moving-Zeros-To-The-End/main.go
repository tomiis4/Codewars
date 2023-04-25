package kata

func MoveZeros(arr []int) []int {
  temp := []int{}
  res := []int{}
  
  for _, e := range arr {
    if e != 0 {
      res = append(res, e)
    } else {
      temp = append(temp, e)
    }
  }
  
  return append(res, temp...)
}
