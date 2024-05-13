function rgb($r, $g, $b) {
  $hex = "";
  
  $hex .= byteToHex($r);
  $hex .= byteToHex($g);
  $hex .= byteToHex($b);
  
  return $hex;
}

function byteToHex($byte) {
  $digits = "0123456789ABCDEF";
  $hex = "";
  
  $byte = ($byte < 0) ? 0 : (($byte > 255) ? $byte = 255 : $byte);
  $hex .= $digits[($byte - ($byte % 16)) / 16];
  $hex .= $digits[$byte % 16];
  
  return $hex;
}