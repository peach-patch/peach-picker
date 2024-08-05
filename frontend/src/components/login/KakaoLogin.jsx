import React, { useEffect } from "react";
import kakao from "../../images/kakao.png";
import Image from "next/image";
const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

const KakaoLogin = () => {
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
    console.log(
      `${process.env.NEXT_PUBLIC_API_URL}/users/kakao-login`,
      "백주소 확인"
    );
    window.Kakao.Auth.login({
      success: async function (authObj) {
        console.log(authObj);
        try {
          const userRes = await window.Kakao.API.request({
            url: "/v2/user/me",
          });
          console.log(userRes);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/kakao-login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                accessToken: authObj.access_token,
                refreshToken: authObj.refresh_token,
                kakaoAccount: userRes.kakao_account,
              }),
            }
          );

          const data = await response.json();
          console.log(data);

          if (response.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "/";
          } else {
            console.error("로그인 실패:", data.message);
          }
        } catch (error) {
          console.error("카카오 로그인 실패:", error);
        }
      },
      fail: function (err) {
        console.error("카카오 로그인 실패:", err);
      },
    });
  };

  return (
    <div onClick={handleKakaoLogin}>
      <Image src={kakao} width={40} className="m-3" alt="kakao login" />
    </div>
  );
};

export default KakaoLogin;
