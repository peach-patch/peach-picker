import ShortButton from "@/components/button/ShortBtn";
import { Linefont } from "next/font/google";
import Link from "next/link";
import { useState, EventHandler, ReactNode } from "react";

const 과거추첨내역상세페이지 = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden">
      <div className="w-4/5 ">
        <div className="ml-4 mb-3  mt-10 left-0 text-[2vw] ">
          과거 추첨 내역
          <br />
        </div>

        <div className=" h-0 border-[1px] border-solid border-[#000]"></div>
        <section className="w-5/7 flex justify-around m-10 bg-[#f6f5f5]">
          <article className="p-20 ">
            <dd className="w-full p-1 pt-10">일시 : 2024/06/20 오후 05:22</dd>
            <dd className="p-1">주최자 : SOSO회사</dd>
            <dd className="p-1">이벤트 이름 : YOYO이벤트</dd>
            <dd className="p-1">당첨자 수 : 3명</dd>
          </article>
          <article className="w-2/5 p-20 m-16 overflow-y-auto bg-white max-h-72">
            <dt>&lt;당첨자 목록&gt;</dt>
            <dd className="w-full m-2">김한모 (010-****-6971)</dd>
            <dd className="m-2">김한모 (010-****-6971)</dd>
            <dd className="m-2">김한모 (010-****-6971)</dd>
            <dd className="m-2">김한모 (010-****-6971)</dd>
            <dd className="m-2">김한모 (010-****-6971)</dd>
            <dd className="m-2">김한모 (010-****-6971)</dd>
            <dd className="m-2">김한모 (010-****-6971)</dd>
            <dd className="m-2">김한모 (010-****-6971)</dd>
          </article>
        </section>
        <div className=" h-0 border-[1px] border-solid border-[#000]"></div>
        <div className="flex justify-end mt-5 mb-20 mr-20">
          <Link href="/completedDrawings">
            <ShortButton text={"목록"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default 과거추첨내역상세페이지;
