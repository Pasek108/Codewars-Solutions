snail = function(array) {
  let snail = array[0];
  let move = [1, 0];
  let pos = [1, array[0].length - 1]
  let step = (array[0].length - 1) * 2;
  
  for (let i = 1; step > 0; i++) {
    snail.push(array[pos[0]][pos[1]]);
    
    if (i % Math.round(step / 2) == 0) {
      step--;
      i = 0;
      
      switch (move.toString()) {
          case "0,1":  move = [1,  0]; break;
          case "1,0":  move = [0, -1]; break;
          case "0,-1": move = [-1, 0]; break;
          case "-1,0": move = [0,  1]; break;
      }
    }  
    
    pos[0] += move[0];
    pos[1] += move[1];
  }
  
  return snail;
}