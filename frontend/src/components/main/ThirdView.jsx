import React from "react";
import Image from "next/image";
import waterpeach from "../../images/water.png";
import drypeach from "../../images/drypeach.png";
import paper from "../../images/paper.jpg";
import ball from "../../images/ball.jpg";
import registernow from "../../images/registernow.png";
export default function ThirdView() {
  return (
    <div className="flex w-1/2 bg-amber-50">
      <section className="w-1/3">
        <Image src={ball} width={100} alt="dried peach" className="m-2" />
        <Image src={paper} width={100} alt="dried peach" className="m-2" />
        <div>Get your feel good fix that brings you back to life.</div>
      </section>
      <section className="w-2/3">
        <div>
          Check in. Chew up. Tune out. Peach Picker helps elevate
          micro-experiences for those who want to check-in to the moment in a
          hard and heavy world.
        </div>
        <Image src={waterpeach} width={100} alt="water peach" />
        <Image src={registernow} width={100} alt="registernow" />
        <Image src={drypeach} width={100} alt="dried peach" className="m-2" />
      </section>
    </div>
  );
}
