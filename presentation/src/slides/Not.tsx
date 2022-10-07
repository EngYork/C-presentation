import { Appear, Heading, ListItem, Slide, UnorderedList } from "spectacle";

const reasons = ["Ease of development", "Code complexity", "Development time"];

const Not: React.FC = () => {
  return (
    <Slide backgroundColor="background">
      <Heading>Why not C?</Heading>
      <UnorderedList className="list-[square]">
        {reasons.map((reason) => (
          <Appear key={reason}>
            <ListItem>{reason}</ListItem>
          </Appear>
        ))}
      </UnorderedList>
    </Slide>
  );
};

export { Not };
