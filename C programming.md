# Why C?
As electronic engineers, or engineers in general, you will likely be working with embedded system.
Embedded systems are, for example, your smartphone or your Amazon Alexa, but also your smart light bulb or
the control system for an oil refinery. As you might be aware, the platform code for your smartphone, that is the user interface and all the frameworks that work behind the scenes so that you can share pictures on 
instagram, are most likely written in higher level languages such as Java, Kotlin or Swift. So why is it important for you to know how to prorgam in C? Withouth C, you would not be able to execute code written in those languages. The C language is extensively used in kernel programming. The kernel is the layer that handles all interactions between the operative system and the hardware itself. Another reason why you need
to be able to program in C as an engineer is that microcontrollers commonly used in the industry perform best when executing C binaries.

As you learnt last year, you could program the microbit using a python interpreter. However, you should have seen a significant computing and memory performance increase by using the C++ hardware abstraction layer.

# When no to use C
Theoretically you could do everything in C as you have control over the ins and outs of the computer. However, in 2022 you probably don't want to do that for ease of development. If you are developing a desktop application, it would make little sense to use C over a higher language as the complexity of the code would be way higher slowing down the development. The takeaway is, you should learn C but you should also be familiar with Java and friends.

# Hello world
I'm sure most of you will be familiar with the following code but I'll let you all have a quick referesher.
```c
// ./code/hello_world.c

#include <stdio.h>

int main(int argc, char **argv) {
    printf("Hello World!\n");
    return 0;
}
```
Explain code here

This is great, but how do we run this now? C is a compiled language, so you are going to need a compiler. I would suggest you use either gcc or clang as they are industry standard, but if you are asked by your lecturer to use something else you should probably stick to that or at least verify your code expresses the same behaviour when using their compiler of choice for assessment's sake. Throughout this presentation I will be using clang as it comes bundled with macOS.

# The most fascinating thing you can do in C
In my opinion, the most interesting thing you can do in C is memory manipulation. But what is memory? Modern systems have all sorts of memory right? You have storage, you have cache, random access memory (RAM), non volatile random access memory (NVRAM), video random access memory (VRAM) and the list goes on. 