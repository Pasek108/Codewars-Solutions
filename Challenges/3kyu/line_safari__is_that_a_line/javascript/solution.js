function line(grid) {
  // deep copy grids
  const grid_copy1 = JSON.parse(JSON.stringify(grid))
  const grid_copy2 = JSON.parse(JSON.stringify(grid))
  
  // check if line is correct from any side
  return check(grid_copy1, "front") || check(grid_copy2, "back");
}

function check(grid, type) {
  let position = []
  let direction = []
  
  // values for searhcing 'X' from front
  let start = [0, 0] 
  let end = [grid.length - 1, grid[0].length - 1]
  let func = (a, b) => a <= b 
  let iter = 1
  
  // values for searhcing 'X' from back
  if (type == "back") {
    start = [grid.length - 1, grid[0].length - 1]
    end = [0, 0]
    func = (a, b) => a >= b
    iter = -1
  }

  // search for 'X'
  for (let i = start[0]; func(i, end[0]); i += iter) {
    for (let j = start[1]; func(j, end[1]); j += iter) {
      if (grid[i][j] == "X") {
        grid[i][j] = " "
        
        position[0] = i
        position[1] = j
        
        i = end[0]
        j = end[1]
        
        break
      }
    }
  }

  // find dirrection to move
  const start_directions = [[0, -1], [1, 0], [0, 1], [-1, 0]]
  let direction_found = false
  let start_position = []
  
  // check all sides
  for (let k = 0; k < 4; k++) {
    // calc side position
    const x = position[0] + start_directions[k][0]
    const y = position[1] + start_directions[k][1]

    // if position out of bound, skip it
    if (x < 0 || x >= grid.length) continue
    if (y < 0 || y >= grid[0].length) continue

    // if there is something on side
    if (grid[x][y] != " ") {
      // if we can't go on position in that dirrection, skip it
      if (Math.abs(start_directions[k][0]) == 1 && grid[x][y] == "-") continue
      if (Math.abs(start_directions[k][1]) == 1 && grid[x][y] == "|") continue

      // if dirrection was already found there is more than 1 way so it's incorrect
      if (direction_found) return false

      // save position and dirrection
      start_position = [x, y]
      direction = start_directions[k]
      direction_found = true
    }
  }
  
  // if position not found there is no move so it's incorrect
  if (!direction_found) return false
  position = start_position

  // save value of current position
  let value = grid[position[0]][position[1]]

  // follow the path until next 'X'
  while (value != "X") {
    // straight path 
    if (value == "-" || value == "|") {
      grid[position[0]][position[1]] = " "
      
      const wrong_next_step = (value == "-") ? "|" : "-"
      
      // calc next position
      const x = position[0] + direction[0]
      const y = position[1] + direction[1]
      
      // if position out of bound it means path is incorrect
      if (x < 0 || x >= grid.length) return false
      if (y < 0 || y >= grid[0].length) return false
      
      // go to next position
      value = grid[x][y]
      position = [x, y]
      
      // if next step is wrong or empty it means path is incorrect
      if (value == wrong_next_step || value == " ") return false
      
      continue
    }
    
    // corner
    if (value == "+") {
      grid[position[0]][position[1]] = " "
      
      // change side
      const sides = (Math.abs(direction[0]) == 1) ? [[0, -1], [0, 1]] : [[1, 0], [-1, 0]]
      let found = false
      let val, pos, dir
      
      // check possible sides
      for (let k = 0; k < 2; k++) {
        // calc side position
        const x = position[0] + sides[k][0]
        const y = position[1] + sides[k][1]
        
        // if position out of bound, skip it
        if (x < 0 || x >= grid.length) continue
        if (y < 0 || y >= grid[0].length) continue
          
        // if there is something on side
        if (grid[x][y] != " ") {
          // if dirrection was already found there is more than 1 way so it's incorrect
          if (found) return false
          
          // save values
          val = grid[x][y]
          pos = [x, y]
          dir = sides[k]
          found = true
        }
      }
      
      // if no way found its incorrect, if 
      if (!found) return false
      
      // go to next position and save its dirrection
      value = val
      position = pos
      direction = dir
    }
  }
  
  grid[position[0]][position[1]] = " "
  
  // if grid is no empty after following path 
  // there was something unnecessary and its incorrect
  for (let i = start[0]; func(i, end[0]); i += iter) {
    for (let j = start[1]; func(j, end[1]); j += iter) {
      if (grid[i][j] != " ") return false
    }
  }
  
  return true;
}