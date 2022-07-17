# Why C?
As electronic engineers or engineers in general, you will likely be working with embedded systems.
Embedded systems are, for example, your smartphone or your Amazon Alexa, but also your smart light bulb or
the control system for an oil refinery. As you might be aware, the platform code for your smartphone, that is the user interface and all the frameworks that work behind the scenes so that you can share pictures on
Instagram, are most likely written in higher-level languages such as Java, Kotlin or Swift. So why is it important for you to know how to program in C? Without C, you would not be able to execute code written in those languages. The C language is extensively used in kernel programming. The kernel is the layer that handles all interactions between the operative system and the hardware itself. Another reason why you need
to be able to program in C as an engineer is that microcontrollers commonly used in the industry perform best when executing C binaries.
As you learnt last year, you could program the microbit using a python interpreter. However, you should have seen a significant computing and memory performance increase by using the C++ hardware abstraction layer.
When not to use C
Theoretically, you could do everything in C as you have control over the ins and outs of the computer. However, in 2022 you probably don't want to do that for ease of development. If you are developing a desktop application, it would make little sense to use C over a higher language as the complexity of the code would be way higher slowing down the development. The takeaway is that you should learn C but you should also be familiar with Java and friends.

# Hello world

I'm sure most of you will be familiar with the following code but I'll let you all have a quick refresher.

```c
// ./code/hello_world.c

#include <stdio.h>

int main(int argc, char **argv) {
    printf("Hello World!\n");
    return 0;
}
```

Explain code here

This is great, but how do we run this now? C is a compiled language, so you are going to need a compiler. I would suggest you use either GCC or clang as they are industry standards, but if you are asked by your lecturer to use something else you should probably stick to that or at least verify your code expresses the same behaviour when using their compiler of choice for assessment's sake. Throughout this presentation, I will be using clang as it comes bundled with Xcode. And as you can probably tell from this statement, what compiler you use realistically completely depends on what you are working on. Most often than not when developing for embedded system, you will be using cross-compiling toolchains. That is because the architecture of an embedded system is most likely different from the x86 architecture powering your machine. The most common embedded architecture is the ARM architecture but there are alternatives such as RISC-V and the Harvard architecture (most old Arduino boards).

# What does the compiler do?

When it comes to programming we often refer to "the compiler" as a whole without going too much into details. Generating an executable actually comprises two steps. Creating object files and linking said object files. The compiler is only responsible for creating the object files. Object files are a translation into machine language from our source file. As you all know, computers don't understand English but they work quite well with bits. Once the compiler has produced the object files, we need to invoke the linker. The linker, as the name says, instructs the computer about what functions need to be invoked and where they come from. In the example above we can the printf function. Although our code does not define the printf function and does not instruct the computer about what the printf function does, the program still works. That is because we included the function definition from the standard input and output library, that is stdio.h, and the linker has worked its way to reference the function call in our executable file.
Given that we are working with a somewhat low-level language, you might want to inspect the intermediate steps that get you from your source C file to the executable binary file. A useful piece of information would come right before the assembler runs. The assembler translates assembly language into a binary executable. Assembly is the closes language to machine language. In assembly, you have to describe what you want from the processor step by step. To gather the assembly code generated from your C file, compilers often expose a flag. In clang's and GCC's case that is `-S`. So, to get the assembly translation of your source code you should run something along the lines of:

`$ clang -S -o code/hello_world-arm64.asm code/hello_world.c`

<table>
<tr>
<td> ARM assembly </td> <td> x86_64 assembly </td>
</tr>
<tr>
<td>

```ts
// ./code/hello_world-arm64.asm

	.section	__TEXT,__text,regular,pure_instructions
	.build_version macos, 12, 0	sdk_version 12, 3
	.globl	_main                           ; -- Begin function main
	.p2align	2
_main:                                  ; @main
	.cfi_startproc
; %bb.0:
	sub	sp, sp, #48
	stp	x29, x30, [sp, #32]             ; 16-byte Folded Spill
	add	x29, sp, #32
	.cfi_def_cfa w29, 16
	.cfi_offset w30, -8
	.cfi_offset w29, -16
	mov	w8, #0
	str	w8, [sp, #12]                   ; 4-byte Folded Spill
	stur	wzr, [x29, #-4]
	stur	w0, [x29, #-8]
	str	x1, [sp, #16]
	adrp	x0, l_.str@PAGE
	add	x0, x0, l_.str@PAGEOFF
	bl	_printf
	ldr	w0, [sp, #12]                   ; 4-byte Folded Reload
	ldp	x29, x30, [sp, #32]             ; 16-byte Folded Reload
	add	sp, sp, #48
	ret
	.cfi_endproc
                                        ; -- End function
	.section	__TEXT,__cstring,cstring_literals
l_.str:                                 ; @.str
	.asciz	"Hello World!\n"

.subsections_via_symbols

```

</td>
<td>

```ts
// ./code/hello_world-x86_64.asm

	.section	__TEXT,__text,regular,pure_instructions
	.build_version macos, 12, 0	sdk_version 12, 3
	.globl	_main                           ## -- Begin function main
	.p2align	4, 0x90
_main:                                  ## @main
	.cfi_startproc
## %bb.0:
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset %rbp, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register %rbp
	subq	$16, %rsp
	movl	$0, -4(%rbp)
	movl	%edi, -8(%rbp)
	movq	%rsi, -16(%rbp)
	leaq	L_.str(%rip), %rdi
	movb	$0, %al
	callq	_printf
	xorl	%eax, %eax
	addq	$16, %rsp
	popq	%rbp
	retq
	.cfi_endproc
                                        ## -- End function
	.section	__TEXT,__cstring,cstring_literals
L_.str:                                 ## @.str
	.asciz	"Hello World!\n"

.subsections_via_symbols

```

</td>
</tr>
</table>

# Function prototypes

You might have heard the term function prototype as it is a crucial concept to grasp in C. The prototype of a function is the declaration of the function itself, which specifies the function's name and type signature, or return type. A function prototype never contains the body of the function. Why do we need function prototypes? Function prototypes are used to make the compiler aware of our function before we define what the function does. That way, if in our program we reference our function before we define its body, the linker will know what to do with the particular function call since we provided a prototype.
Here is an example

```c
// ./code/prototype.c

#include <stdio.h>

int sum(int a, int b);

int main(int argc, char **argv) {

    int sumResult;

    sumResult = sum(10, 5);

    printf("%d\n", sumResult);
    return 0;
}

int sum(int a, int b) {
    return a + b;
}
```

# Pointers

Pointers are without a doubt the most common source of confusion when it comes to mastering the art of C programming. So, what is a pointer? What does it do and how do we use it? As the name suggests, a pointer points. It points to what? It points to an address in memory. Why is that useful? Well, thanks to pointers, we can pass variables by reference rather than by value. It might not be immediate to you now, but this feature allows us to write organised code that performs efficiently and at the same time is easy to ready. How does passing by reference work? Well, we said that pointers point to an address in memory. Typically, that address in memory is where a variable is stored. Therefore, a pointer points to the memory address where a certain variable has been stored. This means that, given we have a reference to the said pointer, we can access the value of the variable across different scopes in our program. A scope could be a function. In that regard, the previous statement means that if we define a variable in function A, and then we call function B by passing a pointer to the variable, we can change and read the value of the variable from within the scope of function B. If we passed the variable by value we would only be able to ready the value of the variable.

## Passing by value
An example of passing a variable by value would be:

```c
// ./code/pass_by_value.c

#include <stdio.h>

void print_variable(int variable);

int main(int argc, char **argv) {
    int mainVariable;

    mainVariable = 10;

    print_variable(mainVariable);
    return 0;
}

void print_variable(int variable) {
    printf("%d\n", variable);
}
```

## Passing by reference

Now an example of passing a variable by reference:

```c
// ./code/pass_by_reference.c

#include <stdio.h>

void print_and_change_variable(int *variable);

int main(int argc, char **argv)
{
    int mainVariable;

    mainVariable = 20;

    print_and_change_variable(&mainVariable);

    printf("New value: %d\n", mainVariable);
    return 0;
}

void print_and_change_variable(int *variable)
{
    printf("%d\n", (*variable));
    printf("Changing the value\n");

    (*variable) = 15;
}
```

There is a lot going on there. So first of all let's learn how to recognise a pointer. Whenever you see the `*` symbol **after** a type definition, then that variable is going to be a pointer. Example:

```c
int *iAmAPointer;
```

But a pointer should point to an address right? To get the address where a variable is stored, we use the `&` symbol. Example:

```c
int dogs;
int * pDogs;

dogs = 10;

pDogs = &dogs;
```

Cool, now we want to access the value of the variable from the pointer. To do that, we dereference the pointer. Now a bit of confusion might kick in. To dereference a pointer we use the `*` symbol. Unfortunately, that is the same character we use to declare a pointer. So, how do we tell the difference? If you see a type definition right before the `*`, then we are declaring a pointer. If you see `*` in front of a variable, with no type definition, then we are dereferencing that variable, and it better be a pointer or you'll be in trouble. Example:

```c
int a;
int *pA; // Declaring a pointer
int b;

a = 5;
pA = &a;

b = (*pA); // Dereferencing a pointer
```

It is important to mention that a pointer is a variable itself. Instead of storing a value assigned by us, it stores the address in memory of another variable.

## Example of memory content with variables and pointers

So let's visualise pointers and variables:
Imagine the below table is the memory in your computer:

| Address (HEX) | Content | Code reference |
| ------------- | ------- | -------------- |
| 0x1000        | Garbage | Nothing yet    |
| ...           | ...     | ...            |
| 0x1008        | Garbage | Nothing yet    |
| ...           | ...     | ...            |
| 0x1100        | Garbage | Nothing yet    |
| ...           | ...     | ...            |
| 0x1104        | Garbage | Nothing yet    |

The dots in the table above symbolise all the addresses in between the ones in the table. Okay so now let's consider the following program:

```c
// ./code/memory_addresses.c

#include <stdio.h>

#define ARRAY_SIZE 2

int main(int argc, char const *argv[])
{
    int integers[ARRAY_SIZE];
    u_int8_t i;
    int *pIntegersZero, *pIntegersOne;

    integers[0] = 10;
    integers[1] = 20;
    pIntegersZero = &integers[0];
    pIntegersOne = &integers[1];

    for(i = 0; i < ARRAY_SIZE; i++) {
        printf("Integer at index %u is stored at address %p and has value %d\n", i, &integers[i], integers[i]);
    }

    printf("The pointer zero stores the address %p and is stored at address %p\n", pIntegersZero, &pIntegersZero);
    printf("The pointer one stores the address %p and is stored at address %p\n", pIntegersOne, &pIntegersOne);

    printf("\nSizes of variables in the program:\n");
    printf("integers: %lu bytes\n", sizeof(integers));
    printf("integers[0]: %lu bytes\n", sizeof(integers[0]));
    printf("integers[1]: %lu bytes\n", sizeof(integers[1]));
    printf("pIntegersZero: %lu bytes\n", sizeof(pIntegersZero));
    printf("pIntegersOne: %lu bytes\n", sizeof(pIntegersOne));
    printf("i: %lu bytes\n", sizeof(i));
    return 0;
}

```

By analysing the program

# Strings

So,
![](assets/strings.jpg)
Or better, we treat strings in a different way from most programming languages. As humans, it's easy to think of a string as a collection of characters

# The most fascinating thing you can do in C

In my opinion, the most interesting thing you can do in C is memory manipulation. But what is memory? Modern systems have all sorts of memory right? You have storage, cache, random access memory (RAM), non-volatile random access memory (NVRAM), video random access memory (VRAM) and the list goes on.
