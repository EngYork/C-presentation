#include <stdio.h>
#include <stdint.h>

#define ARRAY_SIZE 2

int main(int argc, char const *argv[])
{
    int integers[ARRAY_SIZE];
    uint8_t i;
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
