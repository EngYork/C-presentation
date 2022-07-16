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