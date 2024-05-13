public class Prime {
  public static boolean isPrime(int num) {
    if (num < 2) return false;
    
    for (int i = 2; i <= Math.sqrt(num); i += 2) {
      if (num % i == 0) return false;
      if (i == 2) i--;
    }
    
    return true;
  }
}