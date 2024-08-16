import React, { useState } from "react";

export default function TimePickerDropdown({ onTimeChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("시간 선택");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");

  const handleTimeChange = () => {
    const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(
      2,
      "0"
    )}`;
    setSelectedTime(formattedTime);
    setIsOpen(false);
    if (onTimeChange) {
      onTimeChange(formattedTime);
    }
  };

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  return (
    <div className="relative w-2/5 ml-2">
      <div
        className="w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1 text-[14px] leading-[140%] font-black text-[#828282] line-clamp-1">
          {selectedTime}
        </div>
        <div className="ml-2">▼</div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-3/4 p-2 mt-1 bg-white border border-gray-300 rounded shadow-lg">
          <div className="flex mb-3">
            <input
              type="number"
              className="w-1/2 p-2 text-center border rounded"
              value={hours}
              min="0"
              max="23"
              onChange={handleHoursChange}
            />
            <span className="px-1">:</span>
            <input
              type="number"
              className="w-1/2 p-2 text-center border rounded"
              value={minutes}
              min="0"
              max="59"
              onChange={handleMinutesChange}
            />
          </div>
          <div className="flex justify-between mt-2">
            <button
              className="px-3 py-1 mt-2 text-white rounded bg-rose-400"
              onClick={handleTimeChange}
            >
              Set
            </button>
            <button
              className="px-3 py-1 mt-2 text-black border rounded"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
