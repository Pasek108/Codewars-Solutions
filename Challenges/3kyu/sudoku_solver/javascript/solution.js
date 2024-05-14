function sudoku(puzzle) {
  let sudoku_size = puzzle.length * puzzle[0].length
  
  for (let i = 0; i < sudoku_size; i++) {
    const col = Math.floor(i / puzzle.length)
    const row = i % puzzle.length
      
    if (puzzle[col][row] != 0) continue;
    
    let possible_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const start_x = Math.floor(col / 3) * 3
    const start_y = Math.floor(row / 3) * 3
      
    // check square and vertical and horizontal lines
    for (let j = 0; j < 9; j++) {
      const x = Math.floor(j / 3)
      const y = j % 3
      
      const square = puzzle[start_x + x][start_y + y]
      const vertical = puzzle[col][j]
      const horizontal = puzzle[j][row]
       
      if (square != 0) possible_numbers[square - 1] = null
      if (vertical != 0) possible_numbers[vertical - 1] = null
      if (horizontal != 0) possible_numbers[horizontal - 1] = null
    }
      
    // save number if only one possibile
    let numbers = []
      
    for (let k = 0; k < 9; k++) {
      if (possible_numbers[k] == null) continue
      numbers.push(possible_numbers[k]) 
    }
      
    if (numbers.length == 1) {
      puzzle[col][row] = numbers[0]
      i = -1;
    }
  } 
  
  return puzzle
}