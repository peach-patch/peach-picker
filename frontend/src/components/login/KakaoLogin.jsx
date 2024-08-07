import React, { useEffect } from "react";
import kakao from "../../images/kakao.png";
import Image from "next/image";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
const CLIENT_ENV = process.env.CLIENT_ENV;

const KakaoLogin = () => {
  console.log("로그인시작");
  const router = useRouter();
  const { login } = useAuthStore();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(KAKAO_KEY);
      console.log("Kakao SDK initialized with key:", KAKAO_KEY);
    }
  }, []);

  const handleKakaoLogin = () => {
    console.log("클릭");
    if (typeof window === "undefined" || !window.Kakao) {
      console.error("Kakao SDK not loaded");
      return;
    }
    console.log("Starting Kakao login process...");
    console.log(`${window.location.origin}/api/oauth/kakao`);
    window.Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/api/oauth/kakao`,
    });
  };

  return (
    <div onClick={handleKakaoLogin}>
      <Image src={kakao} width={40} className="m-3" alt="kakao login" />
    </div>
  );
};

export default KakaoLogin;
