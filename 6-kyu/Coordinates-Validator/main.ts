export function isValidCoordinates(coordinates:string):boolean{
  // @ts-ignore
  if (coordinates.replace(/^(\d*|\-\d+)(\.\d+\,|\,\d*)(\ |\ \-)\d+(\.\d*|\d*)$/gm, '') != '') {
    return false;
  }
  
  const a = parseInt(coordinates.split(', ')[0])
  const b = parseInt(coordinates.split(', ')[1])
  
  if (a >= -90 && a <= 90 && b >= -180 && b <= 180) {
    return true;
  }
  
  return false; // do your thing!
}
