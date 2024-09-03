import React, { useState, useEffect } from "react";
import peach_logo from "../../../public/peach_logo.png";
import kakao from "../../images/kakao.png";
import google from "../../images/google.png";
import naver from "../../images/naver.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import KakaoLogin from "@/components/login/KakaoLogin";
import useAuthStore from "../../store/authStore";
import Input from "@/components/login/Input";
import Button from "@/components/button/Button";

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
      console.log(data, "데이터 확인");
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
    <div className="flex flex-col mt-20 overflow-hidden">
      <div className="flex items-center justify-center flex-grow">
        <div className="flex flex-col items-center center1">
          <div className="text-6xl font-Radio">피치피커</div>

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
            <Input
              type="text"
              value={email}
              placeholder="아이디"
              onChange={(e) => setEmail(e.target.value)}
              className="w-4/6"
            />

            <Input
              type="password"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-red-500 mb-5 text-[10px]">{message}</div>
            <Button
              type="submit"
              text="로그인"
              className="text-white w-full py-4 bg-[#fb5e67]"
            />

            <div className="flex m-1 mt-4">
              <div className="text-sm font-bold">
                <Link href={"/login/signup"}>회원가입 |</Link>
              </div>
              <div className="ml-1 text-sm">아이디/비밀번호 찾기</div>
            </div>
          </form>
          <div className="w-1/5 mt-4 center1">
            <div className="flex items-center w-full min-w-60">
              <div className="w-2/12 border-[1px] border-[#808080]"></div>
              <div className="w-10/12 text-sm text-center text-gray-500">
                소셜 계정으로 간편 로그인
              </div>
              <div className="w-2/12 border-[1px] border-[#808080]"></div>
            </div>
          </div>
          <KakaoLogin />
        </div>
      </div>
    </div>
  );
};

export default Index;
