import math

def sudoku(puzzle):
    sudoku_size = len(puzzle) * len(puzzle[0])
    
    i = 0
    while i < sudoku_size:
        col = math.floor(i / len(puzzle))
        row = i % len(puzzle)
        
        if puzzle[col][row] != 0: 
            i = i + 1
            continue
        
        possible_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        start_x = math.floor(col / 3) * 3
        start_y = math.floor(row / 3) * 3
        
        # check square and vertical and horizontal lines
        for j in range(9):
            x = math.floor(j / 3)
            y = j % 3

            square = puzzle[start_x + x][start_y + y]
            vertical = puzzle[col][j]
            horizontal = puzzle[j][row]

            if square != 0: possible_numbers[square - 1] = None
            if vertical != 0: possible_numbers[vertical - 1] = None
            if horizontal != 0: possible_numbers[horizontal - 1] = None
        
        # save number if only one possibile
        numbers = []
        
        for k in range(9):
            if possible_numbers[k] == None: continue
            numbers.append(possible_numbers[k]) 
        
        print(numbers)
        
        if len(numbers) == 1:
            puzzle[col][row] = numbers[0]
            i = -1
            
        i = i + 1
    
    return puzzle