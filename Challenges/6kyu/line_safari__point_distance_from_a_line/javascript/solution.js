var distanceFromLine = function(a, b, c) {
  // if A == B return distance C to A
  if (a[1] == b[1] && a[0] == b[0]) {
    return Math.sqrt((c[0] - a[0])**2 + (c[1] - a[1])**2)
  }
  
  // if line AB is horizontal or veritcal return distance C to AB on C x or y
  if (a[1] == b[1]) return Math.sqrt((c[0] - c[0])**2 + (c[1] - b[1])**2)
  if (a[0] == b[0]) return Math.sqrt((c[0] - b[0])**2 + (c[1] - c[1])**2)
  
  // calculate values for AB line equation
  const A1 = ((a[1] - b[1]) / (a[0] - b[0]))
  const B1 = (a[1] - A1 * a[0])
  
  // calculate values for perpendicular C to AB line equation
  const A2 = -1 / A1
  const B2 = c[1] - A2 * c[0]
  
  // calculate common point for lines
  const x = (B1 - B2) / ((A1 - A2) * -1)
  const y = A1 * x + B1
  
  // return discance beetwen C and common point
  return Math.sqrt((c[0] - x)**2 + (c[1] - y)**2)
}