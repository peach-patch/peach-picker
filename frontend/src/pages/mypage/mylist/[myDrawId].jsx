import ShortButton from "@/components/button/ShortBtn";
import ShortWhite from "@/components/button/ShortWhite";
import { Linefont } from "next/font/google";
import Link from "next/link";
import { useState, EventHandler, ReactNode } from "react";

const myEventDetail = () => {
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Seoul",
    };

    return new Intl.DateTimeFormat("ko-KR", options).format(date);
  };
  const data = {
    no: 11,
    company: "고양이도 우유먹어",
    name: "SOSO",
    date: new Date(),
    winner: 5,
    state: "예정",
  };

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden">
      <div className="w-4/5 ">
        <div className="ml-4 mb-3  mt-10 left-0 text-[2vw] ">
          과거 추첨 내역
          <br />
        </div>

        <div className=" h-0 border-[1px] border-solid border-[#000]"></div>
        <section className="w-5/7 flex justify-around m-10 min-w-[450px] bg-[#f6f5f5]">
          <article className="p-20 ">
            <dd className="w-full p-1 pt-10">일시 : {formatDate(data.date)}</dd>
            <dd className="p-1">주최자 : {data.company}</dd>
            <dd className="p-1">이벤트 이름 : {data.name}</dd>
            <dd className="flex p-1">
              진행 현황 :
              <p className={`${data.state === "예정" ? "text-red-500" : ""}`}>
                &nbsp; {data.state}
              </p>
            </dd>
            <dd className="p-1">당첨자 수 : {data.winner}명</dd>
          </article>
          {data.state === "완료" && (
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
          )}
        </section>
        <div className=" h-0 border-[1px] border-solid border-[#000]"></div>
        <div className="flex justify-end mt-5 mb-20 mr-20">
          {data.state === "예정" ? (
            <Link href="/register/edit">
              <ShortButton text={"수정"} />
            </Link>
          ) : null}
          <Link href="/mypage/mylist">
            {data.state === "예정" ? (
              <ShortWhite text={"목록"} />
            ) : (
              <ShortButton text={"목록"} />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default myEventDetail;
