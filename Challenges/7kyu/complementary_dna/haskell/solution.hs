module Codewars.Kata.DNA where
import Codewars.Kata.DNA.Types

-- data Base = A | T | G | C
type DNA = [Base]

dnaStrand :: DNA -> DNA
dnaStrand [] = []
dnaStrand (x:xs) | x == A = [T] ++ (dnaStrand xs)
                 | x == T = [A] ++ (dnaStrand xs)
                 | x == C = [G] ++ (dnaStrand xs)
                 | x == G = [C] ++ (dnaStrand xs)