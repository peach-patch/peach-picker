import React from "react";
import peach_logo from "../../../public/peach_logo.png";
import kakao from "../../images/kakao.png";
import google from "../../images/google.png";
import naver from "../../images/naver.png";
import Image from "next/image";
const index = () => {
  return (
    <div className="center1">
      <Image src={peach_logo} width={300} />
      <div className="center2">
        <Image src={kakao} width={50} />
        <Image src={google} width={50} />
        <Image src={naver} width={50} />
      </div>
    </div>
  );
};

export default index;
