section .text
global whichIsLarger
whichIsLarger:            ; int whichIsLarger(int a, int b)
  cmp edi, esi
  je equal
  jg first_larger
  
  mov eax, esi
  ret
  
first_larger:
  mov eax, edi
  ret
  
equal:
  mov eax, '='
  ret