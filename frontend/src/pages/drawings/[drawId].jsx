import React, { useEffect, useState } from "react";

export default function Wheel() {
  const [names, setNames] = useState([
    "김철수",
    "이영희",
    "박준호",
    "최미라",
    "홍길동",
  ]); // 초기 이름 설정
  const [rotation, setRotation] = useState(0);
  const [selectedWinner, setSelectedWinner] = useState("박준호"); // 미리 정해진 당첨자 설정
  const segmentAngle = 360 / names.length;

  useEffect(() => {
    drawWheel(); // 페이지가 로드될 때 휠을 그립니다.
  }, [names]);

  const drawWheel = () => {
    const canvas = document.getElementById("wheelCanvas");
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = centerX - 10; // 캔버스 중심 기준 반지름 설정

    ctx.clearRect(0, 0, canvas.width, canvas.height); // 이전 그리기 내용 지우기

    names.forEach((name, i) => {
      const startAngle = (segmentAngle * i * Math.PI) / 180; // 시작 각도
      const endAngle = (segmentAngle * (i + 1) * Math.PI) / 180; // 끝 각도

      // 룰렛 색상 설정
      ctx.fillStyle = ["#f94144", "#f3722c", "#f8961e", "#f9c74f", "#43aa8b"][
        i % 5
      ];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();

      // 텍스트 설정
      ctx.save();
      ctx.translate(
        centerX + Math.cos((startAngle + endAngle) / 2) * (radius / 2),
        centerY + Math.sin((startAngle + endAngle) / 2) * (radius / 2)
      );
      ctx.rotate((startAngle + endAngle) / 2 + Math.PI / 2); // 텍스트 회전
      ctx.fillStyle = "white";
      ctx.font = "bold 15px Arial";
      ctx.textAlign = "center";
      ctx.fillText(name, 0, 0); // 이름 그리기
      ctx.restore();
    });
  };

  const spinWheel = () => {
    const winnerIndex = names.indexOf(selectedWinner); // 미리 정해진 당첨자의 인덱스
    const winnerStartAngle = segmentAngle * winnerIndex; // 해당 인덱스의 시작 각도
    const randomOffset = Math.random() * (segmentAngle / 2) - segmentAngle / 4; // 섹션의 중앙에 멈추도록 오프셋 조정
    const spinAngle = 360 * 5 + (360 - winnerStartAngle + randomOffset); // 회전 각도 계산 (5회전 후 해당 각도에 멈춤)

    setRotation(spinAngle); // 회전 설정
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative">
        <canvas
          id="wheelCanvas"
          width="300"
          height="300"
          className="border-4 border-gray-800 rounded-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 3s ease-out",
          }}
        ></canvas>
        {/* 화살표 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-500 z-10"></div>
      </div>
      <button
        onClick={spinWheel}
        className="px-4 py-2 mt-8 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        룰렛 돌리기
      </button>
    </div>
  );
}
