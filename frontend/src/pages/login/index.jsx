// src/pages/login/index.js
import React, { useState, useEffect } from "react";
import peach_logo from "../../../public/peach_logo.png";
import kakao from "../../images/kakao.png";
import google from "../../images/google.png";
import naver from "../../images/naver.png";
import Image from "next/image";
import BasicBtn from "@/components/button/BasicBtn";
import Link from "next/link";
import { useRouter } from "next/router";
import KakaoLogin from "@/components/login/KakaoLogin";
import useAuthStore from "../../store/authStore";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  const { isLoggedIn, login } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    login: state.login,
  }));

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    console.log("확인합니다");
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/sign-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);

        if (keepLoggedIn) {
          localStorage.setItem("token", data.accessToken);
        } else {
          sessionStorage.setItem("token", data.accessToken);
        }

        if (rememberMe) {
          localStorage.setItem("savedEmail", email);
        } else {
          localStorage.removeItem("savedEmail");
        }

        login(data.accessToken, keepLoggedIn);
        router.push("/mypage");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setMessage("로그인 실패");
    }
  };

  return (
    <div className="center1">
      <Image
        src={peach_logo}
        width={200}
        alt="Peach Logo"
        className="hidden sm:flex"
      />
      <form className="w-1/5 mt-10 min-w-60" onSubmit={handleLogin}>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-5 h-5 text-gray form-checkbox"
            checked={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
          />
          <span className="ml-2 mr-3 text-sm">로그인 유지</span>
          <input
            type="checkbox"
            className="w-5 h-5 text-gray form-checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="ml-2 text-sm">아이디 저장</span>
        </div>
        <div className="mt-2 flex items-center w-full py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="text"
            className="bg-[#f8f8f8] ml-3 text-[20px] outline-none"
            placeholder="아이디"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="password"
            className="bg-[#f8f8f8] ml-3 text-[20px] outline-none"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-red-500 mb-5 text-[10px]">{message}</div>

        <BasicBtn
          text={"로그인"}
          type="submit"
          bgColor={"#fb5e67"}
          textColor={"#fff"}
        />
        <div className="flex m-1 mt-4">
          <div className="text-sm font-bold">
            <Link href={"/login/signup"}>회원가입 |</Link>
          </div>
          <div className="ml-1 text-sm">아이디/비밀번호 찾기</div>
        </div>
      </form>
      <div className="w-1/5 m-4 center1">
        <div className="flex items-center w-full min-w-60">
          <div className="w-2/12 border-[1px] border-[#808080]"></div>
          <div className="w-10/12 text-sm text-center text-gray-500">
            소셜 계정으로 간편 로그인
          </div>
          <div className="w-2/12 border-[1px] border-[#808080]"></div>
        </div>
        <div className="flex justify-center">
          <KakaoLogin />
          <Image src={google} width={40} className="m-3" alt="Google" />
          <Image src={naver} width={40} className="m-3" alt="Naver" />
        </div>
      </div>
    </div>
  );
};

export default Index;
