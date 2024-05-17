def solution(args):
    scopes = []
    scope = [args[0], args[0]]
    
    for i in range(1, len(args)):
        diff = args[i] - args[i - 1]

        if diff == 1: scope[1] = args[i]
        elif diff > 1:
            scopes.append(getRangeStr(scope))
            scope = [args[i], args[i]]

    scopes.append(getRangeStr(scope))
    
    return ",".join(str(n) for n in scopes)

def getRangeStr(scope):
    diff = scope[1] - scope[0]
    
    if diff == 0: return str(scope[0])
    if diff == 1: return ",".join(str(n) for n in scope)

    return "-".join(str(n) for n in scope)