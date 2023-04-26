function removeEveryOther(arr){
  return arr.filter((e, i) => {
    if (i % 2 == 0) return e
  })
}
