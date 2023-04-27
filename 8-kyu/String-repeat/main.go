package kata

func RepeatStr(repetitions int, value string) string {
  str := ""
  
  for i:=0; i < repetitions; i++ {
    str += value
  }
  
  return str
}
