import {
  AnimatedProgress,
  Deck,
  FullScreen,
  Progress,
  Slide,
  Text,
} from "spectacle";
import { Hello } from "./slides";
import { Why } from "./slides/Why";

const template: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full relative">
      <div className="absolute bottom-0 w-full p-4 bg-gray-900 flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <span className="text-slate-100 italic mr-4">ShockSoc</span>
          <FullScreen />
        </div>
        <Progress color="background" />
      </div>
    </div>
  );
};

const theme = {
  colors: {
    primary: "#0f172b", // Slate 900
    secondary: "#334155", // Slate 700
    background: "#f1f5f9", // Slate 100
  },
  fontSizes: {
    subHeading: "35px",
  },
};

const App: React.FC = () => {
  return (
    <Deck theme={theme} template={template}>
      <Hello />
      <Why />
    </Deck>
  );
};

export default App;
