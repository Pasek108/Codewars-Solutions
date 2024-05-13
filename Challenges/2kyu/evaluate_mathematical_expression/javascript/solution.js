function calc(expr) {
  let stack = [];

  for (let i = expr.length - 1; i >= 0; i--) {
    if (expr[i] >= '0' && expr[i] <= '9') {
      let number = readNumber(expr, i);
      stack.push(number[0]);
      i = number[1];
    }
    
    if (expr[i] == '+' || 
        expr[i] == '-' || 
        expr[i] == '*' || 
        expr[i] == '/') stack.push(expr[i]);
    
    if (expr[i] == ')') stack.push(expr[i]);
    if (expr[i] == '(') {
      let arr = [];
      
      while (stack[stack.length - 1] != ')') arr.push(stack.pop());

      arr = evalMulAndDiv(arr);
      arr = evalAddAndSub(arr);
      
      if (expr[i - 1] == '-') {
        arr[0] = -arr[0];
        i--;
      }
      
      stack[stack.length - 1] = arr[0];
    }
  }
  
  stack = stack.reverse();
  stack = evalMulAndDiv(stack);
  stack = evalAddAndSub(stack);
  
  return stack[0];
};

function readNumber(expr, start_i) {
  let multiplier = 1;
  let n = 0;
  
  for (let i = start_i; i >= 0; i--) {
    if (expr[i] >= '0' && expr[i] <= '9') n += multiplier * +expr[i];
    else if (expr[i] == '.') {
      n = n / multiplier;
      multiplier = 1;
      continue;
    }
    else {
      if (expr[i] == '-') return [-n, i - 1];
      return [n, i];
    }
    
    multiplier *= 10;
  }
  
  return [n, 0];
}

function evalMulAndDiv(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == '*' || arr[i] == '/') {
      if (arr[i] == '*') arr[i - 1] = arr[i - 1] * arr[i + 1];
      if (arr[i] == '/') arr[i - 1] = arr[i - 1] / arr[i + 1];
      
      for (let j = 0; i + j + 2 < arr.length; j++) arr[i + j] = arr[i + j + 2];
      arr.length = arr.length - 2;
      i--;
    }
  }
  
  return arr;
}

function evalAddAndSub(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == '+' || arr[i] == '-') {
      if (arr[i] == '+') arr[i - 1] = arr[i - 1] + arr[i + 1];
      if (arr[i] == '-') arr[i - 1] = arr[i - 1] - arr[i + 1];
      
      for (let j = 0; i + j + 2 < arr.length; j++) arr[i + j] = arr[i + j + 2];
      arr.length = arr.length - 2;
      i--;
    } else if (i + 1 < arr.length && arr[i + 1] != '+' && arr[i + 1] != '-') {
      arr[i] = arr[i] + arr[i + 1];
      
      for (let j = 1; i + j + 1 < arr.length; j++) arr[i + j] = arr[i + j + 1];
      arr.length = arr.length - 1;
    }
  }
  
  return arr;
}