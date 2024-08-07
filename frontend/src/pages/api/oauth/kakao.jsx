// pages/api/oauth/kakao.js

export default async function handler(req, res) {
  console.log("Handler 시작");

  if (req.method !== "POST") {
    console.log("잘못된 메서드:", req.method);
    return res.status(405).json({ message: "Method not allowed 확인코드" });
  }

  const { code, client_env } = req.body;
  console.log("코드:", code, "클라이언트 환경:", client_env);

  const bodyParams = {
    grant_type: "authorization_code",
    client_id: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
    code,
  };

  // 로컬 환경인 경우에만 client_env 추가
  if (process.env.CLIENT_ENV === "dev" && client_env) {
    bodyParams.client_env = client_env;
  }

  console.log("바디 파람 확인", bodyParams);

  try {
    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: new URLSearchParams(bodyParams),
    });

    const data = await response.json();
    console.log("Response Data:", data);

    if (response.ok) {
      const accessToken = data.access_token;

      const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userData = await userRes.json();
      console.log("User Data:", userData);

      return res.status(200).json({
        message: "로그인 성공",
        token: accessToken,
        user: userData,
      });
    } else {
      console.log("카카오 API 응답 에러:", data);
      return res
        .status(response.status)
        .json({ message: data.error_description || "로그인 실패" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: error.message });
  }
}
