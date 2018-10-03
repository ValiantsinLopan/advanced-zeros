module.exports = function getZerosCount(number, base) {
  let primeFactors = [];

  var smallestFactor = function (n) {
    if (n % 2 == 0)
      return 2;
    let end = Math.floor(Math.sqrt(n));
    for (let i = 3; i <= end; i += 2) {
      if (n % i == 0)
        return i;
    }
    return n;
  }

  while (base != 1) {
    let factor = smallestFactor(base);
    primeFactors.push(factor);
    base /= factor;
  }

  let zerosPerFactor = [];
  let uniquePrimeFactors = Array.from(new Set(primeFactors));
  for (i in uniquePrimeFactors) {
    zerosPerFactor[i] = 0;
    let power = primeFactors.filter(p => p === uniquePrimeFactors[i]).length;

    for (let j = uniquePrimeFactors[i]; j < number; j *= uniquePrimeFactors[i]) {
      // TODO: fix round issue for test '99'
      zerosPerFactor[i] += Math.floor(number / j) / power;
    }
  }
  
  return Math.trunc(Math.min.apply(Math, zerosPerFactor));
}