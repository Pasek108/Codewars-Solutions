module LeastLarger (leastLarger) where

leastLarger :: [Int] -> Int -> Maybe Int
leastLarger arr n | least == n = Nothing
                  | otherwise = Just least
                  where least = findLeastLarger arr n 0 n

findLeastLarger arr n i min_i =
  if out_of_scope then
    min_i 
  else if first_least_larger || smaller_least_larger then
    findLeastLarger arr n (i + 1) i                     
  else 
    findLeastLarger arr n (i + 1) min_i
  where 
    out_of_scope = i >= length arr
    first_least_larger = i_gt_n && min_i == n
    smaller_least_larger = i_gt_n && i_n_diff <= min_n_diff
    i_gt_n = (arr !! i) > (arr !! n)
    i_n_diff = abs ((arr !! i) - (arr !! n))
    min_n_diff = abs ((arr !! min_i) - (arr !! n))