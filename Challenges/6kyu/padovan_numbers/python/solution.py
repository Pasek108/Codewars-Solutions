def padovan(n):
    p = [1, 1, 1]
    for i in range(2, n): 
        p = [p[1], p[2], p[0] + p[1]]
    
    return p[2]
    pass