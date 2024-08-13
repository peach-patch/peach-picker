import React, { useState, useEffect } from "react";
import Image from "next/image";
import waterpeach from "../../images/water.png";
import drypeach from "../../images/drypeach.png";
import paper from "../../images/paper.jpg";
import logo from "../../images/thirdLogo.png";
import to from "../../images/to.png";
import registernow from "../../images/registernow.png";

export default function ThirdView() {
  const imagesSection1 = [paper];
  const imagesSection2 = [waterpeach, drypeach];

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setIndex1((prevIndex) => (prevIndex + 1) % imagesSection1.length);
    }, 3000);

    const interval2 = setInterval(() => {
      setIndex2((prevIndex) => (prevIndex + 1) % imagesSection2.length);
    }, 3000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [imagesSection1.length, imagesSection2.length]);

  return (
    <div className="relative flex flex-col items-center justify-center w-2/3 pt-10 mt-10 min-w-[800px] bg-amber-50">
      <div className="w-1/6 mt-10">
        <Image src={logo} layout="responsive" alt="logo" />
      </div>
      <div className="flex">
        <section className="relative flex flex-col w-2/3">
          <div className="w-full pt-4 pr-20 h-2/3">
            <Image
              src={imagesSection1[index1]}
              layout="responsive"
              alt="section 1 image"
              className="m-2 mb-10"
            />
            <Image
              src={registernow}
              alt="register now"
              layout="responsive"
              className="mt-10"
            />
            <div className="flex items-center justify-end mt-10">
              <div className="flex items-center w-1/2 mt-10">
                기분 좋은 해결책을 얻으세요.
                <br /> That brings you back to life.
                <div className="w-1/5">
                  <Image src={to} layout="responsive" alt="to" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative flex-shrink-0 w-1/3 pt-4">
          <div className="pb-10 mr-8">
            확인하세요. 음미하세요. 차단하세요. Peach Picker는 힘들고 무거운
            세상 속에서 순간에 몰입하고 싶은 사람들을 위해 작은 경험들을
            고양시켜 줍니다.
          </div>
          <Image
            src={imagesSection2[index2]}
            layout="responsive"
            alt="section 2 image"
            className="m-2 mb-10"
          />
        </section>
      </div>
    </div>
  );
}
