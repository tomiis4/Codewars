package kata

import (
  "strconv"
  "strings"
)

func toInt(arr []string) (res int) {
  for _, str := range arr {
    num, _ := strconv.Atoi(str)
    res += num
  }
  
  return res
}

func DigitalRoot(n int) int {
  num := toInt(strings.Split(strconv.Itoa(n), ""))
  
  for {
    if len(strconv.Itoa(num)) == 1 {
      break
    }
  
    num = toInt(strings.Split(strconv.Itoa(num), ""))
  }
  
  return num
}
