function padovan(n) {
  let p = [1, 1, 1];
  for (let i = 2; i < n; i++) p = [p[1], p[2], p[0] + p[1]];
  return p[2];
}