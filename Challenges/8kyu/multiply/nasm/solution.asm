global multiply
section .text
multiply:
  mov eax, edi
  mul esi
  ret