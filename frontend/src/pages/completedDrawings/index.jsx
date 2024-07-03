import { useState, EventHandler, ReactNode } from "react";
const testData = [
  { no: 5, date: new Date(), company: "SOSO", name: "YOYO", winner: 5 },
  { no: 5, date: new Date(), company: "SOSO", name: "YOYO", winner: 5 },
  { no: 5, date: new Date(), company: "SOSO1234", name: "YOYO", winner: 5 },
  {
    no: 5,
    date: new Date(),
    company: "SOSOYOYO이게 진짜 길면",
    name: "YOYO",
    winner: 5,
  },
  { no: 6, date: new Date(), company: "TOTO로의 숲", name: "ZAZA", winner: 6 },
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

const completedDrawings = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full overflow-hidden">
      <div className="w-4/5">
        <div className="ml-4 mb-3  mt-10 left-0 text-[2vw] ">
          과거 추첨 내역
          <br />
        </div>
      </div>
      <div className="w-4/5 h-0 border-[1px] border-solid border-[#000]"></div>
      <div className="w-4/5">
        <div className="flex w-full p-3 text-[1.5vw]">
          <div className="w-1/7  text-center">NO</div>
          <div className=" w-1/4  text-center">추첨 일시</div>
          <div className="w-1/5  text-center">회사</div>
          <div className=" w-1/5  text-center">이벤트명</div>
          <div className="flex-grow text-right mr-2">당첨자 수</div>
        </div>
      </div>
      <div className=" w-4/5 h-0 border-[1px] border-solid border-[#000]"></div>

      {testData.map((data, index) => (
        <div key={index} className="relative pt-2 pb-2 flex w-4/5 text-[1.5vw]">
          <div className="w-1/7  ml-2 text-center">{data.no}번</div>
          <div className=" w-1/4  text-center">{formatDate(data.date)}</div>
          <div className="w-1/5  text-center">{data.company}</div>
          <div className=" w-1/5  text-center">{data.name}</div>
          <div className="flex-grow text-right mr-8">{data.winner}명</div>
        </div>
      ))}

      <div className=" w-4/5  border-[1px] border-solid border-[#000]"></div>
      <div className="absolute left-[661px] top-[869px] text-[24px]  whitespace-nowrap">
        1 2 3 4 5
      </div>
    </div>
  );
};

export default completedDrawings;
