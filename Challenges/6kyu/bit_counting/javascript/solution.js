var countBits = function(n) {
  let counter = 0;
  
  while (n > 0) {
    if (n % 2 === 1) counter++;
    n = (n - n % 2) / 2;
  }
  
  return counter;
};