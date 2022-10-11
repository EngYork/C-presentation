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
      "https://m.media-amazon.com/images/I/71Q9d6N7xkL._AC_SX679_.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7a/CM_4_TOP_DOWN_ON_WHITE.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Honda_CIVIC_TYPE_R_%28FL5%29_interior.jpg",
      "",
    ],
  },
  {
    item: "Other languages rely on C",
    images: [
      "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
      "",
    ],
  },
  {
    item: "Kernel programming",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/e/e2/Windows_logo_and_wordmark_-_2021.svg",
      "https://upload.wikimedia.org/wikipedia/en/d/df/Freebsd_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg",
      "",
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
                {(value, step, isActive) => {
                  if (imageRef.current && pRef.current && isActive) {
                    // Kinda hacky
                    if (step != reason.images.length - 1) {
                      imageRef.current.className =
                        "rounded-xl h-80 object-contain border-2 border-slate-700";
                      imageRef.current.src = value as string;
                      pRef.current.innerHTML = `Image source: ${
                        value as string
                      }`;
                    }
                  }
                  return <></>;
                }}
              </Stepper>
            </Appear>
          ))}
        </UnorderedList>
        <div className="w-full h-full flex flex-col items-center break-all">
          <img ref={imageRef} />
          <p ref={pRef} />
        </div>
      </div>
    </Slide>
  );
};

export { Why };
