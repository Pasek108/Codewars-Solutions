function sumOfDivided(lst) {
  let arr = [];
  let prime_factors = findPrimeFactors(lst);
  
  prime_factors.forEach(n => {
    let no_sum = true;
    
    let sum = lst.reduce((acc, val) => {
      if (val % n === 0) {
        no_sum = false;
        return acc + val; 
      } else return acc + 0;
    }, 0);
    
    if (!no_sum) arr.push([n, sum]);
  })

  return arr;
}

function findPrimeFactors(lst) {
  let prime_factors = [];
  
  const lst_copy = lst.map(val => (val < 0) ? -val : val );
  const max = Math.max(...lst_copy);
  
  for (let i = 2; i <= max; i += 2) {
    let is_prime = true;
    
    for (let j = 2; j <= Math.sqrt(i); j++) (i % j === 0) ? is_prime = false : "";
    
    if (is_prime) prime_factors.push(i);
    if (i === 2) i--;
  }

  return prime_factors;
}