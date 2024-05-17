def strip_comments(strng, markers):
    strng = strng.split("\n")

    for i in range (len(strng)):
        line = ""

        for j in range (len(strng[i])):
            if (strng[i][j] in markers): break
            line += strng[i][j]
    
        strng[i] = line.rstrip()
        
    return "\n".join(strng)