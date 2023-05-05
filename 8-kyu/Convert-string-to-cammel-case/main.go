package kata

import (
  "regexp"
  "strings"
)

func ToCamelCase(s string) string {
  splitBy := regexp.MustCompile(`(_|-)`)
  cw := splitBy.Split(s, -1)
  
  for i, c := range cw {
    if i != 0 {
      c = strings.ToUpper(string(c[0])) + c[1:]
    }
    
    cw[i] = c
  }
  
  return strings.Join(cw, "")
}
