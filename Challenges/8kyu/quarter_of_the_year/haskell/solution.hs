module Kata (quarterOf) where

quarterOf :: Int -> Int
quarterOf month = (div (month - 1) 3) + 1