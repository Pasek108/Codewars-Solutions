export function rgb(r: number, g: number, b: number): string {
  let hex = "";
  
  hex += byteToHex(r);
  hex += byteToHex(g);
  hex += byteToHex(b);
  
  return hex;
}

function byteToHex(byte:number):string {
  let digits = "0123456789ABCDEF";
  let hex = "";
  
  byte = (byte < 0) ? 0 : (byte > 255) ? byte = 255 : byte;
  hex += digits[(byte - (byte % 16)) / 16];
  hex += digits[byte % 16];
  
  return hex;
}