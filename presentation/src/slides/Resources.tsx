import { Heading, Link, ListItem, Slide, UnorderedList } from "spectacle";

const Resources: React.FC = () => {
  return (
    <Slide backgroundColor="background">
      <Heading>Resources</Heading>
      <UnorderedList>
        <ListItem>
          <Link color="primary" href="https://www.shocksoc.org/C-presentation/">
            https://www.shocksoc.org/C-presentation/
          </Link>
        </ListItem>
        <ListItem>
          <Link color="primary" href="https://github.com/ShockSoc/C-presentation">
            https://github.com/ShockSoc/C-presentation
          </Link>
        </ListItem>
      </UnorderedList>
    </Slide>
  );
};

export { Resources };
