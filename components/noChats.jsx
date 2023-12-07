import Image from "next/image";
import React from "react";
import { Tilt } from "react-tilt";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

const NoChats = ({text}) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <Tilt options={defaultOptions} style={{ height: 250, width: 250 }}>
        <div className="relative h-72 w-72">
          <Image src="/empty.png" fill alt="Empty" />
        </div>
      <p className="text-muted-foreground text-lg text-center text-white ">
        {text}
      </p>
      </Tilt>
    </div>
  );
};

export default NoChats;
