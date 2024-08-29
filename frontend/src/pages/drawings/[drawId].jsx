import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import darkModeStore from "@/store/darkModeStore";
import Confetti from "react-confetti";
import Button from "@/components/button/Button";
import DarkModeToggle from "@/components/button/DarkModeToggle";
import RouletteComponent from "@/components/drawing/RouletteComponent";
import ParticipantsList from "@/components/drawing/ParticipantsList";
import WinnersList from "@/components/drawing/WinnersList";
import DrawDetails from "@/components/drawing/DrawDetails";

const Roulette = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.default),
  { ssr: false }
);

export default function DrawId() {
  const [data, setData] = useState(null);
  const [winners, setWinners] = useState([]);
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const [recycleConfetti, setRecycleConfetti] = useState(false);
  const [rouletteData, setRouletteData] = useState([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [isDrawingTime, setIsDrawingTime] = useState(false);
  const router = useRouter();
  const { darkMode } = darkModeStore();
  const { drawId, from, viewType } = router.query;

  const handleBackToList = () => {
    if (from === "mylist") {
      router.push({
        pathname: "/mypage/mylist",
        query: { viewType: viewType || "table" },
      });
    } else if (from === "completedDrawings") {
      router.push({
        pathname: "/completedDrawings",
        query: { viewType: viewType || "table" },
      });
    } else {
      router.push({
        pathname: "/drawings",
        query: { viewType: viewType || "grid" },
      });
    }
  };

  useEffect(() => {
    if (drawId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/drawing/${drawId}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const result = response.data;
          setData(result);

          const participants = result.participants.map(
            (participant, index) => ({
              id: index,
              option: participant.name,
            })
          );
          setRouletteData(participants);

          const filteredWinners = result.participants.filter(
            (participant) => participant.winner
          );
          setWinners(filteredWinners);

          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/drawing/${drawId}/increment-view`
          );
        } catch (error) {
          console.error(
            "Error fetching data or incrementing view count:",
            error
          );
        }
      };

      fetchData();
    }
  }, [drawId]);

  useEffect(() => {
    const checkDrawingTime = () => {
      if (data) {
        const now = new Date();
        const drawingTime = new Date(data.drawingAt);
        drawingTime.setMinutes(drawingTime.getMinutes() + 5);

        if (drawingTime <= now && !isDrawingTime) {
          setIsDrawingTime(true);
          handleSpin();
        }
      }
    };

    const interval = setInterval(checkDrawingTime, 1000);

    return () => clearInterval(interval);
  }, [data, isDrawingTime]);

  const handleSpin = () => {
    setMustSpin(true);
    const interval = setInterval(() => {
      const nextIndex = winners.length;
      if (nextIndex < rouletteData.length) {
        setPrizeIndex(nextIndex);
        setMustSpin(true);
      } else {
        clearInterval(interval);
        handleStopSpinning();
      }
    }, 5000);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    const winner = data.participants[prizeIndex];
    setWinners((prevWinners) => [...prevWinners, winner]);

    if (winners.length + 1 === data.winner) {
      setIsConfettiVisible(true);
      setRecycleConfetti(true);
      setTimeout(() => {
        setRecycleConfetti(false);
      }, 15000);
    }
  };

  if (!data) {
    return (
      <div
        className={`flex items-center justify-center h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-screen items-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {isConfettiVisible && <Confetti recycle={recycleConfetti} />}
      <DrawDetails data={data} />
      <div className="flex justify-end w-2/3 mt-6 mr-48">
        <Button
          text="목록"
          onClick={handleBackToList}
          className="px-4 text-white bg-black"
        />
      </div>
      {isDrawingTime ? (
        <WinnersList winners={winners} />
      ) : (
        <ParticipantsList participants={data.participants} />
      )}
      {isDrawingTime && (
        <RouletteComponent
          mustSpin={mustSpin}
          prizeIndex={prizeIndex}
          data={rouletteData}
          onStopSpinning={handleStopSpinning}
        />
      )}
    </div>
  );
}
