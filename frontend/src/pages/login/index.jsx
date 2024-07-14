import React, { useState } from "react";
import peach_logo from "../../../public/peach_logo.png";
import kakao from "../../images/kakao.png";
import google from "../../images/google.png";
import naver from "../../images/naver.png";
import Image from "next/image";
import BasicBtn from "@/components/button/BasicBtn";
import Link from "next/link";
const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://maewakka123.iptime.org:31765/users/sign-in",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setMessage(data.message);
      sessionStorage.setItem("token", data.token); // sessionStorage에 토큰 저장
      window.location.href = "/";
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="center1">
      <Image src={peach_logo} width={300} />
      <form className="w-1/5 mt-10 min-w-60 " onSubmit={handleLogin}>
        <div className="flex items-center">
          <input type="checkbox" className="w-5  h-5 text-gray form-checkbox" />
          <span className="ml-2 text-sm mr-3">로그인 유지</span>
          <input type="checkbox" className="w-5 h-5 text-gray form-checkbox" />
          <span className="ml-2 text-sm">아이디 저장</span>
        </div>
        <div className="mt-2 flex items-center  w-full py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="text"
            className=" bg-[#f8f8f8] ml-3 text-[20px] outline-none "
            placeholder="아이디"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="password"
            className=" bg-[#f8f8f8] ml-3 text-[20px] outline-none  "
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-red-500 mb-5 text-[10px]">{message}</div>

        <BasicBtn
          text={"로그인"}
          // onClick={handleLogin}
          type="submit"
          bgColor={"#fb5e67"}
          textColor={"#fff"}
        />
        <div className="flex mt-4 m-1">
          <div className="font-bold text-sm">
            <Link href={"/login/signup"}>회원가입 |</Link>
          </div>
          <div className="text-sm ml-1">아이디/비밀번호 찾기</div>
        </div>
      </form>
      <div className="m-4 center1">
        <div className="flex items-center min-w-60 w-full">
          <div className=" w-2/12  border-[1px]  border-[#808080]"></div>
          <div className="text-gray-500 text-center text-sm w-10/12">
            소셜 계정으로 간편 로그인
          </div>
          <div className=" w-2/12 border-[1px]  border-[#808080]"></div>
        </div>
        <div className="flex">
          <Image src={kakao} width={40} className="m-3" />
          <Image src={google} width={40} className="m-3" />
          <Image src={naver} width={40} className="m-3" />
        </div>
      </div>
    </div>
  );
};

export default index;
