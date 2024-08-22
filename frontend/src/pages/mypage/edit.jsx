import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";
import Image from "next/image";
import Input from "@/components/login/Input";
import Button from "@/components/button/Button";

export default function Edit() {
  const { isLoggedIn, token, isInitialized, initialize } = useAuthStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const router = useRouter();
  const fileInputRef = useRef(null);
  const handleCancel = () => {
    router.push("/mypage");
  };

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

  const handleUpdateProfile = async () => {
    console.log("왜?", username);
    console.log("왜?", profileImg);
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
        formData.append("profileImg", profileImg);
      }
      console.log(formData.get("name"));
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
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

  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImg(file);
    }
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-2/3 mb-20 relative max-w-[606px] flex flex-col">
        <div className="relative mb-1 mt-15 left-0 w-[103px] h-[38px] text-[20px] flex flex-col justify-center">
          회원 정보
        </div>
        <div className="w-full mb-3 h-0 border-[1px] border-solid border-[#000]"></div>
        <div className="w-full center1">
          <section className="relative mt-10 mb-5 overflow-hidden rounded-full w-60 h-60">
            <Image
              src={profileImg}
              layout="fill"
              objectFit="cover"
              alt="Profile Image"
            />
          </section>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleProfilePicChange}
            accept="image/*"
          />
          <div className="mb-10 cursor-pointer" onClick={handleProfilePicClick}>
            프로필사진 수정
          </div>
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
          onClick={handleCancel}
          className="border py-5 border-[#808080]"
        />
      </div>
    </div>
  );
}
