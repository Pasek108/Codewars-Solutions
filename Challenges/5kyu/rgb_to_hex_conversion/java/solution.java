public class RgbToHex {

  public static String rgb(int r, int g, int b) {
    String hex = "";

    hex += RgbToHex.byteToHex(r);
    hex += RgbToHex.byteToHex(g);
    hex += RgbToHex.byteToHex(b);

    return hex;
  }

  public static String byteToHex(int intByte) {
    String digits = "0123456789ABCDEF";
    String hex = "";

    intByte = (intByte < 0) ? 0 : (intByte > 255) ? intByte = 255 : intByte;
    hex += digits.charAt((intByte - (intByte % 16)) / 16);
    hex += digits.charAt(intByte % 16);

    return hex;
  }
}