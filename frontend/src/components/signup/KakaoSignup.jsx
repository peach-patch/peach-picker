import React, { useEffect } from "react";
import kakao from "../../images/kakao_login.png";
import Image from "next/image";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL;

const KakaoSignup = () => {
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

  const handleKakaoSignup = () => {
    if (typeof window === "undefined" || !window.Kakao) {
      console.error("Kakao SDK not loaded");
      return;
    }
    console.log("Starting Kakao login process...");

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    console.log(isMobile);
    if (isMobile) {
      window.Kakao.Auth.authorize({
        redirectUri: REDIRECT_URL,
        success: (authObj) => {
          router.push(`/oauth/code/kakao?code=${authObj.code}`);
        },
        fail: function (err) {
          console.error("Kakao login failed", err);
          alert("카카오 로그인 실패: " + err.message);
        },
      });
    } else {
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
    }
  };

  return (
    <div
      onClick={handleKakaoSignup}
      className="mb-5 w-full justify-center flex items-center py-3 border-[1px] border-solid border-[#808080]"
    >
      <Image src={kakao} width={20} alt="Kakao Login" />
      <div className="ml-5">카카오 회원가입</div>
    </div>
  );
};

export default KakaoSignup;
