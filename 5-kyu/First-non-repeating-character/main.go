package kata

import "strings"

func FirstNonRepeating(str string) string {
  arr := strings.Split(str, "")
  
  for _, l := range arr {
    if strings.Index(strings.ToLower(str), strings.ToLower(l)) == strings.LastIndex(strings.ToLower(str), strings.ToLower(l)) {
      return l
    }
  }
  
	return ""
}
