import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";
import Image from "next/image";

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

    // if (!password) {
    //   setPasswordMessage("비밀번호를 입력해야 합니다.");
    //   return;
    // } else {
    //   setPasswordMessage("");
    // }

    //if (password !== confirmPassword) {
    // setMessage("비밀번호가 일치하지 않습니다.");
    //  return;
    //} else {
    //  setMessage("");
    //}

    try {
      const formData = new FormData();
      formData.append("name", username);
      if (profileImg) {
        formData.append("profileImg", profileImg);
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
      console.log(response, "이거꼭꼭response");
      const contentType = response.headers.get("content-type");
      console.log(contentType, "이거더더더꼭꼭response");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log(data, "이거꼭확인해");
        // 서버에서 반환된 데이터를 로컬 스토리지에 저장
        localStorage.setItem("email", data.email);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("profileImg", data.profileUrl);

        // 상태 업데이트
        setUsername(data.name);
        setEmail(data.email);
        setProfileImg(data.profileUrl);

        setMessage("프로필이 성공적으로 업데이트되었습니다.");
      } else if (contentType.includes("text/plain")) {
        const textData = await response.text();
        console.log("Response Data (Text):", textData, "과연 ㅋㅋ");
        localStorage.setItem("userName", username);
        localStorage.setItem("profileImg", profileImg);
      } else {
        const textData = await response.text();
        console.log(textData, "확인");
        alert(textData);
      }

      router.push("/mypage");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("프로필 업데이트에 실패했습니다.");
    }
  };

  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-2/3 relative max-w-[606px] flex flex-col">
        <div className="relative mb-1 mt-20 left-0 w-[103px] h-[38px] text-[20px] flex flex-col justify-center">
          회원 정보
        </div>
        <div className="w-full mb-3 h-0 border-[1px] border-solid border-[#000]"></div>
        <div className="w-full center1">
          <section className="relative mt-10 mb-5 overflow-hidden rounded-full w-60 h-60">
            {/* <Image
              src={profileImg}
              layout="fill"
              objectFit="cover"
              alt="Profile Image"
            /> */}
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
        <div className="mb-1 w-[112px] text-[20px]">Username</div>
        <div className="relative w-full h-[70px] flex flex-col">
          <div className="absolute left-0 w-full h-[70px] bg-[#f8f8f8] border-[1px] border-solid border-[#808080]"></div>
          <input
            type="text"
            className="absolute bg-[#f8f8f8] top-[50%] transform -translate-y-1/2 left-[27px] text-[20px] outline-none"
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
        </div>
        <div className="mt-4 mb-1 w-[112px] text-[20px]">Email</div>
        <div className="relative w-full h-[70px] flex flex-col">
          <div className="absolute left-0 w-full h-[70px] bg-[#f8f8f8] border-[1px] border-solid border-[#808080]"></div>
          <input
            type="text"
            className="absolute bg-[#f8f8f8] top-[50%] transform -translate-y-1/2 left-[27px] text-[20px] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
          />
        </div>
        <div className="text-[20px] mb-1 mt-4">Password</div>
        {/* <div className="relative w-full h-[70px] flex flex-col">
          <div className="absolute left-0 w-full h-[70px] bg-[#f8f8f8] border-[1px] border-solid border-[#808080]"></div>
          <input
            type="password"
            className="absolute bg-[#f8f8f8] top-[50%] transform -translate-y-1/2 left-[27px] text-[20px] outline-none"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordMessage("");
            }}
          />
          {passwordMessage && (
            <div className="absolute left-[27px] top-[70px] text-red-500 text-[10px]">
              {passwordMessage}
            </div>
          )}
        </div>
        <div className="mt-4 mb-1 w-[200px] text-[20px]">Confirm Password</div>
        <div className="relative w-full h-[70px] flex flex-col">
          <div className="absolute left-0 w-full h-[70px] bg-[#f8f8f8] border-[1px] border-solid border-[#808080]"></div>
          <input
            type="password"
            className="absolute bg-[#f8f8f8] top-[50%] transform -translate-y-1/2 left-[27px] text-[20px] outline-none"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setMessage("");
            }}
          />
        </div> */}
        {/* {message && (
          <div className="text-red-500 mb-3 text-[10px]">{message}</div>
        )} */}
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
