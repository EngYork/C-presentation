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

By analysing the program we can predict what's going to happen with our memory.

```c
// ./code/memory_addresses.c#L1-L10

#include <stdio.h>

#define ARRAY_SIZE 2

int main(int argc, char const *argv[])
{
    int integers[ARRAY_SIZE];
    u_int8_t i;
    int *pIntegersZero, *pIntegersOne;

```

Here we can see we have four variables. On my machine, integers are 4 bytes wide. Remember that one byte is made of 8 bits. Therefore we can predict the size of `integers` to be 8 bytes or 64 bits. Next, we have the variable `i`. You should notice something odd here. `i` is not just an integer. I used the `u_int8_t` type to define our variable. As the name suggests, this type is 8 bits long. Therefore, our variable `i` is going to be 1 byte long. If you can't tell why I used this smaller integer type, it's because I knew its value would never need to be greater than 255 ($2^8 - 1 = 255$). Hence, we saved some space in memory. This is a very useful concept for embedded systems development, but you should apply it whenever you can. Now we have the two pointers. On my machine, pointers are 8 bytes long or 64 bits.

Notice anything yet? My machine is a 64-bit ARM computer. The fact that pointers are 8 bytes long tells us that my machine can handle 64-bit address spaces. On a 32-bit Intel computer, pointers are usually 4 bytes long as they operate in 32-bit address spaces. So let's rewrite the table with our variables in mind:

| Address (HEX) | Content | Code reference  |
| ------------- | ------- | --------------- |
| 0x1000        | Garbage | `pIntegersZero` |
| 0x1008        | Garbage | `pIntegersOne`  |
| ...           | ...     | ...             |
| 0x1100        | Garbage | `integers[0]`   |
| 0x1104        | Garbage | `integers[1]`   |

Array items are stored consequently in memory. Therefore we can tell for sure that `integers[1]` is going to be stored 4 bytes after `integers[0]` because `integers[0]` itself is going to occupy 4 bytes in memory. Each address usually symbolises one byte, but this is implementation-defined amongst other things such as the size of each type we are using. The same logic applies to our pointers. They are 8 bytes long and they are probably going to be in adjacent addresses. Since there is not a lot else going on in the program, it makes sense for our computer to organise the memory as it is displayed in the table.

The content of all those addresses before we assign a value to those variables is garbage. It's garbage because they store whatever value was in there before we execute our code. It could be nothing, or it could be anything. We don't know and it does not matter to us unless we try to access that memory before assigning some value. If we do that, we do not know what to expect.

```c
// ./code/memory_addresses.c#L11-L14

integers[0] = 10;
integers[1] = 20;
pIntegersZero = &integers[0];
pIntegersOne = &integers[1];
```

Once we run the program, we can expect something like this:

| Address (HEX) | Content | Code reference  |
| ------------- | ------- | --------------- |
| 0x1000        | 0x1100  | `pIntegersZero` |
| 0x1008        | 0x1104  | `pIntegersOne`  |
| ...           | ...     | ...             |
| 0x1100        | 10      | `integers[0]`   |
| 0x1104        | 20      | `integers[1]`   |

It should now be clear that a pointer is just a variable storing the address of another variable. To verify our claims, we can run the program and get a similar output to what I got here:
![](assets/memory_output.png)

As you can see, the integers are 4 bytes apart, the pointers are 8 bytes apart and all the sizes check out to what was speculated before. The pointers point to the variables we intended them to point to. Do notice that the pointers are stored subsequently as we speculated. It might be trickier to catch but:

- `pIntegersOne` is stored at `0x16bb8b7c8`
- `pIntegersZero` is stored at `0x16bb8b7d0`
- `0x16bb8b7c8` is exaclty 8 bytes "before" `0x16bb8b7d0`
- In HEX, `0xC8 + 0x08 = 0xD0`

# Strings

So,

![](assets/strings.jpg)

Or better, we treat strings differently from most programming languages. As humans, it's easy to think of a string as a collection of characters. For example, we would normally associate `"Pugs are cute"` with the idea of a string. And that would be true in programming languages like python where we can do stuff like:

```py
# ./code/str.py

def main():
    best_breed = "Pugs"
    print("The best breed is {}".format(best_breed))
    return 0


if __name__ == "__main__":
    main()

```

or Java:

```java
// ./code/Str.java

/* This uses Java's "default" package for example purposes only.
 * NEVER DO THIS!
 * Reason in short: https://stackoverflow.com/a/7849468
*/

public class Str {
    public static void main(String[] args) {
        String breed = "Pugs";
        System.out.println(String.format("The best breed is %s", breed));
    }
}
```

But hold on a second, in C you can do this for example:

```c
// ./code/dumb_str.c

#include <stdio.h>

#define CHARACTERS 5

int main(int argc, char const *argv[])
{
    u_int8_t i;
    char breed[CHARACTERS] = "Pugs";
    printf("The best breed is %s\n", breed);
    for(i = 0; i < CHARACTERS; i++) {
        if(breed[i] == '\0') {
            printf("%s is NULL terminated\n", breed);
        }
    }
    return 0;
}

```

So why is this bad? It isn't strictly speaking, but it's not very secure. First of all, as you might have noticed `breed` does not have some kind of string type since there is no string type in C. Strings are arrays of characters. Now, `"Pugs"` is made of `4` characters, yet I specified the length of the character array to be `5`. That is because strings must be "`NULL` terminated" in C. What does that mean? It means that the last character in a character array should have a value of `\0`. Since there is no string type, your machine would have no notion of the length of the character array in use. Therefore, string manipulating functions often rely on the presence of the `NULL` character to determine where the string ends. In essence, a C string is a pointer to the first character in the array. So when you iterate over each item in the array, you know the string ends when you find a character with value `\0`. When a string value is assigned like in the above example, the compiler inserts the `NULL` character for you so you are somewhat safe. But let's say I spelled `"Pugs"` as `"Pugss"`, then we might encounter situations where our program crashes. What you could do to avoid this problem is not to specify the length of the array and the compiler will handle that for you:

```c
char breed[] = "Pugs";
```

Generally speaking, using any of the above syntaxes is not ideal as they are invalid in ANSI-C. In fact, in ANSI-C variables definitions and declarations should happen at different times in the program. So what would be a better way to work with strings? To find that out, we first need to talk about dynamic memory allocation.

# `malloc()` and friends (dynamic memory allocation)

Everything we have done so far relies on statically allocated variables, but a true C ninja knows how to handle their dynamic memory. Here is where pointers come to shine. The main difference between statically and dynamically allocating memory (remember, variables sit in memory) is where and when the allocation happens.

## Static allocation

Statically allocated memory is allocated into the so-called stack, and it's allocated right at the beginning of your program staying allocated until your program exits. The stack is a region of memory allocated to the execution of your program. The size of the stack will not change throughout the execution of the program. Furthermore, once the size of the stack is determined and the memory is allocated, you will not be able to "free" the memory until the program exits. Freeing memory means making it available to other processes. Statically allocated memory is easy to use but gives you very strict constraints.

## Dynamically allocated memory

Dynamically allocated memory is allocated into the so-called heap, and it's allocated upon request from your program. It can be freed whenever your program says it's okay to be freed. It should be clear to you that dynamic allocation gives you incredible degrees of freedom. On the other hand, dynamic allocation is often hard to keep track of and if done incorrectly can quickly lead to memory leaks. As with most things, dynamic allocation is better but harder to use.

So how do we do this dynamic memory allocation thing?
```c
// ./code/malloc.c

#include <stdio.h>
#include <stdlib.h>

#define NOT_SO_DYNAMIC_LENGTH 10

int main(int argc, char const *argv[])
{
    int *dynamicArray;
    u_int8_t i;

    dynamicArray = malloc(NOT_SO_DYNAMIC_LENGTH * sizeof(int));

    for(i = 0; i < NOT_SO_DYNAMIC_LENGTH; i++) {
        dynamicArray[i] = NOT_SO_DYNAMIC_LENGTH - i;
    }

    for (i = 0; i < NOT_SO_DYNAMIC_LENGTH; i++)
    {
        printf("Integer at index %u has value %d\n", i, dynamicArray[i]);
    }

    free(dynamicArray);

    return 0;
}

```

In the above program we used `malloc()` to dynamically allocate enough memory to store `10 (NOT_SO_DYNAMIC_LENGTH)` integers. Integers because we specified `10` times the size of an integer with `sizeof(integer)`. We can do that with every type, although we need to be a bit more careful at times (for example when dealing with strings). At the end of the program, we freed the memory by calling the `free()` function and passing our pointer as argument.

# The most fascinating thing you can do in C

In my opinion, the most interesting thing you can do in C is memory manipulation. But what is memory? Modern systems have all sorts of memory right? You have storage, cache, random access memory (RAM), non-volatile random access memory (NVRAM), video random access memory (VRAM) and the list goes on.
