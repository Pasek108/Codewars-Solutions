module Sliding where

sliding :: [Int] -> Int -> [Int] 
sliding arr n | n > length arr = []
              | otherwise = [max_elem (sub_arr 0 n arr)] ++ 
                            (sliding (drop 1 arr) n) 

max_elem :: [Int] -> Int
max_elem [x] = x
max_elem (x:xs) = max x (max_elem xs)

sub_arr :: Int -> Int -> [Int] -> [Int]
sub_arr start n arr = take n (drop start arr)