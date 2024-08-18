import React, { useState } from "react";
import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Time from "../../components/register/Time";
import ImgUpload from "@/components/register/ImgUpload";
import upload from "../../images/upload.png";
import Image from "next/image";

export default function Register() {
  const [isOpen, setIsOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const [formatDay, setFormatDay] = useState("날짜 선택");
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [method, setMethod] = useState("추첨 방법 선택");
  const [winnerCnt, setWinnerCnt] = useState("");
  const [eventName, setEventName] = useState("");
  const [selectedFile, setSelectedFile] = useState("파일을 등록해주세요.");

  const dropDown = () => {
    setIsOpen(!isOpen);
  };

  const dropCalendar = () => {
    setCalOpen(!calOpen);
  };

  const setDate = (day) => {
    setSelectedDay(day);
    setFormatDay(
      `${day.getFullYear()}년 ${day.getMonth() + 1}월 ${day.getDate()}일`
    );
    setCalOpen(false); // 날짜를 선택하면 달력을 닫음
  };

  const selectMethod = (selectedMethod) => {
    setMethod(selectedMethod);
    setIsOpen(false);
  };

  const handleWinnerCnt = (event) => {
    setWinnerCnt(event.target.value);
  };

  const handleEventName = (event) => {
    setEventName(event.target.value);
  };

  const handleFile = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file.name);
  };

  return (
    <div
      className=" mt-20 flex flex-col items-center min-w-[1000px] justify-center w-full"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div className="w-1/5 mt-20 ">
        <ImgUpload />
      </div>

      <div className="flex items-center justify-center w-1/2">
        <div className="text-right mr-2 w-[150px] font-bold">일시 :</div>
        <div className="relative w-3/5 h-[40px]">
          <div
            onClick={dropCalendar}
            className="flex h-full items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px] cursor-pointer"
          >
            <div className="flex-1 text-[14px] leading-[140%] font-black text-[#828282]">
              {formatDay}
            </div>
            <div className="ml-2">▼</div>
          </div>
          {calOpen && (
            <div className="absolute z-20 mt-2 w-[330px] right-0 justify-center items-center flex bg-white border border-gray-300 rounded shadow-lg">
              <DayPicker
                locale={ko}
                mode="single"
                defaultMonth={selectedDay}
                selected={selectedDay}
                onSelect={setDate}
              />
            </div>
          )}
        </div>
        <Time />
      </div>

      <div className="flex items-center justify-center w-1/2 m-4">
        <div className="text-right mr-2 w-[150px] font-bold">이벤트 명 :</div>
        <div className="w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px]">
          <input
            type="text"
            className="flex-1 text-[14px] leading-[140%] font-black text-[#828282] line-clamp-1"
            placeholder="이벤트명을 입력하세요."
            onChange={handleEventName}
          />
        </div>
      </div>

      <div className="flex items-center justify-center w-1/2 mb-4">
        <div className="text-right mr-2 w-[150px] font-bold">당첨자 수 :</div>
        <div className="w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px]">
          <input
            type="number"
            className="flex-1 text-[14px] leading-[140%] font-black text-[#828282] line-clamp-1"
            placeholder="당첨자 수를 입력하세요."
            onChange={handleWinnerCnt}
          />
        </div>
      </div>

      <div className="relative flex items-center justify-center w-1/2 mb-4 z-1">
        <div className="text-right mr-2 w-[150px] font-bold">추첨 방법 :</div>
        <div
          className="relative w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px] cursor-pointer"
          onClick={dropDown}
        >
          <div className="flex-1 text-[14px] leading-[140%] font-black text-[#828282]">
            {method}
          </div>
          <div className="ml-2">▼</div>
          {isOpen && (
            <div className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg top-full">
              <div
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => selectMethod("사다리 타기")}
              >
                사다리 타기
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => selectMethod("핀볼")}
              >
                핀볼
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => selectMethod("공 뽑기")}
              >
                공 뽑기
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center w-1/2 mb-10">
        <div className="text-right mr-2 mt-6 w-[150px] font-bold">명단 :</div>
        <div className="w-full text-[12px] whitespace-nowrap">
          ※ 휴대폰 번호가 있는 명단을 등록해주세요.
          <br />※ csv 파일만 등록할 수 있습니다.
          <br />※ 아직 명단이 완성되지 않았다면 등록이후 수정란에서 명단을
          등록해주세요.
          <div className="flex mt-2 mb-10">
            <div className=" w-full h-[40px] flex items-center justify-between py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px]">
              <div className="flex-1 text-[14px] leading-[140%] text-[#828282] line-clamp-1">
                {selectedFile}
              </div>
            </div>
            <div className="flex items-center justify-center  bg-[#d9d9d9] rounded-[5px] px-4 ml-2">
              <label style={{ cursor: "pointer" }} htmlFor="fileInput">
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  id="fileInput"
                  style={{ display: "none", cursor: "pointer" }}
                  onChange={handleFile}
                />
                파일 찾기
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end w-1/2 z-1">
        <button className="w-[96px] mb-10 h-[45px] py-[6px] px-[16px] bg-[#000] text-white rounded-[8px]">
          등록
        </button>
      </div>
    </div>
  );
}
