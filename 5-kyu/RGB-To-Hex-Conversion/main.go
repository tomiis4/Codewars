package kata

import "fmt"

func RGB(r, g, b int) string {
    // clamp r, g, and b to the range [0, 255]
    r = clamp(r, 0, 255)
    g = clamp(g, 0, 255)
    b = clamp(b, 0, 255)

    // convert r, g, and b to hexadecimal string format
    hexStr := fmt.Sprintf("%02X%02X%02X", r, g, b)

    return hexStr
}

func clamp(n, min, max int) int {
    if n < min {
        return min
    } else if n > max {
        return max
    } else {
        return n
    }
}
