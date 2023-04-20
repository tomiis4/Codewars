package kata

import "fmt"

func Solution(str string) []string {
  result := []string{}
  

  for i := 0; i < len(str); i += 2 {
    end := i + 2
    if end > len(str) {
      end = len(str)
    }
    
    s := str[i:end]

    if len(s) == 2 {
      result = append(result, s)
    } else {
      result = append(result, fmt.Sprintf("%s_", s))
    }
  }


  return result;
}
