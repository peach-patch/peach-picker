export default async function handler(req, res) {
  console.log("암것도안나오나");
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { code, client_env } = req.body;
  const bodyParams = {
    grant_type: "authorization_code",
    client_id: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
    redirect_uri: process.env.REDIRECT_URL,
    code,
  };

  // 로컬 환경인 경우에만 client_env 추가
  if (process.env.CLIENT_ENV === "dev" && client_env) {
    bodyParams.client_env = client_env;
  }

  console.log("Body Params:", bodyParams);

  try {
    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
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

      return res.status(200).json({
        message: "로그인 성공",
        token: accessToken,
        user: userData,
      });
    } else {
      return res
        .status(response.status)
        .json({ message: data.error_description || "로그인 실패" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: error.message });
  }
}
