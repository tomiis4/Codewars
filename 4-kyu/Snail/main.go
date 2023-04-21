//package kata
package main

import "fmt"

// row => at end of the row => down => at down go left => at left go up -1
// res => {1,2,3,6,9,8,7,4,5}

// {
//	{1, 2, 3}, 
// {4, 5, 6}, 
// {7, 8, 9}
// }

func oneSquare(arr [][]int) []int {
  res := []int{}
  height := len(arr)
  width := len(arr[0])

  // top (1,2,3)
  for i:=0; i < width; i++ {
	fmt.Println("top: ", arr[0][i])
    res = append(res, arr[0][i])
  }
  
  // right
  for i:=1; i < height; i++ {
	fmt.Println("right: ", arr[i][width-1])
    res = append(res, arr[i][width-1])
  }
  
  // bottom
  for i:=width-2; i > 0; i-- {
	fmt.Println("bottom: ", arr[width-1][i])
    res = append(res, arr[width-1][i])
  }
  

  // left
  for i:=height-1; i > 0; i-- {
	fmt.Println("left: ", arr[i][0])
   res = append(res, arr[i][0])
  }
  
  return res
}

func Snail(snaipMap [][]int) {
  fmt.Println(oneSquare(snaipMap))
}

func main() {
	Snail([][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}})
	fmt.Println("Expected: {1, 2, 3, 6, 9, 8, 7, 4, 5}")
}
