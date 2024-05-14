function formatDuration(seconds) {
  if (seconds === 0) return "now"
  
  let unit_names = ["second", "minute", "hour", "day", "year"]
  let unit_limit = [      60,       60,     24,   365        ]
  let unit_value = [ seconds,        0,      0,     0,      0]
  
  for (let i = 0; i < unit_value.length - 1; i++) {
    unit_value[i + 1] = Math.floor(unit_value[i] / unit_limit[i])
    unit_value[i] = unit_value[i] % unit_limit[i]
  }
  
  let result = ""
  let units_counter = 0
  
  for (let i = unit_value.length - 1; i >= 0; i--) {
    if (unit_value[i] === 0) continue
    
    result += " and "
    result += `${unit_value[i]} ${unit_names[i]}`
    result += (unit_value[i] === 1) ? "" : "s"
    
    units_counter++
  }

  result = result.replace(" and ", "")
  for (let i = 0; i < units_counter - 2; i++) result = result.replace(" and ", ", ")

  return result
}
