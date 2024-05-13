function multiply(string $a, string $b): string {
  $result = [];
  $a_pow = 0;
  
  for ($i = strlen($a) - 1; $i >= 0; $i--) {
    $b_pow = 0;
    
    for ($j = strlen($b) - 1; $j >= 0; $j--) {
      $num = (int)$a[$i] * (int)$b[$j];
      
      if (count($result) < $a_pow + $b_pow + 2) array_push($result, "0", "0");
      
      $n1 = (int)$result[$a_pow + $b_pow] + $num % 10;
      $n2 = (int)$result[$a_pow + $b_pow + 1] + floor($num / 10);
      
      if ($n1 > 9) {
        $n2 += floor($n1 / 10);
        $n1 = $n1 % 10;
      }
      
      $result[$a_pow + $b_pow] = (string)$n1;
      $result[$a_pow + $b_pow + 1] = (string)$n2;
      
      $b_pow++;
    }
    
    $a_pow++;
  }
  
  $result = ltrim(implode(array_reverse($result)), "0");
  return (strlen($result) == 0) ? "0" : $result;
}