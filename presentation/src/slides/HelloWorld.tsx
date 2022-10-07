import { CodePane, Heading, Slide } from "spectacle";
// Below is very sad
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";

const HelloWorld: React.FC = () => {
  return (
    <Slide backgroundColor="background">
      <Heading>Hello World!</Heading>
      <CodePane language="c" theme={oneDark}>{`
        #include <stdio.h>

        int main(int argc, char **argv) {
            printf("Hello World!\\n");
            return 0;
        }
        `}</CodePane>
    </Slide>
  );
};

export { HelloWorld };
