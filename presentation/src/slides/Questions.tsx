import { Heading, Slide } from "spectacle";

const Questions: React.FC = () => {
  return (
    <Slide backgroundColor="background">
      <Heading>Questions?</Heading>
      <div className="w-full">
        <iframe
          src="https://giphy.com/embed/XFuQ4InwtXBE4DDPHM"
          width="480"
          height="400"
          frameBorder="0"
          className="m-auto"
        ></iframe>
        <p className="m-auto w-max">
          <a href="https://giphy.com/gifs/Friends-season-9-episode-11-the-one-where-rachel-goes-back-to-work-XFuQ4InwtXBE4DDPHM">
            via GIPHY
          </a>
        </p>
      </div>
    </Slide>
  );
};

export { Questions };
