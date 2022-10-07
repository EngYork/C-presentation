import { useRef } from "react";
import {
  Appear,
  Heading,
  Image,
  ListItem,
  Slide,
  Stepper,
  UnorderedList,
} from "spectacle";

const reasons = [
  {
    item: "Embedded systems",
    images: [
      "https://www.pngfind.com/pngs/m/545-5459950_amazon-echo-png-amazon-echo-dot-png-transparent.png",
      "https://pngimg.com/uploads/iphone_13/iphone_13_PNG2.png",
      "https://blogs.nvidia.com/wp-content/uploads/2019/11/Screen-Shot-2019-11-21-at-2.23.10-PM.png",
    ],
  },
  {
    item: "Other languages rely on C",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/d/dd/JvmSpec7.png",
      "https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d2/Zend_Engine_logo.png",
    ],
  },
  {
    item: "Kernel programming",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/5/5d/Windows_2000_architecture.svg",
      "https://upload.wikimedia.org/wikipedia/en/d/df/Freebsd_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg",
    ],
  },
];

const Why: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  return (
    <Slide backgroundColor="background">
      <Heading>Why C?</Heading>
      <div className="w-full grid grid-cols-2 h-full">
        <UnorderedList className="list-[square]">
          {reasons.map((reason) => (
            <Appear key={reason.item}>
              <ListItem>{reason.item}</ListItem>
              <Stepper tagName="p" values={reason.images}>
                {(value, _, isActive) => {
                  if (imageRef.current && pRef.current && isActive) {
                    imageRef.current.className =
                      "rounded-xl h-80 object-contain border-2 border-slate-700";
                    imageRef.current.src = value as string;
                    pRef.current.innerHTML = value as string;
                  }
                  return <></>;
                }}
              </Stepper>
            </Appear>
          ))}
        </UnorderedList>
        <div className="w-full h-full flex flex-col items-center">
          <img ref={imageRef} />
          <p ref={pRef} />
        </div>
      </div>
    </Slide>
  );
};

export { Why };
