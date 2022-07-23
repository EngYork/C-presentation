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
