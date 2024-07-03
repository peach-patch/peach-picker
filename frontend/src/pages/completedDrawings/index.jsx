import { useState, EventHandler, ReactNode } from "react";
const testData = [
  { no: 5, date: new Date(), company: "SOSO", name: "YOYO", winner: 5 },
  { no: 5, date: new Date(), company: "SOSO", name: "YOYO", winner: 5 },
  { no: 5, date: new Date(), company: "SOSO1234", name: "YOYO", winner: 5 },
  { no: 5, date: new Date(), company: "SOSOYOYO", name: "YOYO", winner: 5 },
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
        <div className="flex w-full p-3 text-[2vw]">
          <div className="w-1/7 bg-sky-300 ">NO</div>
          <div className=" w-1/4 bg-pink-300">추첨 일시</div>
          <div className="w-1/5 bg-yellow-200">회사</div>
          <div className=" w-1/5 bg-slate-400">이벤트명</div>
          <div className="justify-end ">당첨자 수</div>
        </div>
      </div>
      <div className=" w-4/5 h-0 border-[1px] border-solid border-[#000]"></div>

      {testData.map((data, index) => (
        <div key={index} className="relative flex w-4/5 text-[2vw]">
          <div className={`ml-1 p-2 top-${index * 10}`}>{data.no}번</div>
          <div className="absolute p-2 left-[10%]">{formatDate(data.date)}</div>
          <div className="absolute p-2 left-[45%]">{data.company}</div>
          <div className="absolute p-2 left-[55%]">{data.name}</div>
          <div className="absolute p-2 left-[90%]">{data.winner}명</div>
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
