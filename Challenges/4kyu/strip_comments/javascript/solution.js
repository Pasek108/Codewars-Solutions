function solution(text, markers) {
  text = text.split("\n")
  
  for (let i = 0; i < text.length; i++) {
    let line = ""
    
    for (let j = 0; j < text[i].length; j++) {
      if (markers.includes(text[i][j])) break
      line += text[i][j]
    }
    
    text[i] = line.trimEnd()
  }
  
  return text.join("\n")
}