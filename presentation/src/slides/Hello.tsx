import { Heading, Slide } from "spectacle";
import { Logo } from "./Logo";

const Hello: React.FC = () => {
  return (
    <Slide backgroundColor="background">
      <Heading>C Programming</Heading>
      <Logo />
      <Heading fontSize="subHeading">Giuseppe Barillari</Heading>
    </Slide>
  );
};

export { Hello };
