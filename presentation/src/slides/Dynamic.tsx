import { Appear, Heading, ListItem, Slide, UnorderedList } from "spectacle";

const properties = [
  'Allocated in the "heap" rather than in the "stack"',
  "Can be released upon request",
  "More freedom",
  "More headaches",
];

const Dynamic: React.FC = () => {
  return (
    <Slide backgroundColor="background">
      <Heading>Dynamic memory allocation</Heading>
      <UnorderedList className="list-[square]">
        {properties.map((property) => (
          <Appear key={property}>
            <ListItem>{property}</ListItem>
          </Appear>
        ))}
      </UnorderedList>
    </Slide>
  );
};

export { Dynamic };
