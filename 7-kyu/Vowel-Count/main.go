package kata

import "strings"

func GetCount(str string) (count int) {
  count = 0
  
  for _, value := range str {
    if strings.Contains("aeiou", string(value)) {
      count++
    }
  }
  
  return count
}
