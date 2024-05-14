module SF179 where

fraction :: (Int,Int) -> Int
fraction (a, b) = (div a reduce) + (div b reduce)
                  where reduce = gcd b a