function rgb(r, g, b){
  let hex = "";
  
  hex += byteToHex(r);
  hex += byteToHex(g);
  hex += byteToHex(b);
  
  return hex;
}

function byteToHex(byte) {
  let digits = "0123456789ABCDEF";
  let hex = "";
  
  byte = (byte < 0) ? 0 : (byte > 255) ? byte = 255 : byte;
  hex += digits[(byte - (byte % 16)) / 16];
  hex += digits[byte % 16];
  
  return hex;
}