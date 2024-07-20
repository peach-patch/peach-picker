import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Edit() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setMessage("로그인이 필요합니다.");
        return;
      }

      try {
        console.log(token);
        const response = await fetch("/api/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("프로필 정보를 가져오는데 실패했습니다.");
        }

        const data = await response.json();
        setUsername(data.name);
        setEmail(data.email);
        setProfileUrl(data.profileUrl);
        console.log(data, "edit에서 확인");
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("프로필 정보를 가져오는데 실패했습니다.");
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      setMessage("로그인이 필요합니다.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: username, password }),
      });

      if (!response.ok) {
        throw new Error("프로필 업데이트에 실패했습니다.");
      }

      const data = await response.json();
      setMessage("프로필이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("프로필 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-2/3 relative max-w-[606px] flex flex-col">
        <div className="relative mb-1 mt-20 left-0 w-[103px] h-[38px] text-[20px] flex flex-col justify-center">
          회원 정보
        </div>
        <div className="w-full mb-3 h-0 border-[1px] border-solid border-[#000]"></div>
        <div className="mb-1 w-[112px] text-[20px]">Username</div>
        <div className="relative w-full h-[70px] flex flex-col">
          <div className="absolute left-0 w-full h-[70px] bg-[#f8f8f8] border-[1px] border-solid border-[#808080]"></div>
          <input
            type="text"
            className="absolute bg-[#f8f8f8] top-[50%] transform -translate-y-1/2 left-[27px] text-[20px] outline-none  defaultValue-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mt-4 mb-1 w-[112px] text-[20px]">Email</div>
        <div className="relative w-full h-[70px] flex flex-col">
          <div className="absolute left-0 w-full h-[70px] bg-[#f8f8f8] border-[1px] border-solid border-[#808080]"></div>
          <input
            type="text"
            className="absolute bg-[#f8f8f8] top-[50%] transform -translate-y-1/2 left-[27px] text-[20px] outline-none  defaultValue-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
          />
        </div>
        <div className="text-[20px] mb-1 mt-4">Password</div>
        <div className="relative w-full h-[70px] flex flex-col">
          <div className="absolute left-0 w-full h-[70px] bg-[#f8f8f8] border-[1px] border-solid border-[#808080]"></div>
          <input
            type="password"
            className="absolute bg-[#f8f8f8] top-[50%] transform -translate-y-1/2 left-[27px] text-[20px] outline-none"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-4 mb-1 w-[200px] text-[20px]">Confirm Password</div>
        <div className="relative w-full h-[70px] flex flex-col">
          <div className="absolute left-0 w-full h-[70px] bg-[#f8f8f8] border-[1px] border-solid border-[#808080]"></div>
          <input
            type="password"
            className="absolute bg-[#f8f8f8] top-[50%] transform -translate-y-1/2 left-[27px] text-[20px] outline-none  defaultValue-black"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {message && (
          <div className="text-red-500 mb-3 text-[10px]">{message}</div>
        )}
        <div className="flex mt-20">
          <div
            className="flex items-center justify-center w-1/2 mr-2 h-[70px] bg-[#fb5e67] rounded-[5px] cursor-pointer"
            onClick={handleUpdateProfile}
          >
            <div className=" text-[20px] text-[#fff] text-center whitespace-nowrap">
              회원정보 수정
            </div>
          </div>
          <div className="w-1/2 ml-2 h-[70px] flex items-center justify-center bg-[#fff] border-[1px] border-solid border-[#808080] rounded-[5px]">
            <div className="text-[20px] text-center">탈퇴</div>
          </div>
        </div>
        <Link href="/mypage">
          <div className="mt-4 mb-10 center1 w-full h-[70px] bg-[#fff] border-[1px] border-solid border-[#808080] rounded-[5px]">
            <div className=" text-[20px]">취소</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
