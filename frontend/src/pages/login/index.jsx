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
      <div className="w-1/5 min-w-60">
        <div className="flex items-center">
          <input type="checkbox" className="w-5 h-5 text-gray form-checkbox" />
          <span className="ml-2 mr-3">로그인 유지</span>
          <input type="checkbox" className="w-5 h-5 text-gray form-checkbox" />
          <span className="ml-2">아이디 저장</span>
        </div>
        <div className="mt-2 flex items-center  w-full py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="text"
            className=" bg-[#f8f8f8] ml-2 text-[20px] outline-none text-gray-500 "
            defaultValue="아이디"
          />
        </div>
        <div className="my-5 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="text"
            className=" bg-[#f8f8f8] ml-2 text-[20px] text-gray-500 outline-none  "
            defaultValue="비밀번호"
          />
        </div>

        <BasicBtn text={"로그인"} bgColor={"#fb5e67"} textColor={"#fff"} />
        <div className="flex m-1">
          <div className="font-bold">회원가입 |</div>
          <div>아이디/비밀번호 찾기</div>
        </div>
      </div>
      <div className="m-5 center1">
        <div className="flex-grow h-px bg-gray-400"></div>
        <div className="text-gray">소셜 계정으로 간편 로그인</div>
        <div className="flex">
          <Image src={kakao} width={50} className="m-3" />
          <Image src={google} width={50} className="m-3" />
          <Image src={naver} width={50} className="m-3" />
        </div>
      </div>
    </div>
  );
};

export default index;
