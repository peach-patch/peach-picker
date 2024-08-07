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
        success: handleKakaoResponse,
        fail: function (err) {
          console.error("Kakao login failed", err);
        },
      });
    } else {
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
    }
  };

  const handleKakaoResponse = async (authObj) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/kakao-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: authObj.code,
            client_env: process.env.CLIENT_ENV,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        login(data.token, true);
        console.log(data.user, "정보확인해본당");
        localStorage.setItem("userName", data.user.properties.nickname);
        localStorage.setItem("userProfile", data.user.properties.profile_image);

        alert("로그인 성공!");
        router.push("/mypage");
      } else {
        console.error("로그인 실패:", data.message);
      }
    } catch (error) {
      console.error("카카오 로그인 실패:", error);
    }
  };

  return (
    <div onClick={handleKakaoLogin}>
      <Image src={kakao} width={40} className="m-3" alt="kakao login" />
    </div>
  );
};

export default KakaoLogin;
