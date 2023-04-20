#include <stddef.h>

int stray(size_t n, int arr[n]) {
  int a = arr[0];
  int b = arr[1];
  
  for (int i=0; i < n; i++) {
    if (a == b) {
      int c = arr[i];
      
      if (c != a) {
        return c;
      }
    } else {
      int c = arr[2];
      
      if (c == a) {
        return b;
      } else if (c == b) {
        return a;
      } else {
        return -1;
      }
    }
  }
}
