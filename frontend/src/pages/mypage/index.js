import React from "react";
import pick_line from "../../images/pick_line.png";
import Image from "next/image";

export default function mypage() {
  return (
    <div className="flex flex-col justify-center mt-20 mb-20 items-center">
      <div className="text-[20px] w-[380px] mb-2">기본 정보</div>
      <div className="flex flex-col justify-evenly w-[380px] h-[127px] bg-[#fff] border-[1px] border-solid border-[#000]">
        <div className=" ml-5 text-[18px]  ">Username : 아이스아메리</div>
        <div className=" ml-5 text-[18px] ">Email : barcardi26@gmail.com</div>
      </div>
      <div className="mt-10 text-[20px] w-[380px] mb-2">나의 추첨 현황</div>
      <div className="w-[383px] h-[138px]">
        <div className="relative w-[383px] h-[138px] bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <div className="absolute left-[60px] top-0 w-[90px] h-[51px] text-[18px] flex flex-col justify-center">
            추첨 예정
          </div>
          <div className="absolute left-[60px] top-[56px] w-[78px] h-[51px] text-[32px]  text-center flex flex-col justify-center">
            0
          </div>
          <div className="absolute left-[250px] top-[56px] w-[78px] h-[51px] text-[32px] text-center flex flex-col justify-center">
            2
          </div>
          <div className="absolute left-[250px] top-0 w-[90px] h-[51px] text-[18px]  flex flex-col justify-center">
            추첨 완료
          </div>
          <Image
            className="absolute left-[192px] top-[40px]"
            src={pick_line}
            height={80}
          ></Image>
        </div>
      </div>
      <div className="absolute left-[210px] top-[247px] w-[228px] h-[228px]"></div>
      <div className="relative mt-10 w-[379px] h-[77px] border-[1px] border-solid border-[#000] overflow-hidden">
        <div className="absolute left-[22px] top-[25px] w-[191px] text-[20px]  ">
          회원 정보 수정
        </div>
      </div>
      <div className="relative w-[379px] h-[77px] border-[1px] border-solid border-[#000] overflow-hidden">
        <div className="absolute left-[22px] top-[25px] w-[191px] text-[20px]  ">
          추첨내역 조회
        </div>
      </div>
    </div>
  );
}
