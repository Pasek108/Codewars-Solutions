module LettersBestFriend (bestFriend) where

bestFriend :: String -> Char -> Char -> Bool
bestFriend [] a b = True
bestFriend [x] a b = x /= a
bestFriend (x:x':xs) a b 
  | x == a && x' /= b = False
  | otherwise = bestFriend (x':xs) a b