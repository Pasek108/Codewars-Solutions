function solution(array $list): string
{
  $ranges = [];
  $range = [$list[0], $list[0]];
  
  for ($i = 1; $i < count($list); $i++) {
    $diff = $list[$i] - $list[$i - 1];

    if ($diff === 1) $range[1] = $list[$i];
    else if ($diff > 1) {
      $ranges[] = getRangeStr($range);
      $range = [$list[$i], $list[$i]];
    }
  }

  $ranges[] = getRangeStr($range);
  
  return implode(",", $ranges);
}

function getRangeStr(array $range):string {
  $diff = $range[1] - $range[0];
  
  if ($diff === 0) return strval($range[0]);
  if ($diff === 1) return implode(",", $range);
  
  return implode("-", $range);
}