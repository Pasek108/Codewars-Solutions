SECTION .text
global opposite

opposite:
  mov eax, edi
  neg eax
  ret