class Interpreter {
  constructor() {
    this.vars = {};
  }
  
  static tokenize(program) {
    const regex = /\s*([-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g;
    return program.split(regex).filter(s => /\S/.test(s));
  }
  
  input(expr) {
    const tokens = Interpreter.tokenize(expr);
    if (tokens.length == 0) return '';

    let stack = [];
    
    for (let i = tokens.length - 1; i >= 0; i--) {
      if (!isNaN(tokens[i])) {
        if (stack.length > 0 && !isNaN(stack[stack.length - 1])) stack[stack.length - 1] *= +tokens[i]
        else stack.push(tokens[i]);
        
        continue;
      }
      
      if (tokens[i] == '*' || tokens[i] == '/' || tokens[i] == '%' || 
          tokens[i] == '+' || tokens[i] == '-') {
        stack.push(tokens[i]);
        continue;
      }
      
      if (tokens[i] == ')') {
        stack.push(tokens[i]);
        continue;
      }
      
      if (tokens[i] == '(') {
        let arr = [];
        while (stack[stack.length - 1] != ')') arr.push(stack.pop());

        arr = this.calcMultiplicative(arr);
        arr = this.calcAdditive(arr);

        stack[stack.length - 1] = arr[0];
        continue;
      }
      
      if (tokens[i] == '=') {
        stack = stack.reverse();
        stack = this.calcMultiplicative(stack);
        stack = this.calcAdditive(stack);

        this.vars[tokens[i - 1]] = +stack.pop();
        continue;
      }
      
      if (!(tokens[i] in this.vars)) throw new Error('ERROR: Invalid identifier');
      stack.push(+this.vars[tokens[i]]);
    }
    
    stack = stack.reverse();
    stack = this.calcMultiplicative(stack);
    stack = this.calcAdditive(stack);

    return stack[0];
  }
  
  calcMultiplicative(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == '*' || arr[i] == '/' || arr[i] == '%') {
        if (arr[i] == '*') arr[i - 1] = +arr[i - 1] * +arr[i + 1];
        if (arr[i] == '/') arr[i - 1] = +arr[i - 1] / +arr[i + 1];
        if (arr[i] == '%') arr[i - 1] = +arr[i - 1] % +arr[i + 1];

        for (let j = 0; i + j + 2 < arr.length; j++) arr[i + j] = arr[i + j + 2];
        arr.length = arr.length - 2;
        i--;
      }
    }

    return arr;
  }
  
  calcAdditive(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == '+' || arr[i] == '-') {
        if (arr[i] == '+') arr[i - 1] = +arr[i - 1] + +arr[i + 1];
        if (arr[i] == '-') arr[i - 1] = +arr[i - 1] - +arr[i + 1];

        for (let j = 0; i + j + 2 < arr.length; j++) arr[i + j] = arr[i + j + 2];
        arr.length = arr.length - 2;
        i--;
      }
    }

    return arr;
  }
}