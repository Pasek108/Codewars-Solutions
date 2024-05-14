function assemblerInterpreter(program) {
  const tokens = tokenize(program)
  
  // save lines with labels
  let labels = {}
  
  for (let i = 0; i < tokens.length; i++) {
    const line = tokens[i]
    const token1 = line[0]
    
    if (token1[token1.length - 1] == ":") labels[token1] = i
  }
  
  // execute program
  let registers = {}
  let cmp_args = []
  let calls = []
  let message = ""
  let program_ended = false
  
  for (let prog_count = 0; prog_count < tokens.length; prog_count++) {
    const line = tokens[prog_count]
    const instruction = line[0]
    
    // end program
    if (instruction == "end") {
      program_ended = true;
      break
    }
    
    // mov to register
    if (instruction == "mov") {
      if (isNaN(+line[2])) registers[line[1]] = registers[line[2]]
      else registers[line[1]] = +line[2]
      
      continue
    }
    
    // increment or decrement value in register
    if (["inc", "dec"].includes(instruction)) {
      registers[line[1]] += ((instruction == "inc") ? 1 : -1)
      
      continue
    }
    
    // add, substract, multiply or divide to value in register
    if (["add", "sub", "mul", "div"].includes(instruction)) {
      let arg2 = (isNaN(+line[2])) ? +registers[line[2]] : +line[2] 
      
      switch (instruction) {
        case "add": registers[line[1]] += arg2; break
        case "sub": registers[line[1]] -= arg2; break
        case "mul": registers[line[1]] *= arg2; break
        case "div": registers[line[1]] = Math.floor(registers[line[1]] / arg2); break
      }
      
      continue
    }
    
    // compare values
    if (instruction == "cmp") {
      cmp_args = [
        (isNaN(+line[1])) ? +registers[line[1]] : +line[1],
        (isNaN(+line[2])) ? +registers[line[2]] : +line[2]
      ]
 
      continue
    }
    
    // jumps
    if (["jmp", "jne", "je", "jge", "jg", "jle", "jl"].includes(instruction)) {
      let condition_true = false
      
      switch (instruction) {
        case "jmp": condition_true = true; break
        case "jne": condition_true = (cmp_args[0] != cmp_args[1]); break
        case "je":  condition_true = (cmp_args[0] == cmp_args[1]); break
        case "jge": condition_true = (cmp_args[0] >= cmp_args[1]); break
        case "jg":  condition_true = (cmp_args[0] >  cmp_args[1]); break
        case "jle": condition_true = (cmp_args[0] <= cmp_args[1]); break
        case "jl":  condition_true = (cmp_args[0] <  cmp_args[1]); break
      }
      
      if (condition_true) {
        const label_name = line[1] + ":"
        prog_count = labels[label_name]
      }
      
      continue
    }
    
    // call subroutine
    if (instruction == "call") {
      calls.push(prog_count)
      
      const label_name = line[1] + ":"
      prog_count = labels[label_name]
      
      continue
    }
    
    // return from subroutine
    if (instruction == "ret") {
      prog_count = calls.pop()
      
      continue
    }
    
    // message to return
    if (instruction == "msg") {
      message = ""
      
      for (let i = 1; i < line.length; i++) {
        if (line[i][0] != "\"") message += "" + registers[line[i]]
        else message += line[i].substring(1, line[i].length - 1)
      }
    }
  }
  
  return (program_ended) ? message : -1
}

function tokenize(program) {
  const lines = program.split("\n")
  let tokens = []
  
  for (const line of lines) {
    let line_tokens = []
    let txt_mode = false
    let token = ""
    
    for (let i = 0; i < line.length; i++) {
      // stop reading if comment start 
      if (line[i] == ";" && !txt_mode) break;
      
      // switch txt mode and save token if switching off
      if (line[i] == "'") {
        if (txt_mode) {
          line_tokens.push(`"${token}"`)
          token = ""
        }
        
        txt_mode = !txt_mode
        continue;
      }
      
      // save not empty token on space or comma if not reading txt 
      if ([" ", ","].includes(line[i]) && !txt_mode) {
        if (token.trim() != "") line_tokens.push(token.trim())
        token = ""
        
        continue
      }
      
      token += line[i]
    }
    
    // save last token and line tokens if they are not empty
    if (token.trim() != "") line_tokens.push(token.trim())
    if (line_tokens.length > 0) tokens.push(line_tokens)
  }
  
  return tokens
}