decodeMorse = function(morseCode){
  morseCode = morseCode.trim();
  
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