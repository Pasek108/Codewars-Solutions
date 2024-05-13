function multiply(a, b) {
  let result = [];
  let a_pow = 0;
  
  for (let i = a.length - 1; i >= 0; i--) {
    let b_pow = 0;
    
    for (let j = b.length - 1; j >= 0; j--) {
      let num = +a[i] * +b[j];
      
      if (result.length < a_pow + b_pow + 2) result.push("0", "0");
      
      let n1 = +result[a_pow + b_pow] + num % 10;
      let n2 = +result[a_pow + b_pow + 1] + ((num / 10) | 0);
      
      if (n1 > 9) {
        n2 += ((n1 / 10) | 0);
        n1 = n1 % 10;
      }
      
      result[a_pow + b_pow] = `${n1}`;
      result[a_pow + b_pow + 1] = `${n2}`;
      
      b_pow++;
    }
    
    a_pow++;
  }
  
  result = result.reverse().join("").replace(/^0+/, '');
  if (result.length == 0) result = "0";
  
  return result;
}