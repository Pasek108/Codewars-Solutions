module CoefficientsOfTheQuadraticEquation (quadratic) where

quadratic :: Int -> Int -> (Int,Int,Int)
quadratic x1 x2 = (1, -x2 - x1, x1 * x2)