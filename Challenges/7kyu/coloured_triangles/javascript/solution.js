function triangle(row) {
  if (row.length == 1) return row[0];
  
  let next_row = [];
  
  for (let i = 0; i < row.length - 1; i++) {
    switch (row[i]) {
      case 'R': {
        switch (row[i + 1]) {
          case 'R': next_row.push('R'); break;
          case 'G': next_row.push('B'); break;
          case 'B': next_row.push('G'); break;
        }
      } break;
          
      case 'G': {
        switch (row[i + 1]) {
          case 'R': next_row.push('B'); break;
          case 'G': next_row.push('G'); break;
          case 'B': next_row.push('R'); break;
        }
      } break;
          
      case 'B': {
        switch (row[i + 1]) {
          case 'R': next_row.push('G'); break;
          case 'G': next_row.push('R'); break;
          case 'B': next_row.push('B'); break;
        }
      } break;
    }
  }
  
  return triangle(next_row)
}