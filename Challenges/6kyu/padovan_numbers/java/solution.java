public class Solution {
  public static long padovan(int n) {
    long[] p = {1, 1, 1};
    
    for (int i = 2; i < n; i++) {
      long x = p[0] + p[1];
      p[0] = p[1]; 
      p[1] = p[2]; 
      p[2] = x;
    }
    
    return p[2];
  }
}