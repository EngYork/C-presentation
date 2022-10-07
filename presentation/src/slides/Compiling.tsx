import React from "react";
import { Appear, Heading, Slide } from "spectacle";
import { IconContext } from "react-icons";
import { MdChevronRight } from "react-icons/md";

const Compiling: React.FC = () => {
  return (
    <Slide backgroundColor="background">
      <Heading>Compiling</Heading>
      <div className="w-full h-2/3 relative grid grid-cols-1">
        <div className="mx-auto my-auto rounded-xl border-2 border-slate-900 flex flex-col p-4">
          <p className="text-5xl mx-auto bg-gradient-to-r from-indigo-500 via-pink-400 to-red-500 text-transparent bg-clip-text font-bold">
            What people call ✨compiler✨
          </p>
          <div className="grid grid-cols-3 w-full text-center text-4xl p-4 my-4">
            <Appear priority={0}>
              <div className="flex flex-col items-center">
                <p className="text-indigo-500">Compiler ⚙️</p>
                <Appear priority={2}>
                  <IconContext.Provider
                    value={{
                      className: "rotate-90 my-4 mx-auto fill-indigo-500",
                      size: "35",
                    }}
                  >
                    <MdChevronRight />
                  </IconContext.Provider>
                  <p className="text-indigo-500">Generates "objects"</p>
                </Appear>
              </div>
            </Appear>
            <Appear priority={4}>
              <div className="h-full flex">
                <IconContext.Provider
                  value={{
                    className: "my-4 mx-auto fill-pink-500 my-auto",
                    size: "55",
                  }}
                >
                  <MdChevronRight />
                </IconContext.Provider>
              </div>
            </Appear>
            <Appear priority={1}>
              <div className="flex flex-col items-center">
                <p className="text-red-500">Linker 🔗</p>
                <Appear priority={3}>
                  <IconContext.Provider
                    value={{
                      className: "rotate-90 my-4 mx-auto fill-red-500",
                      size: "35",
                    }}
                  >
                    <MdChevronRight />
                  </IconContext.Provider>
                  <p className="text-red-500">"Links" objects</p>
                </Appear>
              </div>
            </Appear>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export { Compiling };
