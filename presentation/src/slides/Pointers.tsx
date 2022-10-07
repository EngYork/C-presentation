// Below is very sad
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import {
  Appear,
  CodePane,
  Heading,
  ListItem,
  Slide,
  UnorderedList,
} from "spectacle";

const properties = [
  "Variables",
  "Defined in a particular way",
  '"Point" to an address in memory',
  "Used in dynamic allocation"
];

const Pointers: React.FC = () => {
  return (
    <>
      <Slide backgroundColor="background">
        <Heading>Pointers</Heading>
        <UnorderedList className="list-[square]">
          {properties.map((property) => (
            <Appear key={property}>
              <ListItem>{property}</ListItem>
            </Appear>
          ))}
        </UnorderedList>
      </Slide>
      <Slide backgroundColor="background">
        <Heading>Using pointers</Heading>
        <CodePane language="c" theme={oneDark}>
          {`
            int iAmAValue;
            int iAmTheSameValue;
            int * iAmAPointer;
            
            iAmAValue = 10;
            
            iAmAPointer = &iAmAValue;
            
            iAmTheSameValue = (*iAmAPointer); /* Dereference the pointer */
            
            `}
        </CodePane>
      </Slide>
    </>
  );
};

export { Pointers };
