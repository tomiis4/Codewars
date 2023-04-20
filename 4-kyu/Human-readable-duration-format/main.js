const getS = (num) => {
  if (num != 1) {
    return 's';
  } else {
    return '';
  }
}

function formatDuration (seconds) {
  let isSec = true;
  let isMin = true;
  let isHour = true;
  let isDay = true;
  let isYear = true;

  const year = Math.floor(seconds / 31536000);
  const day = Math.floor((seconds / 86400) - (year * 365));
  const hour = Math.floor((seconds / 3600) - ((365*year + day) * 24));
  const min = Math.floor((seconds / 60) - ((year * 8760 + day*24 + hour) * 60));
  const second = Math.floor(seconds % 60);
  
  let result = '';
  let stringArray = [];
  
  if (seconds == 0) {
    result += 'now';
  }
  if (isYear == true && year != 0) {
    stringArray.push(`${year} year${getS(year)}`);
  }
  if (isDay == true && day != 0) {
    stringArray.push(`${day} day${getS(day)}`);
  }
  if (isHour == true && hour != 0) {
    stringArray.push(`${hour} hour${getS(hour)}`);
  }
  if (isMin == true && min != 0) {
    stringArray.push(`${min} minute${getS(min)}`);
  }   
  if (isSec == true && second != 0) {
    stringArray.push(`${second} second${getS(second)}`);
  } 
  

  for (let i=0; i<stringArray.length; i++) {
    
    if (i == stringArray.length -1 && stringArray.length != 1) {
      result += '';
      result += stringArray[i];
    } else if (stringArray.length == 1) { 
      result += stringArray[i];
    } else {
      result += stringArray[i];
      result += ', ';
    }
  }
  
  
  return result.replace(/, ([^,]*)$/, ' and $1');
  
}
