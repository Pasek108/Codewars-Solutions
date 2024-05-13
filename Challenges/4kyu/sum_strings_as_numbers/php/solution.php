function sum_strings($a, $b) {
  $result = "0" . ((strlen($a) > strlen($b)) ? $a : $b);
  $result = str_split($result);
  
  $add = ((strlen($a) > strlen($b)) ? $b : $a);
  $add = str_pad($add, count($result), "0", STR_PAD_LEFT);
  
  for ($i = count($result) - 1; $i > 0; $i--) {
    $num = (int)$result[$i] + (int)$add[$i];
    
    $result[$i] = "".($num % 10);
    $result[$i - 1] = "".((int)$result[$i - 1] + (($num > 9) ? floor($num / 10) : 0));
  }
  
  return (count($result) == 0) ? "0" : ltrim(implode("", $result), "0");
}