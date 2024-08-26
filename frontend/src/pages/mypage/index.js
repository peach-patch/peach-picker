import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import pick_line from "../../images/pick_line.png";
import Image from "next/image";
import Link from "next/link";
import MemberInfo from "../../components/login/MemberInfo";
import { getDrawings } from "@/api/listApi";

const MyPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [completedDrawings, setCompletedDrawings] = useState(0);
  const [upcomingDrawings, setUpcomingDrawings] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const userNameFromStorage = localStorage.getItem("userName");
    console.log("Fetched userName from localStorage:", userNameFromStorage);
    setUsername(userNameFromStorage);

    const fetchDrawings = async () => {
      try {
        const drawings = await getDrawings();
        console.log("Fetched drawings:", drawings);
        const now = new Date();

        const userDrawings = drawings.filter(
          (drawing) => drawing.organizer === userNameFromStorage
        );

        console.log("Filtered userDrawings:", userDrawings);
        const completed = userDrawings.filter(
          (drawing) => new Date(drawing.drawingAt) < now
        ).length;
        const upcoming = userDrawings.filter(
          (drawing) => new Date(drawing.drawingAt) >= now
        ).length;

        setCompletedDrawings(completed);
        setUpcomingDrawings(upcoming);
      } catch (error) {
        console.error("Error fetching drawings:", error);
      }
    };

    if (userNameFromStorage) {
      fetchDrawings();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-20">
      <MemberInfo
        setUsername={setUsername}
        setEmail={setEmail}
        setProfileImg={setProfileImg}
      />
      {message && (
        <div className="flex flex-col items-center justify-center mt-10 mb-20">
          {message}
        </div>
      )}
      <section className="relative mb-10 overflow-hidden rounded-full w-60 h-60">
        <Image
          src={profileImg}
          layout="fill"
          objectFit="cover"
          alt="Profile Image"
        />
      </section>
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
          <div className="absolute left-[60px] top-[56px] w-[78px] h-[51px] text-[32px] text-center flex flex-col justify-center">
            {upcomingDrawings}
          </div>
          <div className="absolute left-[250px] top-[56px] w-[78px] h-[51px] text-[32px] text-center flex flex-col justify-center">
            {completedDrawings}
          </div>
          <div className="absolute left-[250px] top-0 w-[90px] h-[51px] text-[18px] flex flex-col justify-center">
            추첨 완료
          </div>

          <Image
            className="absolute left-[192px] top-[40px]"
            src={pick_line}
            height={80}
            width={1}
            alt="Pick Line"
          />
        </div>
      </div>
      <div className="absolute left-[210px] top-[247px] w-[228px] h-[228px]"></div>
      <div className="relative mt-10 w-[379px] h-[77px] border-[1px] border-solid border-[#000] overflow-hidden">
        <div className="absolute left-[22px] top-[25px] w-[191px] text-[20px]">
          <Link href="/mypage/edit">회원 정보 수정</Link>
        </div>
      </div>
      <div className="relative w-[379px] h-[77px] border-[1px] border-solid border-[#000] overflow-hidden">
        <div className="absolute left-[22px] top-[25px] w-[191px] text-[20px]">
          <Link href="mypage/mylist">추첨내역 조회</Link>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
