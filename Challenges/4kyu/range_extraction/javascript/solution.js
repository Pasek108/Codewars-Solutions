function solution(list){
  let ranges = []
  let range = [list[0], list[0]]
  
  for (let i = 1; i < list.length; i++) {
    const diff = list[i] - list[i - 1] 

    if (diff === 1) range[1] = list[i]
    else if (diff > 1) {
      ranges.push(getRangeStr(range))
      range = [list[i], list[i]]
    }
  }
  
  ranges.push(getRangeStr(range))
  
  return ranges.join(",")
}

function getRangeStr(range) {
  const diff = range[1] - range[0]
  
  if (diff === 0) return "" + range[0]
  if (diff === 1) return range.join(",")
  
  return range.join("-")
}