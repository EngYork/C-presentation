import {
  Appear,
  Heading,
  Image,
  ListItem,
  Slide,
  UnorderedList,
} from "spectacle";

const properties = [
  "Arrays",
  <span>
    They are <code>NULL</code> terminated. The last character should be{" "}
    <code>'\0'</code>
  </span>,
];

const Strings: React.FC = () => {
  return (
    <>
      <Slide backgroundColor="background">
        <Heading>Strings</Heading>
        <Appear className="w-full flex">
          <Image
            src="https://raw.githubusercontent.com/ShockSoc/C-presentation/main/assets/strings.jpg"
            className="w-[600px] m-auto"
          />
        </Appear>
      </Slide>
      <Slide backgroundColor="background">
        <Heading>Or do we?</Heading>
        <UnorderedList className="list-[square]">
          {properties.map((property, idx) => (
            <Appear key={idx}>
              <ListItem>{property}</ListItem>
            </Appear>
          ))}
        </UnorderedList>
      </Slide>
    </>
  );
};

export { Strings };
