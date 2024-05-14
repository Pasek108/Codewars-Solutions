function bigSub(a, b) {
  if (typeof a == "number") a = `${a}`;
  if (typeof b == "number") b = `${b}`;
  
  if (a[0] == "-") {
    let ret = bigAdd(a.slice(1), b);
    return (ret[0] == "-") ? ret.slice(1) : "-" + ret;
  }
  if (b[0] == "-") return bigAdd(a, b.slice(1));
  
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

function bigAdd(a, b) {
  if (typeof a == "number") a = `${a}`;
  if (typeof b == "number") b = `${b}`;

  if (a[0] == "-") return bigSub(b, a.slice(1));
  if (b[0] == "-") return bigSub(a, b.slice(1));
  
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