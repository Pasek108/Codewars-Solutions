def rgb(r, g, b):
    hex = ""
    
    hex += byteToHex(r)
    hex += byteToHex(g)
    hex += byteToHex(b)

    return hex
    pass

def byteToHex(byte):
  digits = "0123456789ABCDEF"
  hex = ""
  
  byte = 0 if byte < 0 else 255 if byte > 255 else byte
  hex += digits[int((byte - (byte % 16)) / 16)]
  hex += digits[int(byte % 16)]
  
  return hex