class Interpreter {
  constructor() {
    this.vars = {};
    this.functions = {};
  }
  
  static tokenize(program) {
    if (program === "") return [];
    
    var regex = /\s*(=>|[-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g;
    return String(program).split(regex).filter(function (s) { return !s.match(/^\s*$/); });
  }
  
  input(expr) {
    const tokens = Interpreter.tokenize(expr);
    let stack = [];
    
    // check if empty expression
    if (tokens.length == 0) return '';
    
    // check if expression is function definition
    if (tokens[0] == "fn") {
      if (this.parseFunctionDefinition(tokens)) throw new Error('ERROR: Invalid function')
      else return '';
    }

    // check expression from back
    for (let i = tokens.length - 1; i >= 0; i--) {
      // -------- check if number --------
      if (!isNaN(tokens[i])) {
        stack.push(tokens[i]);
        continue;
      }
      
      // -------- check if operator -------- 
      if (tokens[i] == '*' || tokens[i] == '/' || tokens[i] == '%' || 
          tokens[i] == '+' || tokens[i] == '-') {
        stack.push(tokens[i]);
        continue;
      }
      
      // -------- check if closing bracket -------- 
      if (tokens[i] == ')') {
        stack.push(tokens[i]);
        continue;
      }
      
      // -------- check if opening bracket, evaluate inside of brackets -------- 
      if (tokens[i] == '(') {
        // get everything between brackets
        let brackets_expression = [];
        while (stack[stack.length - 1] != ')') brackets_expression.push(stack.pop());

        // evaluate expression
        brackets_expression = this.calcMultiplicative(brackets_expression);
        brackets_expression = this.calcAdditive(brackets_expression);

        // if there is number in front of brackets multiply reslut by this number
        if (i > 0 && !isNaN(tokens[i - 1])) brackets_expression[0] *= +tokens[i-- - 1];
        
        // replace closing bracket with result 
        stack[stack.length - 1] = +brackets_expression[0];
        continue;
      }
      
      // -------- check if variable assigment -------- 
      if (tokens[i] == '=') {
        // check if name not used by function
        if (tokens[i - 1] in this.functions) throw new Error('ERROR: Name exist as function');
        
        // get everything until closing bracket or end
        let assigment_expr = [];
        while (stack.length > 0 && stack[stack.length - 1] != ')') assigment_expr.push(stack.pop());
        
        // evaluate expression
        assigment_expr = this.calcMultiplicative(assigment_expr);
        assigment_expr = this.calcAdditive(assigment_expr);

        // save result as variable
        this.vars[tokens[i - 1]] = +assigment_expr[0];
        continue;
      }
      
      // -------- check if function call -------- 
      if (tokens[i] in this.functions) {
        let func_args = this.functions[tokens[i]].args;
        let func_body = this.functions[tokens[i]].func_expr;
        
        // read arguments for function until closing bracket or end
        let args = [];
        while (stack.length > 0 && stack[stack.length - 1] != ')') args.push(stack.pop());
        if (args.length < func_args.length) throw new Error('ERROR: Too few args');
         
        // make expression for function body
        let new_expr = "";
        
        for (let j = 0; j < func_body.length; j++) {
          // push operators, brackets and numbers
          if (func_body[j] == ')' || func_body[j] == '(' || !isNaN(func_body[j]) || 
              func_body[j] == '*' || func_body[j] == '/' || func_body[j] == '%' || 
              func_body[j] == '+' || func_body[j] == '-') new_expr += func_body[j];
          
          // replace variables in function body with arguments
          for (let k = 0; k < func_args.length; k++) {
            if (func_args[k] == func_body[j]) new_expr += args[k];
          }
        }
        
        // put back on stack unused arguments
        for (let j = func_args.length; j < args.length; j++) stack.push(+this.input(args[j]));
        
        // evaluate function expresssion and put it on stack
        stack.push(+this.input(new_expr));
        continue;
      }
      
      // -------- check if variable usage -------- 
      if (tokens[i] in this.vars) {
        stack.push(+this.vars[tokens[i]]);
        continue;
      }
      
      // -------- error if nothing higher happend -------- 
      throw new Error('ERROR: Unknown');
    }
    
    // evaluate what is left
    stack = stack.reverse();
    stack = this.calcMultiplicative(stack);
    stack = this.calcAdditive(stack);

    // on stack should be only result, return it
    return +stack[0];
  }
  
  calcMultiplicative(expr) {
    for (let i = 0; i < expr.length; i++) {
      // check if there is operator between numbers
      if (i < expr.length - 1 && !isNaN(expr[i]) && !isNaN(expr[i + 1])) {
        throw new Error('ERROR: No operator between numbers');
      }
      
      // if operator found
      if (expr[i] == '*' || expr[i] == '/' || expr[i] == '%') {
        // execute opartion and save on first number place
        if (expr[i] == '*') expr[i - 1] = +expr[i - 1] * +expr[i + 1];
        if (expr[i] == '/') expr[i - 1] = +expr[i - 1] / +expr[i + 1];
        if (expr[i] == '%') expr[i - 1] = +expr[i - 1] % +expr[i + 1];

        // delete operator and 2nd number by moving next element forward
        for (let j = 0; i + j + 2 < expr.length; j++) expr[i + j] = expr[i + j + 2];
        expr.length = expr.length - 2;
        i--;
      }
    }

    // return expression after multiplicative operations
    return expr;
  }
  
  calcAdditive(expr) {
    for (let i = 0; i < expr.length; i++) {
      // if operator found
      if (expr[i] == '+' || expr[i] == '-') {
        // execute opartion and save on first number place
        if (expr[i] == '+') expr[i - 1] = +expr[i - 1] + +expr[i + 1];
        if (expr[i] == '-') expr[i - 1] = +expr[i - 1] - +expr[i + 1];

        // delete operator and 2nd number by moving next element forward
        for (let j = 0; i + j + 2 < expr.length; j++) expr[i + j] = expr[i + j + 2];
        expr.length = expr.length - 2;
        i--;
      }
    }

    // return expression after additive operations
    return expr;
  }
  
  parseFunctionDefinition(tokens) {
    // check if name not used by variable
    if (tokens[1] in this.vars) throw new Error('ERROR:  Name exist as variable');
      
    // read arguments and function body
    let args_end = false;
    let args = [];
    let func_expr = [];
      
    for (let i = 2; i < tokens.length; i++) {
      // arguments end at "=>"
      if (tokens[i] == "=>") args_end = true;
        
      if (!args_end) {
        // save args if they dont duplicate
        if (args.includes(tokens[i])) throw new Error('ERROR: Argument name duplication');
        args.push(tokens[i]);
      } else {
        // skip "=>"
        if (tokens[i] == '=>') continue;
        
        // save operators and numbers
        if (tokens[i] == ')' || tokens[i] == '(' || !isNaN(tokens[i]) || 
            tokens[i] == '*' || tokens[i] == '/' || tokens[i] == '%' || 
            tokens[i] == '+' || tokens[i] == '-') {
          func_expr.push(tokens[i]);
          continue;
        }
          
        // if used variable is not in arguments return 1 (= error), else save it to function body
        if (!args.includes(tokens[i])) return 1;
        func_expr.push(tokens[i]);
      }
    }
      
    // save function args and body
    this.functions[tokens[1]] = {args, func_expr};
    
    // return 0 (= no errors)
    return 0;
  }
}