export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { code, client_env } = req.body;
  console.log(client_env, "이게 있어야 함");
  try {
    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
        redirect_uri: process.env.REDIRECT_URL,
        code,
      }),
    });

    const data = await response.json();

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
    return res.status(500).json({ message: error.message });
  }
}
