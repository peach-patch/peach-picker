// useRegisterForm.js
export const useRegisterForm = () => {
  const handleSubmit = async (
    eventName,
    selectedDay,
    method,
    winnerCnt,
    file
  ) => {
    const formData = new FormData();
    formData.append("title", eventName);
    formData.append("drawingAt", selectedDay.toISOString());
    formData.append("drawingType", method);
    formData.append("winner", winnerCnt);

    if (file) {
      formData.append("participants", file);
    }

    const serverUrl = "https://your-server-url.com/drawing/register";

    try {
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${yourJwtToken}`, // 필요한 경우 JWT 토큰을 추가
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { handleSubmit };
};
