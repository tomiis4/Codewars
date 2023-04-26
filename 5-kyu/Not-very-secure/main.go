package kata

import "regexp"

func alphanumeric(str string) bool {
  if str == "" { return false }
  rx := regexp.MustCompile(`[a-zA-Z0-9]`)
  
  return rx.ReplaceAllString(str, "") == ""
}
