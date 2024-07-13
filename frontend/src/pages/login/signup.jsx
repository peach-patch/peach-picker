import React from "react";
import BasicBtn from "../../components/button/BasicBtn";
import Image from "next/image";
import peach_logo from "../../../public/peach_logo.png";
import kakao from "../../images/kakao_login.png";
const signup = () => {
  return (
    <div className="flex flex-col justify-center mb-10 items-center ">
      <Image src={peach_logo} width={200} />
      <div className="w-1/5 mt-10 min-w-60">
        <div className="mb-5  w-full justify-center flex items-center py-3 border-[1px] border-solid border-[#808080]">
          <Image src={kakao} width={20} />
          <div className="ml-5">카카오 로그인</div>
        </div>
        <div className="w-full mb-5 flex items-center">
          <div className=" w-5/12 h-[1px] border-[1px]  border-[#808080]"></div>
          <div className="w-2/12 text-sm text-gray-500 text-center">혹은</div>
          <div className=" w-5/12 border-[1px] h-[1px]  border-[#808080]"></div>
        </div>
        <div>Username</div>
        <div className="mb-5 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="text"
            className=" bg-[#f8f8f8] ml-3 text-[20px] outline-none  "
            placeholder="Enter username"
          />
        </div>
        <div className="">Email</div>{" "}
        <div className="mb-5 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="text"
            className=" bg-[#f8f8f8] ml-3 text-[20px] outline-none  "
            placeholder="Enter email"
          />
        </div>{" "}
        <div>Password</div>
        <div className="mb-5 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="text"
            className=" bg-[#f8f8f8] ml-3 text-[20px] outline-none  "
            placeholder="Enter Password"
          />
        </div>{" "}
        <div>Confirm Password</div>
        <div className="mb-5 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="text"
            className=" bg-[#f8f8f8] ml-3 text-[20px] outline-none  "
            placeholder="Enter password"
          />
        </div>
        <BasicBtn text={"Submit"} bgColor={"#fb5e67"} textColor={"#fff"} />
      </div>
    </div>
  );
};

export default signup;
