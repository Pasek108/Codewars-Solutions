function simple_assembler(program) {
  /* return a dictionary with the registers */
  let map = {};
  
  for (let i = 0; i < program.length; i++) {
    let tokens = program[i].split(" ");

    switch (tokens[0]) {
        case "mov": {
          if (tokens[2] >= "a" && tokens[2] <= "z") map[tokens[1]] = +map[tokens[2]]
          else map[tokens[1]] = +tokens[2]; 
        } break;
        case "inc": map[tokens[1]] += 1; break;
        case "dec": map[tokens[1]] -= 1; break;
        case "jnz": {
          if (tokens[1] >= "a" && tokens[1] <= "z") {
            if (map[tokens[1]]) {
              if (tokens[2] >= "a" && tokens[2] <= "z")  i += +map[tokens[2]] - 1;
              else i += tokens[2] - 1; 
            }
          }
          else {
            if (tokens[1]) {
              if (tokens[2] >= "a" && tokens[2] <= "z")  i += +map[tokens[2]] - 1;
              else i += tokens[2] - 1; 
            }
          }
        } break;
    }
  }
  
  return map;
}