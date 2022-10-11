import {
  Appear,
  CodePane,
  Heading,
  Image,
  ListItem,
  Notes,
  Slide,
  UnorderedList,
} from "spectacle";
// Below is very sad
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";

const variables = [
  "1 4-bytes integer array with room for 2 items",
  "1 Unisgned 8-bits integer",
  "2 8-bytes pointers",
];

const Memory: React.FC = () => {
  return (
    <>
      <Slide backgroundColor="background">
        <Heading>Memory</Heading>
        <div className="w-full h-2/3 flex">
          <Appear className="w-full">
            <table className="table-fixed mx-auto border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500">
                  <th>Address (HEX)</th>
                  <th>Content</th>
                  <th>Code reference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0x1000</td>
                  <td>Garbage</td>
                  <td>Nothing yet</td>
                </tr>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
                <tr>
                  <td>0x1008</td>
                  <td>Garbage</td>
                  <td>Nothing yet</td>
                </tr>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
                <tr>
                  <td>0x1100</td>
                  <td>Garbage</td>
                  <td>Nothing yet</td>
                </tr>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
                <tr>
                  <td>0x1104</td>
                  <td>Garbage</td>
                  <td>Nothing yet</td>
                </tr>
              </tbody>
            </table>
          </Appear>
        </div>
      </Slide>
      <Slide backgroundColor="background">
        <CodePane language="c" theme={oneDark}>
          {`
            // ./code/memory_addresses.c#L1-L11

            #include <stdio.h>
            #include <stdint.h>
            
            #define ARRAY_SIZE 2
            
            int main(int argc, char const *argv[])
            {
                int integers[ARRAY_SIZE];
                uint8_t i;
                int *pIntegersZero, *pIntegersOne;
            `}
        </CodePane>
        <UnorderedList className="list-[square]">
          {variables.map((variable) => (
            <Appear>
              <ListItem>{variable}</ListItem>
            </Appear>
          ))}
        </UnorderedList>
      </Slide>
      <Slide backgroundColor="background">
        <CodePane language="c" theme={oneDark}>
          {`
            // ./code/memory_addresses.c#L12-L15

            integers[0] = 10;
            integers[1] = 20;
            pIntegersZero = &integers[0];
            pIntegersOne = &integers[1];
            `}
        </CodePane>
        <Appear className="h-full my-4">
          <div className="w-full flex">
            <table className="table-fixed mx-auto border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500">
                  <th>Address (HEX)</th>
                  <th>Content</th>
                  <th>Code reference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0x1000</td>
                  <td>0x1100</td>
                  <td>
                    <code>pIntegersZero</code>
                  </td>
                </tr>
                <tr>
                  <td>0x1008</td>
                  <td>0x1104</td>
                  <td>
                    <code>pIntegersOne</code>
                  </td>
                </tr>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
                <tr>
                  <td>0x1100</td>
                  <td>10</td>
                  <td>
                    <code>integers[0]</code>
                  </td>
                </tr>
                <tr>
                  <td>0x1104</td>
                  <td>20</td>
                  <td>
                    <code>integers[1]</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Appear>
      </Slide>
      <Slide backgroundColor="background">
        <Heading>Verify our claims</Heading>
        <div className="w-full h-2/3 flex">
          <Image
            src="https://github.com/ShockSoc/C-presentation/raw/main/assets/memory_output.png"
            className="w-[800px] mx-auto my-auto"
          />
        </div>
        <Notes>
          As you can see, the integers are 4 bytes apart, the pointers are 8
          bytes apart and all the sizes check out to what was speculated before.
          The pointers point to the variables we intended them to point to. Do
          notice that the pointers are stored subsequently as we speculated. It
          might be trickier to catch but:
          <ul className="my-4 mx-4 list-disc">
            <li>pIntegersOne is stored at 0x16bb8b7c8</li>
            <li>
              pIntegersZero is stored at 0x16bb8b7d0 0x16bb8b7c8 is exaclty 8
            </li>
            <li>bytes "before" 0x16bb8b7d0 In HEX, 0xC8 + 0x08 = 0xD0</li>
          </ul>
        </Notes>
      </Slide>
    </>
  );
};

export { Memory };
