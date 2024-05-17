module BasicMathematicalOperations (basicOp) where

basicOp :: Char -> Int -> Int -> Int
basicOp op n1 n2 
  | op == '+' = n1 + n2
  | op == '-' = n1 - n2
  | op == '*' = n1 * n2
  | op == '/' = n1 `div` n2