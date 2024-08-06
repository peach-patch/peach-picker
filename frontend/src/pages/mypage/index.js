// src/pages/mypage.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import pick_line from "../../images/pick_line.png";
import Image from "next/image";
import Link from "next/link";
import useAuthStore from "../../store/authStore";

const MyPage = () => {
  const { isLoggedIn, token, isInitialized, initialize } = useAuthStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      if (!isLoggedIn) {
        router.push("/login");
        return;
      }

      const fetchProfile = async () => {
        try {
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
        } catch (error) {
          console.error("Error fetching profile:", error);
          setMessage("프로필 정보를 가져오는데 실패했습니다.");
        }
      };

      fetchProfile();
    }
  }, [isInitialized, isLoggedIn, token, router]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (message) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 mb-20">
        {message}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20 mb-20">
      <div className="text-[20px] w-[380px] mb-2">기본 정보</div>
      <div className="flex flex-col justify-evenly w-[380px] h-[127px] bg-[#fff] border-[1px] border-solid border-[#000]">
        <div className="ml-5 text-[18px]">Username : {username}</div>
        <div className="ml-5 text-[18px]">Email : {email}</div>
      </div>
      <div className="mt-10 text-[20px] w-[380px] mb-2">나의 추첨 현황</div>
      <div className="w-[383px] h-[138px]">
        <div className="relative w-[383px] h-[138px] bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <div className="absolute left-[60px] top-0 w-[90px] h-[51px] text-[18px] flex flex-col justify-center">
            추첨 예정
          </div>
          <div className="absolute left-[60px] top-[56px] w-[78px] h-[51px] text-[32px]  text-center flex flex-col justify-center">
            0
          </div>
          <div className="absolute left-[250px] top-[56px] w-[78px] h-[51px] text-[32px] text-center flex flex-col justify-center">
            2
          </div>
          <div className="absolute left-[250px] top-0 w-[90px] h-[51px] text-[18px]  flex flex-col justify-center">
            추첨 완료
          </div>
          <Image
            className="absolute left-[192px] top-[40px]"
            src={pick_line}
            height={80}
            width={1} // width를 명시적으로 설정하여 경고를 피합니다
            alt="Pick Line" // alt 속성을 추가합니다
          />
        </div>
      </div>
      <div className="absolute left-[210px] top-[247px] w-[228px] h-[228px]"></div>
      <div className="relative mt-10 w-[379px] h-[77px] border-[1px] border-solid border-[#000] overflow-hidden">
        <div className="absolute left-[22px] top-[25px] w-[191px] text-[20px]  ">
          <Link href="/mypage/edit">회원 정보 수정</Link>
        </div>
      </div>
      <div className="relative w-[379px] h-[77px] border-[1px] border-solid border-[#000] overflow-hidden">
        <div className="absolute left-[22px] top-[25px] w-[191px] text-[20px]  ">
          <Link href="mypage/mylist">추첨내역 조회</Link>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
