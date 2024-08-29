import React from "react";
import dynamic from "next/dynamic";

const Roulette = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.default),
  { ssr: false }
);

const RouletteComponent = ({ mustSpin, prizeIndex, data, onStopSpinning }) => (
  <Roulette
    mustStartSpinning={mustSpin}
    prizeNumber={prizeIndex}
    data={data}
    onStopSpinning={onStopSpinning}
  />
);

export default RouletteComponent;
