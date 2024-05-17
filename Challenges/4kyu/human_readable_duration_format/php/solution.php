function format_duration($seconds) {
  if ($seconds == 0) return "now";
  
  $names = ["second", "minute", "hour", "day", "year"];
  $limit = [      60,       60,     24,   365        ];
  $value = [$seconds,        0,      0,     0,      0];
  
  for ($i = 0; $i < count($value) - 1; $i++) {
    $value[$i + 1] = floor($value[$i] / $limit[$i]);
    $value[$i] = $value[$i] % $limit[$i];
  }
  
  $result = [];
  
  foreach ($value as $key => $val) {
    if ($val == 0) continue;
    
    $unit = "{$val} {$names[$key]}";
    $result[] = ($val > 1) ? $unit."s" : $unit;
  }
  
  if (count($result) > 1) $result[0] .= " and " . array_shift($result);

  return implode(", ", array_reverse($result));
}