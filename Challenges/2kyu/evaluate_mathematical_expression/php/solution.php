function calc(string $expr): float {
  $stack = [];

  for ($i = strlen($expr) - 1; $i >= 0; $i--) {
    if ($expr[$i] >= '0' && $expr[$i] <= '9') {
      $number = readNumber($expr, $i);
      array_push($stack, $number[0]);
      $i = $number[1];
    }
    
    if ($expr[$i] == '+' || 
        $expr[$i] == '-' || 
        $expr[$i] == '*' || 
        $expr[$i] == '/') array_push($stack, $expr[$i]);
    
    if ($expr[$i] == ')') array_push($stack, $expr[$i]);
    if ($expr[$i] == '(') {
      $arr = [];

      while ($stack[count($stack) - 1] != ')') array_push($arr, array_pop($stack));

      $arr = makeMulAndDiv($arr);
      $arr = makeAddAndSub($arr);
      
      if ($expr[$i - 1] == '-') {
        $arr[0] = -$arr[0];
        $i--;
      }

      $stack[count($stack) - 1] = $arr[0];
    }
  }
  
  $stack = array_reverse($stack);
  $stack = makeMulAndDiv($stack);
  $stack = makeAddAndSub($stack);
  
  return $stack[0];
}

function readNumber($expr, $start_i) {
  $multiplier = 1;
  $n = 0;
  
  for ($i = $start_i; $i >= 0; $i--) {
    if ($expr[$i] >= '0' && $expr[$i] <= '9') $n += $multiplier * +$expr[$i];
    else if ($expr[$i] == '.') {
      $n = $n / $multiplier;
      $multiplier = 1;
      continue;
    }
    else {
      if ($expr[$i] == '-') return [-$n, $i - 1];
      return [$n, $i];
    }
    
    $multiplier *= 10;
  }
  
  return [$n, 0];
}

function makeMulAndDiv($arr) {
  for ($i = 0; $i < count($arr); $i++) {
    if ($arr[$i] == '*' || $arr[$i] == '/') {
      if ($arr[$i] == '*') $arr[$i - 1] = $arr[$i - 1] * $arr[$i + 1];
      if ($arr[$i] == '/') $arr[$i - 1] = $arr[$i - 1] / $arr[$i + 1];
      
      for ($j = 0; $i + $j + 2 < count($arr); $j++) $arr[$i + $j] = $arr[$i + $j + 2];
      array_pop($arr);
      array_pop($arr);
      $i--;
    }
  }
  
  return $arr;
}

function makeAddAndSub($arr) {
  for ($i = 0; $i < count($arr); $i++) {
    if ($arr[$i] == '+' || $arr[$i] == '-') {
      if ($arr[$i] == '+') $arr[$i - 1] = $arr[$i - 1] + $arr[$i + 1];
      if ($arr[$i] == '-') $arr[$i - 1] = $arr[$i - 1] - $arr[$i + 1];
      
      for ($j = 0; $i + $j + 2 < count($arr); $j++) $arr[$i + $j] = $arr[$i + $j + 2];
      array_pop($arr);
      array_pop($arr);
      $i--;
    } else if ($i + 1 < count($arr) && $arr[$i + 1] != '+' && $arr[$i + 1] != '-') {
      $arr[$i] = $arr[$i] + $arr[$i + 1];
      
      for ($j = 1; $i + $j + 1 < count($arr); $j++) $arr[$i + $j] = $arr[$i + $j + 1];
      array_pop($arr);
    }
  }
  
  return $arr;
}