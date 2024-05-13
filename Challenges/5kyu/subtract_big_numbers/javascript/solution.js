function subtract(a, b) {
  a = a.replace(/^0+/, '');
  b = b.replace(/^0+/, '');
  
  if (a.length < b.length) a = a.padStart(b.length, "0");
  b = b.padStart(a.length, "0");
  
  let minus = false;
      
  for (let i = 0; i < a.length; i++) {
    if (+a[i] == +b[i]) continue;
    
    minus = +a[i] < +b[i];
    if (minus) [a, b] = [b, a];
    break;
  }
  
  let result = ("0" + a).split("");
  let sub = "0" + b;
  
  for (let i = result.length - 1; i >= 0; i--) {
    let num = +result[i] - +sub[i];
    result[i] = `${num}`;

    if (num < 0) {
      for (let j = i; j > 0 && +result[j] < 0; j--) {
        result[j] = `${10 + +result[j]}`;
        result[j - 1] = `${+result[j - 1] - 1}`;
      }
    }
  }
   
  result = result.join("").replace(/^0+/, '');
  return (result.length == 0) ? "0" : ((minus) ? "-" : "") + result;
}