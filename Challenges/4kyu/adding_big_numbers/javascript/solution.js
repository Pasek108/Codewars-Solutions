function add(a, b) {
  let result = "0" + ((a.length > b.length) ? a : b);
  result = result.split("");
  
  let add = ((a.length > b.length) ? b : a);
  add = add.padStart(result.length, "0");
  
  for (let i = result.length - 1; i >= 0; i--) {
    let num = +result[i] + +add[i];
    
    result[i] = `${num % 10}`;
    result[i - 1] = `${+result[i - 1] + ((num > 9) ? ((num / 10) | 0) : 0)}`;
  }
  
  result = result.join("").replace(/^0+/, '');
  if (result.length == 0) result = "0";
  
  return result;
}