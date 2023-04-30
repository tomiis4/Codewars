package kata

import (
  "strings"
  "strconv"
  "sort"
  "fmt"
)

func HighAndLow(in string) string {
  numsStr := strings.Split(in, " ")
  nums := make([]int, len(numsStr))
  
  for i, c := range numsStr {
    n, _ := strconv.Atoi(c)
    nums[i] = n
  }
  sort.Ints(nums)
  
  return fmt.Sprintf("%d %d", nums[len(nums)-1], nums[0])
}
