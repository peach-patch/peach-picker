import React, { useEffect, useState } from "react";
import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function register() {
  const [isOpen, setIsOpen] = useState(false);
  const dropDown = () => {
    setIsOpen(!isOpen);
  };

  const Today = new Date();
  const [formatDay, setFormatDay] = useState("날짜 선택");
  const [selectedDay, setSelectedDay] = useState(Today);
  const [calOpen, setCalOpen] = useState(false);
  const dropCalendar = () => {
    setCalOpen(!calOpen);
  };
  const setDate = (day) => {
    setSelectedDay(day);
    console.log(selectedDay);
    setFormatDay(
      `${day.getFullYear()}년 ${day.getMonth() + 1}월 ${day.getDate()}일`
    );
  };
  const [method, setMethod] = useState("추첨 방법 선택");
  const selectMethod = (selectedMethod) => {
    setMethod(selectedMethod);
    setIsOpen(false);
  };
  const [winnerCnt, setWinnerCnt] = useState("");
  const handleWinnerCnt = (event) => {
    setWinnerCnt(event.target.value);
  };
  useEffect(() => {
    console.log(winnerCnt);
  }, [winnerCnt]);
  const [selectedFile, setSelectedFile] = useState("파일을 등록해주세요.");
  const handleFile = (event) => {
    const file = event.target.files[0];
    // if (!file) return;
    // if (file.type !== "text/csv") {
    //   alert("CSV 파일만 업로드 가능합니다.");
    //   return;
    // }
    setSelectedFile(file.name);
    console.log("선택된 파일:", file.name);
  };
  return (
    <div className="relative w-full flex flex-col justify-center items-center">
      <div
        className="mt-20 absoulte w-1/2 flex justify-center items-center"
        onClick={dropCalendar}
      >
        <div className="text-[20px] text-right mr-2 w-[150px] ">일시 : </div>
        <div className="absoulte left-[110px] w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px]">
          <div className=" flex-1 w-full text-[14px] leading-[140%] font-black text-[#828282] line-clamp-1">
            {formatDay}
          </div>

          {calOpen && (
            <div className="relative w-1/2">
              <div className="absolute right-0 ">
                <DayPicker
                  locale={ko}
                  mode="single"
                  defaultMonth={Today}
                  selected={selectedDay}
                  onSelect={setDate}
                  styles={{
                    head_cell: {
                      width: "auto",
                      minWidth: " 20px",
                      maxWidth: "200px",
                    },
                    table: {
                      maxWidth: "none",
                    },
                    day: {
                      margin: "auto",
                    },
                  }}
                />
              </div>
            </div>
          )}
          <div className="ml-2">▼</div>
        </div>
      </div>
      <div className="mt-10 w-1/2 flex justify-center items-center">
        <div className="z-1 text-[20px] text-right mr-2 w-[150px] ">
          당첨자 수 :{" "}
        </div>
        <div className="absoulte left-[110px] w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px]">
          <input
            type="text"
            className="flex-1 text-[14px] leading-[140%]  font-black text-[#828282] line-clamp-1"
            placeholder="당첨자 수를 입력하세요."
            onChange={handleWinnerCnt}
          />
        </div>
      </div>
      <div className="mt-10 z-1 w-1/2 flex justify-center items-center">
        <div className=" z-1 text-[20px] text-right mr-2 w-[150px] ">
          추첨 방법 :{" "}
        </div>
        <div
          className=" left-[110px] w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px] "
          onClick={dropDown}
        >
          <div className="flex-1 text-[14px] leading-[140%] font-['Noto_Sans'] font-black text-[#828282] line-clamp-1">
            {method}
            {isOpen && (
              <div className="absolute mt-2 w-1/3 bg-white border border-gray-300 rounded shadow-lg">
                <div
                  className="py-2 px-4 hover:bg-gray-100"
                  onClick={() => selectMethod("사다리 타기")}
                >
                  사다리 타기
                </div>
                <div
                  className="py-2 px-4 hover:bg-gray-100"
                  onClick={() => selectMethod("핀볼")}
                >
                  핀볼
                </div>
                <div
                  className="py-2 px-4 hover:bg-gray-100"
                  onClick={() => selectMethod("공 뽑기")}
                >
                  공 뽑기
                </div>
              </div>
            )}
          </div>
          <div className="ml-2">▼</div>
        </div>
      </div>

      <div className="mt-10 absoulte w-1/2 flex justify-center items-center">
        <div className="text-[20px] text-right mr-2 w-[150px] ">명단 : </div>
        <div className="w-full text-[12px] whitespace-nowrap">
          ※ 휴대폰 번호가 있는 명단을 등록해주세요.
          <br />※ csv 파일만 등록할 수 있습니다.
          <br />※ 아직 명단이 완성되지 않았다면 등록이후
          <br />
          수정란에서 명단을 등록해주세요.
          <div className="mt-1 absoulte left-[110px] w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px]">
            <div className=" flex-1 w-full text-[14px] leading-[140%] font-black text-[#828282] line-clamp-1">
              {selectedFile}
            </div>
          </div>
          <div className="absolute flex items-center justify-center mt-2 w-[89px] h-[44px] bg-[#d9d9d9] rounded-[5px]">
            <label style={{ cursor: "pointer" }} htmlFor="fileInput">
              <div>
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  id="fileInput"
                  style={{ display: "none", cursor: "pointer" }}
                  onChange={handleFile}
                />
                파일 찾기
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="z-1 relative w-1/2">
        <div className="absolute right-0 mt-20 w-[96px] h-[45px] flex flex-row items-center justify-center py-[6px] px-[16px] bg-[#000] rounded-[8px]">
          <div className="text-[20px] leading-[140%]  font-black text-[#fff] whitespace-nowrap">
            등록
          </div>
        </div>
      </div>
    </div>
  );
}
