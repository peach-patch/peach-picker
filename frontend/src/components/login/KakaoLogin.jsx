import React, { useEffect } from "react";
import kakao from "../../images/kakao.png";
import Image from "next/image";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL;

const KakaoLogin = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(KAKAO_KEY);
    }
  }, []);

  const handleKakaoLogin = () => {
    if (typeof window === "undefined" || !window.Kakao) {
      console.error("Kakao SDK not loaded");
      return;
    }
    console.log("Starting Kakao login process...");
    console.log(REDIRECT_URL, "확인확인");
    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URL,
    });
  };

  return (
    <div onClick={handleKakaoLogin}>
      <Image src={kakao} width={40} className="m-3" alt="kakao login" />
    </div>
  );
};

export default KakaoLogin;
