function binToDec(bin) {
  let sum = 0, multiplier = 1;
  
  for (let i = bin.length - 1; i >= 0; i--) {
    if (bin[i] == 1) sum += multiplier;
    multiplier *= 2;
  }
  
  return sum;
}