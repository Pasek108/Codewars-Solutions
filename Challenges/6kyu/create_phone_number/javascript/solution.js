function createPhoneNumber(numbers){
  let phone_number = "";
  
  numbers.forEach((n, i) => {
    if (i === 0) phone_number += "(";
    phone_number += n;
    if (i === 2) phone_number += ") ";
    if (i === 5) phone_number += "-";
  });
  
  return phone_number;
}