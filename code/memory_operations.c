#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define BUFFER_SIZE 256

int bail();

int main(int argc, char const *argv[])
{
    char *buffer, *spongebobString;
    uint8_t i;
    size_t inputLength, inputSize, newSize;

    inputSize = BUFFER_SIZE * sizeof(char);
    buffer = malloc(inputSize);
    // Memory allocation can fail! (Extremely unlikely, but always better safe than sorry)
    if (buffer != NULL)
    {
        printf("Input a string max (%d characters): ", (BUFFER_SIZE - 1));
        fgets(buffer, BUFFER_SIZE, stdin);

        inputLength = strlen(buffer);

        // Remove new line at end of string
        inputLength--;
        buffer[inputLength] = '\0';
        newSize = ((inputLength + 1) * sizeof(char));

        buffer = realloc(buffer, newSize);
        spongebobString = malloc(newSize);
        if (buffer == NULL || spongebobString == NULL)
            return bail();

        memcpy(spongebobString, buffer, newSize);
        for (i = 0; i < inputLength; i += 2)
        {
            spongebobString[i] = toupper(spongebobString[i]);
        }

        printf("Input: %s\n", buffer);
        printf("Output: %s\n\n", spongebobString);
        printf("Initial size of input: %zu bytes\n", inputSize);
        printf("New size of input and size of output: %zu bytes\n", newSize);

        free(buffer);
        free(spongebobString);
    }
    else
    {
        return bail();
    }

    return 0;
}

int bail()
{
    printf("It appears this program is being run on a potato, bailing!\n");
    return -1; // Will "expand" to 255, return code is one byte
}