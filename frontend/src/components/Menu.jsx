// src/components/Menu.js
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuthStore from "../store/authStore";
import menu_logo from "../../public/피치피커.webp";
import hamburger from "../images/hamburger.png";
import bell from "../images/bell.png";
import search from "../images/search.png";
import treasure from "../images/treasure.png";
import home from "../images/home.png";
import peach_logo from "../../public/peach_logo.png";
import Image from "next/image";

const Menu = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("userProfile");
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between h-16 p-2 bg-white sm:flex">
        <div className="flex items-center ml-5">
          <Link href="/">
            <div className="text-3xl font-Radio text-rose-500">피치피커</div>
          </Link>
          <div className="items-center justify-center p-2 ml-5">
            <Link href="/drawings">실시간 추첨</Link>
          </div>
          <div className="p-2">
            <Link href="/completedDrawings">추첨 기록실</Link>
          </div>
          <div className="p-2">
            <Link href="/about">기업 정보</Link>
          </div>
          <div className="p-2">
            <Link href="/brandstory">브랜드 스토리</Link>
          </div>
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <>
              <div className="p-2 ">
                <Link href="/register">추첨 등록</Link>
              </div>
              <div className="p-2">
                <Link href="/mypage/mylist">추첨 목록</Link>
              </div>
              <div className="p-2">
                <Link href="/mypage">마이 페이지</Link>
              </div>
              <button onClick={handleLogout} className="p-2">
                로그아웃
              </button>
            </>
          ) : (
            <div className="p-2">
              <Link href="/login">
                <button className="p-2">로그인</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center">
          <Image
            className="sm:hidden"
            src={peach_logo}
            width={280}
            height={280}
            alt="피치피커 로고"
          />
        </div>
        <div className="fixed bottom-0 flex items-center justify-around w-full p-4 bg-white border-t-2 border-gray-500 sm:hidden">
          <Link href="/">
            <Image
              className="flex"
              src={home}
              width={30}
              height={30}
              alt="홈"
            />
          </Link>
          <Link href="/completedDrawings">
            <Image
              className="flex"
              src={search}
              width={30}
              height={30}
              alt="검색"
            />
          </Link>
          <Link href="/drawings">
            <Image
              className="flex"
              src={treasure}
              width={30}
              height={30}
              alt="추첨"
            />
          </Link>
          <Link href="/mypage">
            <Image
              className="flex"
              src={bell}
              width={30}
              height={30}
              alt="알림"
            />
          </Link>
          {isLoggedIn ? (
            <button
            // onClick={handleLogout}
            >
              <Link href="/mypage">
                <Image
                  className="flex"
                  src={hamburger}
                  width={30}
                  height={30}
                  alt="로그아웃"
                />
              </Link>
            </button>
          ) : (
            <Link href="/login">
              <Image
                className="flex"
                src={hamburger}
                width={30}
                height={30}
                alt="로그인"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
