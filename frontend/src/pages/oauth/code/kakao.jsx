// pages/oauth/code/kakao.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuthStore from "../../../store/authStore";

const KakaoOAuthCallback = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  useEffect(() => {
    const handleKakaoResponse = async (code) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/kakao-login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code,
              client_env: process.env.CLIENT_ENV,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          login(data.token, true);
          console.log(data.user, "User information");
          localStorage.setItem("userName", data.user.properties.nickname);
          localStorage.setItem(
            "userProfile",
            data.user.properties.profile_image
          );
          console.log("유저 데이터 확인", data.user);
          alert("로그인 성공!");
          router.push("/mypage");
        } else {
          console.error("로그인 실패:", data.message);
          alert("로그인 실패: " + data.message);
        }
      } catch (error) {
        console.error("카카오 로그인 실패:", error);
        alert("카카오 로그인 실패: " + error.message);
      }
    };

    const { code } = router.query;
    if (code) {
      handleKakaoResponse(code);
    }
  }, [router.query]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoOAuthCallback;
