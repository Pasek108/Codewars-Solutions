function flickSwitch(arr){
  let flick = true;
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "flick") flick = !flick
    arr[i] = flick
  }
  
  return arr
}