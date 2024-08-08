export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { code } = req.query;
  console.log("Received code:", code);

  const bodyParams = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
    code,
  });

  try {
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

      if (userRes.ok) {
        return res.status(200).json({
          message: "로그인 성공",
          token: accessToken,
          user: userData,
        });
      } else {
        console.log("카카오 사용자 정보 가져오기 오류:", userData);
        return res
          .status(userRes.status)
          .json({ message: userData.msg || "사용자 정보 가져오기 실패" });
      }
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
