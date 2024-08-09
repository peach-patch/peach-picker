import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuthStore from "../../../store/authStore";

const KakaoOAuthCallback = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  useEffect(() => {
    const { code } = router.query;

    if (code) {
      console.log("코드 확인:", code);

      const sendCodeToBackend = async (code) => {
        try {
          const response = await fetch("/api/users/kakao-login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code,
              client_env: "dev",
            }),
          });

          const data = await response.json();

          if (response.ok) {
            const accessToken = data.accessToken;
            login(accessToken, true);
            alert("로그인 성공!");
            router.push("/");
          } else {
            console.error("로그인 실패:", data.message);
            alert("로그인 실패: " + data.message);
          }
        } catch (error) {
          console.error("카카오 로그인 처리 실패:", error);
          alert("카카오 로그인 처리 실패: " + error.message);
        }
      };

      sendCodeToBackend(code);
    } else {
      console.log("코드가 없습니다.");
    }
  }, [router.query, login, router]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoOAuthCallback;
