import React, { useState } from "react";
import menu_logo from "../../public/피치피커.png";
import hamburger from "../images/hamburger.png";
import bell from "../images/bell.png";
import search from "../images/search.png";
import treasure from "../images/treasure.png";
import home from "../images/home.png";
import Image from "next/image";
import Link from "next/link";
import peach_logo from "../../public/peach_logo.png";

export default function menu() {
  const [login, setLogin] = useState(false);
  return (
    <div>
      <div className=" bg-menuColor font-noto-sans flex p-2 justify-between hidden sm:flex">
        <div className="flex ml-5">
          <Link href="/">
            <Image
              src={menu_logo}
              width={90}
              height={50}
              alt="메뉴 로고"
            ></Image>
          </Link>
          <div className="ml-5 p-2">
            <Link href="/drawings">실시간 추첨</Link>
          </div>
          <div className="p-2">
            <Link href="/completedDrawings">추첨 기록실</Link>
          </div>
        </div>
        <div className="flex">
          {login ? (
            <>
              <div className="p-2">
                <Link href="/register">추첨 등록</Link>
              </div>
              <div className="p-2">
                <Link href="mypage/mylist">추첨 목록</Link>
              </div>
              <div className="p-2">
                <Link href="/mypage">마이 페이지</Link>
              </div>
              <button onClick={() => setLogin(false)} className="mr-5">
                로그아웃
              </button>
            </>
          ) : (
            <button onClick={() => setLogin(true)} className="mr-5">
              로그인
            </button>
          )}
        </div>
      </div>
      <div>
        <div className="flex flex-col mt-10 items-center">
          <Image
            className="sm:hidden "
            src={peach_logo}
            width={280}
            height={280}
            alt="피치피커 로고"
          ></Image>
        </div>
        <div className="p-4 border-t-2 border-gray-500 sm:hidden fixed w-full bottom-0 flex justify-around items-center">
          <Link href="/">
            <Image
              className="flex"
              src={home}
              width={30}
              height={30}
              alt="메뉴 로고"
            ></Image>
          </Link>
          <Link href="/completedDrawings">
            <Image
              className="flex"
              src={search}
              width={30}
              height={30}
              alt="메뉴 로고"
            ></Image>
          </Link>
          <Link href="/drawings">
            <Image
              className="flex"
              src={treasure}
              width={30}
              height={30}
              alt="메뉴 로고"
            ></Image>
          </Link>
          <Link href="/mypage">
            <Image
              className="flex"
              src={bell}
              width={30}
              height={30}
              alt="메뉴 로고"
            ></Image>
          </Link>
          <Link href="/login">
            <Image
              className="flex"
              src={hamburger}
              width={30}
              height={30}
              alt="메뉴 로고"
            ></Image>
          </Link>
        </div>
      </div>
    </div>
  );
}
