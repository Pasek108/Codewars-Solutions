var decodeBits = function(bits){
  let bits_cpy = bits.split("");
  while (bits_cpy[0] == '0') bits_cpy.shift();
  while (bits_cpy[bits_cpy.length - 1] == '0') bits_cpy.pop();
  bits_cpy = bits_cpy.join("");
  
  let min_change = 999999;
  let change_counter = 1;
  
  for (let i = 1; i <= bits_cpy.length; i++) {
    if (bits_cpy[i] == bits_cpy[i - 1]) change_counter++;
    else {
      min_change = (change_counter < min_change) ? change_counter : min_change;
      change_counter = 1;
    }
  }
  
  let morse_str = "";
  change_counter = 1;
  
  for (let i = 1; i <= bits_cpy.length; i++) {
    if (bits_cpy[i] == bits_cpy[i - 1]) change_counter++;
    else {
      if (change_counter == min_change && bits_cpy[i - 1] == '1') morse_str += '.';
      else if (change_counter == 3 * min_change) morse_str += (bits_cpy[i - 1] == '0') ? ' ' : '-';
      else if (change_counter > 3 * min_change) morse_str += '   ';
        
      change_counter = 1;
    }
  }
  
  return morse_str;
}

var decodeMorse = function(morseCode){
  let letter = "";
  let string = "";
  
  for (let i = 0; i <= morseCode.length; i++) {
    if (morseCode[i] == "." || morseCode[i] == "-") letter += morseCode[i];
    else {
      string += MORSE_CODE[letter];
      letter = "";
      
      if (i + 2 < morseCode.length && 
          morseCode[i + 1] == " " && 
          morseCode[i + 2] == " ") {
        string += " ";
        i += 2;
      }
    }
  }
  
  return string;
}