def format_duration(seconds):
    if seconds == 0: return "now"

    names = ["second", "minute", "hour", "day", "year"]
    limit = [      60,       60,     24,   365        ]
    value = [ seconds,        0,      0,     0,      0]
    
    for i in range(len(value) - 1):
        [value[i + 1], value[i]] = divmod(value[i], limit[i])
        
    result = []
    
    for key, val in enumerate(value):
        if val == 0: continue
        result.append(f"{val} {names[key]}{'s' if (val > 1) else ''}")
        
    if len(result) > 1: 
        result[0] = f"{result[1]} and {str(result.pop(0))}"

    return ", ".join(reversed(result))