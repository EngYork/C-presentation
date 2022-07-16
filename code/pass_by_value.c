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