import React, { useState, useEffect, memo } from "react";
import Image from "next/image";
import waterpeach from "../../images/water.png";
import drypeach from "../../images/drypeach.png";
import paper from "../../images/paper.jpg";
import logo from "../../images/thirdLogo.png";
import to from "../../images/to.png";
import registernow from "../../images/registernow.png";

const Section1 = memo(() => {
  const images = [paper];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full pr-20 h-2/3">
      <Image
        src={images[index]}
        layout="responsive"
        alt="section 1 image"
        className="m-2 mb-10"
      />
      <Image
        src={registernow}
        alt="register now"
        layout="responsive"
        className=""
      />
      <div className="flex items-center justify-end ">
        <div className="flex items-center w-1/2">
          기분 좋은 해결책을 얻으세요.
          <br /> That brings you back to life.
          <div className="w-1/5">
            <Image src={to} layout="responsive" alt="to" />
          </div>
        </div>
      </div>
    </div>
  );
});

const Section2 = memo(() => {
  console.log("22222");
  const images = [waterpeach, drypeach];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative flex-shrink-0 w-1/3 pt-4">
      <div className="pb-4 mr-8">
        확인하세요. 음미하세요. 차단하세요. Peach Picker는 힘들고 무거운 세상
        속에서 순간에 몰입하고 싶은 사람들을 위해 작은 경험들을 고양시켜 줍니다.
      </div>
      <Image
        src={images[index]}
        layout="responsive"
        alt="section 2 image"
        className="m-2 mb-10"
      />
    </div>
  );
});

const ThirdView = () => {
  console.log("3번째");

  return (
    <div className="relative flex flex-col items-center justify-center w-2/3 pt-10  min-w-[800px] bg-amber-50">
      <div className="w-1/6 mt-10">
        <Image src={logo} layout="responsive" alt="logo" />
      </div>
      <div className="flex">
        <Section1 />
        <Section2 />
      </div>
    </div>
  );
};

export default memo(ThirdView);
