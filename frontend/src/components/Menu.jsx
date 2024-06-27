import React, { useState } from "react";
import menu_logo from "../../public/피치피커.png";
import Image from "next/image";

export default function menu() {
  const [login, setLogin] = useState(false);
  return (
    <div className="bg-menuColor font-noto-sans flex p-2 justify-between">
      <div className="flex ml-5">
        <Image src={menu_logo} width={90} height={50} alt="메뉴 로고"></Image>
        <div className="ml-5 p-2">실시간 추첨</div>
        <div className="p-2">추첨 기록실</div>
      </div>
      <div className="flex">
        {login ? (
          <>
            <div className="p-2">추첨 등록</div>
            <div className="p-2">추첨 목록</div>
            <div className="p-2">마이 페이지</div>
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
  );
}
