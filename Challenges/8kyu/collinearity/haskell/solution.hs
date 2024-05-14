module Collinearity (collinearity) where

collinearity :: (Int,Int) -> (Int,Int) -> Bool
collinearity (x1,y1) (x2,y2) 
  | (x1 == 0 && y1 == 0) || (x2 == 0 && y2 == 0) = True
  | (x1 == 0 && x2 == 0) || (y1 == 0 && y2 == 0) = True
  | otherwise = (divide x1 x2) == (divide y1 y2)
  
divide :: Int -> Int -> Float
divide a b = (fromIntegral a) / (fromIntegral b)