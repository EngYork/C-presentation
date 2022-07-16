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