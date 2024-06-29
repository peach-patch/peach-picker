import { useState, EventHandler, ReactNode } from "react";

export default function edit() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-2/3 relative max-w-[606px] flex flex-col">
        <div className="relative mb-1 mt-20 left-0 w-[103px] h-[38px] text-[20px] flex flex-col justify-center">
          회원 정보
        </div>
        <div className=" w-full mb-3 h-0 border-[1px] border-solid border-[#000]"></div>
        <div className="mb-1 w-[112px] text-[20px] ">Username</div>
        <div className="relative w-full h-[70px] flex flex-col">
          <div className="absolute left-0 w-full h-[70px] bg-[#f8f8f8] border-[1px] border-solid border-[#808080]"></div>
          <input
            type="text"
            className="absolute bg-[#f8f8f8] top-[50%] transform -translate-y-1/2 left-[27px] text-[20px] outline-none  defaultValue-black"
            defaultValue="소유니"
          />
        </div>
        <div className="mt-4 mb-1 w-[112px] text-[20px]">Email</div>
        <div className="relative w-full h-[70px] flex flex-col">
          <div className="absolute left-0 w-full h-[70px] bg-[#f8f8f8] border-[1px] border-solid border-[#808080]"></div>
          <input
            type="text"
            className="absolute bg-[#f8f8f8] top-[50%] transform -translate-y-1/2 left-[27px] text-[20px] outline-none  defaultValue-black"
            defaultValue="barcardi26@gmail.com"
          />
        </div>
        <div className="text-[20px] mb-1 mt-4">Password</div>
        <div className="relative w-full h-[70px] flex flex-col">
          <div className="absolute left-0 w-full h-[70px] bg-[#f8f8f8] border-[1px] border-solid border-[#808080]"></div>
          <input
            type="text"
            className="absolute bg-[#f8f8f8] top-[50%] transform -translate-y-1/2 left-[27px] text-[20px] outline-none"
            placeholder="Enter Password"
          />
        </div>
        <div className="mt-4 mb-1 w-[200px] text-[20px] ">Confirm Password</div>
        <div className="relative w-full h-[70px] flex flex-col">
          <div className="absolute left-0 w-full h-[70px] bg-[#f8f8f8] border-[1px] border-solid border-[#808080]"></div>
          <input
            type="text"
            className="absolute bg-[#f8f8f8] top-[50%] transform -translate-y-1/2 left-[27px] text-[20px] outline-none  defaultValue-black"
            placeholder="Enter Password"
          />
        </div>
        <div className="flex mt-20">
          <div className="flex items-center justify-center w-1/2 mr-2 h-[70px] bg-[#fb5e67] rounded-[5px]">
            <div className=" text-[20px] text-[#fff] text-center whitespace-nowrap">
              회원정보 수정
            </div>
          </div>
          <div className=" w-1/2 ml-2 h-[70px] flex items-center justify-center bg-[#fff] border-[1px] border-solid border-[#808080] rounded-[5px]">
            <div className="text-[20px] text-center">탈퇴</div>
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-center items-center w-full h-[70px] bg-[#fff] border-[1px] border-solid border-[#808080] rounded-[5px]">
          <div className=" text-[20px]">취소</div>
        </div>
      </div>
    </div>
  );
}
