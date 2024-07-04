import LongButton from "@/components/button/LongBtn";
import Link from "next/link";
import React from "react";

export default function index() {
  const testData = [
    { no: 1, date: new Date(), state: "예정", name: "YOYO", winner: 5 },
    { no: 2, date: new Date(), state: "완료", name: "YOYO", winner: 5 },
    { no: 3, date: new Date(), state: "예정", name: "YOYO", winner: 5 },
    {
      no: 4,
      date: new Date(),
      state: "예정",
      name: "YOYO",
      winner: 5,
    },
    {
      no: 5,
      date: new Date(),
      state: "완료",
      name: "ZAZA",
      winner: 6,
    },
  ];

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
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden">
      <div className="w-4/5">
        <div className="ml-4 mb-3  mt-10 left-0 text-[2vw] ">
          과거 추첨 내역
          <br />
        </div>
      </div>
      <div className="w-4/5 h-0 border-[1px] border-solid border-[#000]"></div>
      <div className="w-4/5">
        <div className="flex w-full p-3 text-[1.5vw]">
          <div className="text-center w-1/7">NO</div>
          <div className="w-1/4 text-center ">추첨 일시</div>
          <div className="w-1/5 text-center ">이벤트명</div>
          <div className="flex-grow text-right mr-1vw">당첨자 수</div>
          <div className="text-center mr-2vw ">진행 현황</div>
        </div>
      </div>
      <div className=" w-4/5 h-0 border-[1px] border-solid border-[#000]"></div>

      {testData.map((data, index) => (
        <Link
          className="flex items-center justify-center w-full"
          href={`/completedDrawings/${data.no}`}
        >
          <div
            key={index}
            className="relative pt-2 pb-2 flex w-4/5 text-[1.5vw]"
          >
            <div className="ml-2 text-center w-1/7">{data.no}번</div>
            <div className="w-1/4 text-center ">{formatDate(data.date)}</div>
            <div className="w-1/5 text-center ">{data.name}</div>
            <div className="flex-grow text-right">{data.winner}명</div>
            <div className="w-1/6 text-center">{data.state}</div>
          </div>
        </Link>
      ))}

      <div className=" w-4/5  border-[1px] border-solid border-[#000]"></div>
      {/* <div className="absolute left-[661px] top-[869px] text-[24px]  whitespace-nowrap">
        1 2 3 4 5
      </div> */}
    </div>
  );
}
