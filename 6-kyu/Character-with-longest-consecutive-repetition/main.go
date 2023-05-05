package kata

import "fmt"

func LongestRepetition(text string) (result Result) {
	splited := []string{}

	for _, c := range text {
		if len(splited) == 0 {
			splited = append(splited, string(c))
		} else if splited[len(splited)-1][:1] == string(c) {
			splited[len(splited)-1] = fmt.Sprintf("%s%s", splited[len(splited)-1], string(c))
		} else {
			splited = append(splited, string(c))
		}
	}
  
  for _, c := range splited {
    if len(c) > result.L {
      result = Result{ C: rune(c[0]), L: len(c) }
    }
  }

	return result
}
