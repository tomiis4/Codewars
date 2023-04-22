package kata

func contains(ij []int, arr [][]int) bool {
	for _, elem := range arr {
		if elem[0] == ij[0] && elem[1] == ij[1] {
			return true
		}
	}

	return false
}

func removeIdx(arr [][]int, indexes [][]int) [][]int {
	tempArr := [][]int{}

	for i := range arr {
		tempRow := []int{}

		for j, value := range arr[i] {
			if !contains([]int{i,j}, indexes) {
				tempRow = append(tempRow, value)
			}
		}

		if len(tempRow) > 0 {
			tempArr = append(tempArr, tempRow)
		}
	}

	return tempArr
}

func oneSquare(arr [][]int) ([]int, [][]int) {
	res := []int{}
	remove := [][]int{}

	height := len(arr)
	width := len(arr[0])

	// top
	for i:=0; i < width; i++ {
		res = append(res, arr[0][i])
		remove = append(remove, []int{0, i})
	}

	// right
	for i:=1; i < height; i++ {
		res = append(res, arr[i][width-1])
		remove = append(remove, []int{i, width-1})
	}

	// bottom
	for i:=width-2; i > 0; i-- {
		res = append(res, arr[width-1][i])
		remove = append(remove, []int{width-1, i})
	}

	// left
	for i:=height-1; i > 0; i-- {
		res = append(res, arr[i][0])
		remove = append(remove, []int{i, 0})
	}

	return res, removeIdx(arr, remove)
}

func Snail(snaipMap [][]int) []int {
	array := [][]int{}
	result := []int{}

	res, arr := oneSquare(snaipMap)
	result = res
	array = arr

	for {
		if len(array) == 0 { break }
		tRes, tArr := oneSquare(array)

		result = append(result, tRes...)
		array = tArr
	}

	return result
}
