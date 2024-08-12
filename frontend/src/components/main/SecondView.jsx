import React from "react";
import register from "../../../public/register.png";
import dailycheck from "../../../public/dailycheck.png";
import follow from "../../../public/follow.png";
import possible from "../../../public/possible.png";
import tips from "../../../public/tips.png";
import Image from "next/image";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "./Carousel";

export default function SecondView() {
  const images = [register, dailycheck, follow, possible, tips];
  return (
    <div className="flex items-center justify-center h-full">
      <Carousel images={images} />
      {/* <section className="w-3/4 md:w-1/2">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          centerMode
          centerSlidePercentage={33.3}
          showStatus={false}
        >
          <div>
            <Image
              src={dailycheck}
              layout="responsive"
              width={100}
              height={100}
              alt="Daily Check"
              className="m-2"
            />
          </div>
          <div>
            <Image
              src={register}
              layout="responsive"
              width={100}
              height={100}
              alt="Register"
              className="m-2"
            />
          </div>
          <div>
            <Image
              src={possible}
              layout="responsive"
              width={100}
              height={100}
              alt="Possible"
              className="m-2"
            />
          </div>
          <div>
            <Image
              src={tips}
              layout="responsive"
              width={100}
              height={100}
              alt="Tips"
              className="m-2"
            />
          </div>
          <div>
            <Image
              src={follow}
              layout="responsive"
              width={100}
              height={100}
              alt="Follow"
              className="m-2"
            />
          </div>
        </Carousel>
      </section> */}
    </div>
  );
}
