import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import confetti from "canvas-confetti";

export default function Wheel({
  names,
  selectedWinner,
  onSpinEnd,
  isLastWinner,
}) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const segmentAngle = 360 / names.length;

  console.log(names, "응모");
  console.log(selectedWinner, "당첨");

  const countOccurrences = (array) =>
    array.reduce((acc, name) => {
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

  const nameOccurrences = countOccurrences(names.map((n) => n.split(" ")[0]));

  const formattedNames = names.map((fullName) => {
    const [name] = fullName.split(" ");
    return nameOccurrences[name] > 1 ? fullName : name;
  });

  useEffect(() => {
    drawWheel();
  }, [formattedNames, rotation]);

  const drawWheel = () => {
    const canvas = document.getElementById("wheelCanvas");
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = centerX - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(centerX, centerY);

    ctx.rotate(-Math.PI / 2);

    formattedNames.forEach((name, i) => {
      const startAngle = (segmentAngle * i * Math.PI) / 180;
      const endAngle = (segmentAngle * (i + 1) * Math.PI) / 180;

      ctx.fillStyle = ["#f94144", "#f3722c", "#f8961e", "#f9c74f", "#43aa8b"][
        i % 5
      ];
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();

      ctx.save();
      ctx.translate(
        Math.cos((startAngle + endAngle) / 2) * (radius / 2),
        Math.sin((startAngle + endAngle) / 2) * (radius / 2)
      );
      ctx.rotate((startAngle + endAngle) / 2 + Math.PI / 2);
      ctx.fillStyle = "white";
      ctx.font = "bold 15px Arial";
      ctx.textAlign = "center";
      ctx.fillText(name, 0, 0);
      ctx.restore();
    });

    ctx.restore();
  };

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const formattedSelectedWinner = formatName(selectedWinner);
    const winnerIndex = formattedNames.indexOf(formattedSelectedWinner);

    if (winnerIndex === -1) {
      console.error(
        `selectedWinner (${formattedSelectedWinner})가 formattedNames에 없습니다.`
      );
      setIsSpinning(false);
      return;
    }

    const winnerStartAngle = segmentAngle * winnerIndex;
    const targetRotation =
      360 * 5 + (360 - winnerStartAngle - segmentAngle / 2);

    setRotation(targetRotation);

    setTimeout(() => {
      setWinnerName(formattedSelectedWinner);
      setShowConfetti(true);
      setIsSpinning(false);

      setTimeout(() => {
        setShowConfetti(false);
        if (!isLastWinner && onSpinEnd) {
          onSpinEnd();
        }
      }, 2000);

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
      });
    }, 3000);
  };

  const formatName = (winner) => {
    const [name] = winner.split(" ");
    return nameOccurrences[name] > 1 ? winner : name;
  };

  useEffect(() => {
    if (selectedWinner) {
      spinWheel();
    }
  }, [selectedWinner]);
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
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

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 rotate-180 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-500 z-10"></div>
      </div>

      {winnerName && (
        <div className="mt-4 text-xl font-bold text-gray-800">
          당첨자: {winnerName}
        </div>
      )}

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={isLastWinner ? 500 : 300}
          recycle={false}
        />
      )}
    </div>
  );
}
