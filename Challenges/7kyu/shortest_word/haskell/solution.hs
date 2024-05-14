module FindShortest (find_shortest) where

find_shortest :: String -> Integer
find_shortest str = toInteger (get_min (words str))

get_min :: [String] -> Int
get_min [x] = length x
get_min (x:xs) = min (length x) (get_min xs)