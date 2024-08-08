import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuthStore from "../../../store/authStore";

const KakaoOAuthCallback = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  useEffect(() => {
    console.log("이동 확인됨.... ");
    const handleKakaoResponse = async (code) => {
      try {
        const bodyParams = new URLSearchParams({
          grant_type: "authorization_code",
          client_id: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
          redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
          code,
        });

        const response = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          body: bodyParams,
        });

        const data = await response.json();
        console.log("Token response:", data);

        if (response.ok) {
          const accessToken = data.access_token;

          // 사용자 정보 요청
          const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const userData = await userRes.json();
          console.log("User data:", userData);

          localStorage.setItem("userName", userData.properties.nickname);
          localStorage.setItem(
            "userProfile",
            userData.properties.profile_image
          );
          localStorage.setItem("email", userData.kakao_account.email);

          login(accessToken, true);
          console.log("유저 데이터 확인", userData.kakao_account.email);
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
