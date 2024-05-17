module Divisors where

divisors :: (Show a, Integral a) => a -> Either String [a]
divisors n | length factors == 0 = Left $ show n ++ " is prime"
           | otherwise = Right factors
           where factors = [x | x <- [2..n-1], mod n x == 0]