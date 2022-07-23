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
