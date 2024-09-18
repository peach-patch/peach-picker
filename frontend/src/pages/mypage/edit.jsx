import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";
import Input from "@/components/login/Input";
import Button from "@/components/button/Button";
import ImageUploadAndCrop from "@/components/register/ImgUpload";

export default function Edit() {
  const { isLoggedIn, token, isInitialized, initialize } = useAuthStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [message, setMessage] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      setMessage("로그인이 필요합니다.");
      router.push("/login");
    } else if (isInitialized && isLoggedIn) {
      const storedName = localStorage.getItem("userName");
      const storedEmail = localStorage.getItem("email");
      const storedProfileImg = localStorage.getItem("profileImg");
      setEmail(storedEmail);
      setUsername(storedName);
      setProfileImg(storedProfileImg);
    }
  }, [isInitialized, isLoggedIn, token, router]);

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleUpdateProfile = async () => {
    if (!username) {
      setUsernameMessage("사용자 이름을 입력해야 합니다.");
      return;
    } else {
      setUsernameMessage("");
    }

    try {
      const formData = new FormData();
      formData.append("name", username);

      if (profileImg) {
        const blob = dataURLtoBlob(profileImg);
        formData.append("profileImg", blob, "profileImg.png");
      }

      const response = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("프로필 업데이트에 실패했습니다.");
      }

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        localStorage.setItem("email", data.email);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("profileImg", data.profileUrl);

        setUsername(data.name);
        setEmail(data.email);
        setProfileImg(data.profileUrl);

        setMessage("프로필이 성공적으로 업데이트되었습니다.");
      } else if (contentType.includes("text/plain")) {
        const textData = await response.text();
        localStorage.setItem("userName", username);
        localStorage.setItem("profileImg", profileImg);
      } else {
        const textData = await response.text();
        alert(textData);
      }

      router.push("/mypage");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error);
      setMessage("프로필 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-2/3 mb-20 relative max-w-[606px] flex flex-col">
        <div className="relative mb-1 mt-15 left-0 w-[103px] h-[38px] text-[20px] flex flex-col justify-center">
          회원 정보
        </div>
        <div className="w-full mb-3 h-0 border-[1px] border-solid border-[#000]"></div>
        <div className="w-full center1">
          <ImageUploadAndCrop
            onImageSelect={(croppedImage) => setProfileImg(croppedImage)}
          />
        </div>

        <Input
          title="Username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setUsernameMessage("");
          }}
        />

        {usernameMessage && (
          <div className="absolute left-[27px] top-[70px] text-red-500 text-[10px]">
            {usernameMessage}
          </div>
        )}

        <Input
          title="Email"
          type="text"
          value={email}
          readOnly
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex gap-2 mt-20 mb-2">
          <Button
            text="회원정보 수정"
            className="bg-[#fb5e67] w-full py-5 text-white"
            onClick={handleUpdateProfile}
          />

          <Button text="탈퇴" className="py-5 border-[#808080] border w-full" />
        </div>
        <Button
          text="취소"
          onClick={() => router.push("/mypage")}
          className="border py-5 border-[#808080]"
        />
      </div>
    </div>
  );
}
