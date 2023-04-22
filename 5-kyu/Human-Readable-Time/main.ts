const padd = (n: number): string => {
  if (n.toString().length == 2) return `${n}`;
  
  return `0${n}`;
}

export function humanReadable(s:number):string {
  if (s < 60) return "00:00:" + padd(s);
  if (s >= 359999) return "99:59:59";
  
  let form = new Array(3);
  
  let hour = s / 3600;
  let min = (hour * 60) - (Math.trunc(hour)*60);
  let sec = s - (Math.trunc(hour) * 3600) - (Math.trunc(min) * 60);
  
  if (sec >= 1 && sec < 60) {
    form[2] = `${padd(Math.trunc(sec))}`;
  } else if (sec == 60) {
    min++;
    form[2] = '00';
  } else {
    form[2] = '00';
  }
  
  if (min >= 1 && min < 60) {
    form[1] = `${padd(Math.trunc(min))}`;
  } else if (min == 60) {
    hour++;
    form[1] = '00';
  } else {
    form[1] = '00';
  }
  
  if (hour >= 1) {
    form[0] = `${padd(Math.trunc(hour))}`;
  } else {
    form[0] = '00';
  }
  
  return form.join(':');
}
