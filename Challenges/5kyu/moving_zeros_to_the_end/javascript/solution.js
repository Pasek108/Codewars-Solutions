function moveZeros(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      let arr2 = arr.slice(i + 1);
      arr.splice(i, arr.length);
      arr = arr.concat(arr2, 0);
      if (arr2.find(n => n != 0)) i--;
    }
  }

  return arr;
}