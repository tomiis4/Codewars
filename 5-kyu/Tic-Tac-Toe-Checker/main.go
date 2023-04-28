package kata

func isSame(s [3]int) bool {
  for _, c := range s {
    if c != s[0] {
      return false
    }
  }

	return true
}

func contains(s [3]int, num int) bool {
  for _, c := range s {
    if c == num {
      return true
    }
  }

	return false
}

func IsSolved(board [3][3]int) int {
  res := -1

  if !contains(board[0], 0) && !contains(board[1], 0) && !contains(board[2], 0) {
    res = 0
  }

  for _, row := range board {
    if isSame(row) && row[0] != 0 {
      res = row[0]
    }
  }
  
  for i:=0; i < 3; i++ {
    column := [3]int{}

    for j:=0; j < 3; j++ {
      column[j] = board[j][i]
    }

    if isSame(column) && column[0] != 0 {
      res = column[0]
    }
  }
  
  lCross := board[0][0] == board[1][1] && board[1][1] == board[2][2]
  rCross := board[0][2] == board[1][1] && board[1][1] == board[2][0]
  if (lCross || rCross) && board[1][1] != 0 {
    res = board[1][1]
  }

  return res
}
