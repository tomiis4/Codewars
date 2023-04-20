// Return the output array, and ignore all non-op characters

const howMuch = (array) => {
  let count = 0;
  
  array.forEach((value) => {
    if (value == 'o') {
      count++;
    }
  })
  
  return count
}

function parse( data ) {
  console.log(data)
  const dataArr = data.split('');
  const countOutput = howMuch(dataArr);
  
  let finalArr = new Array(countOutput).fill(0);  
  
  let timeLooped = 0;  
  
  dataArr.forEach((value) => {
    switch (value) {
        case 'i':
          finalArr[timeLooped] += 1;
          break;
        case 'd':
          finalArr[timeLooped] -= 1;
          break;
        case 's':
          finalArr[timeLooped] = finalArr[timeLooped] * finalArr[timeLooped];
          break;
        case 'o':
          finalArr[timeLooped + 1] = finalArr[timeLooped]
          timeLooped++;
          break;
        default:
          return 'Something went wrong';
    }
  })
  
  
  return finalArr.slice(0, -1);
}
