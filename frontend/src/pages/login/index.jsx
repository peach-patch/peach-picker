import React from "react";
import peach_logo from "../../../public/peach_logo.png";
import kakao from "../../images/kakao.png";
import google from "../../images/google.png";
import naver from "../../images/naver.png";
import Image from "next/image";
import BasicBtn from "@/components/button/BasicBtn";
const index = () => {
  return (
    <div className="center1">
      <Image src={peach_logo} width={300} />
      <div className="w-1/5">
        <input type="checkbox" className="w-5 h-5 text-gray form-checkbox" />
        <span className="ml-2">로그인 유지</span>
        <input type="checkbox" className="w-5 h-5 text-gray form-checkbox" />
        <span className="ml-2">아이디 저장</span>
        <div className=" w-full py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="text"
            className=" bg-[#f8f8f8] top-[50%] transform -translate-y-1/2 left-[27px] text-[20px] outline-none  "
            defaultValue="아이디"
          />
        </div>
        <div className="my-5 w-full py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="text"
            className=" bg-[#f8f8f8] top-[50%] transform -translate-y-1/2 left-[27px] text-[20px] outline-none  "
            defaultValue="비밀번호"
          />
        </div>

        <BasicBtn text={"로그인"} bgColor={"#fb5e67"} textColor={"#fff"} />
        <div className="font-bold">회원가입 |</div>
        <div>아이디/비밀번호 찾기</div>
      </div>
      <div className="center1">
        <div>소셜 계정으로 간편 로그인</div>
        <div className="flex">
          <Image src={kakao} width={50} />
          <Image src={google} width={50} />
          <Image src={naver} width={50} />
        </div>
      </div>
    </div>
  );
};

export default index;
