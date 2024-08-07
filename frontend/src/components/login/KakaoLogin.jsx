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

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    console.log(isMobile);
    if (isMobile) {
      window.Kakao.Auth.authorize({
        redirectUri: REDIRECT_URL,
        success: (authObj) => {
          router.push(
            `https://kauth.kakao.com/oauth/code/kakao?code=${authObj.code}`
          );
        },
        fail: function (err) {
          console.error("Kakao login failed", err);
          alert("카카오 로그인 실패: " + err.message);
        },
      });
    } else {
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
      console.log(
        `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`,
        "왱"
      );
    }
  };

  return (
    <div onClick={handleKakaoLogin}>
      <Image src={kakao} width={40} className="m-3" alt="kakao login" />
    </div>
  );
};

export default KakaoLogin;
