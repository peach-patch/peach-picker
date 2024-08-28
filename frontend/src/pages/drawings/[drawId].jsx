import Button from "@/components/button/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import present from "../../images/present.png";
import axios from "axios";
import darkModeStore from "@/store/darkModeStore";
import DarkModeToggle from "@/components/button/DarkModeToggle";
import Confetti from "react-confetti";

export default function DrawId() {
  const [data, setData] = useState(null);
  const [winners, setWinners] = useState([]);
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const [recycleConfetti, setRecycleConfetti] = useState(false);
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

          const filteredWinners = result.participants.filter(
            (participant) => participant.winner
          );
          setWinners(filteredWinners);

          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/drawing/${drawId}/increment-view`
          );

          const now = new Date();
          const drawingTime = new Date(result.drawingAt);
          if (drawingTime <= now) {
            setTimeout(() => {
              setIsConfettiVisible(true);
              setRecycleConfetti(true);

              setTimeout(() => {
                setRecycleConfetti(false);
              }, 15000);
            }, 30000);
          }
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

      <div
        key={data.id}
        className="relative flex w-full max-w-4xl p-6 overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
        style={{ height: "75vh" }}
      >
        <div className="relative w-1/2 h-full">
          {data.thumbnailUrl ? (
            <Image
              src={data.thumbnailUrl}
              alt={data.title}
              layout="fill"
              objectFit="contain"
              className="absolute inset-0 rounded"
            />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
        <section className="flex flex-col justify-center w-1/2 pl-8">
          <div>
            <div className="flex mb-2 ml-4 text-2xl font-bold dark:text-gray-100 justify-between">
              <div className="flex">
                <Image src={present} height={30} width={30} className="mr-2" />
                <div className="mt-2">{data.title}</div>
              </div>
              <DarkModeToggle />
            </div>
            <p className="mb-2 ml-2 dark:text-gray-100 text-lg">
              주최자: {data.organizer}
            </p>
            <p className="ml-2 dark:text-gray-100 text-lg">
              추첨 일시:{" "}
              {new Date(data.drawingAt).toLocaleString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
            <p className="mb-2 ml-2 text-lg dark:text-gray-100">
              당첨자 수: {data.winner}명
            </p>
            <p className="mb-2 ml-2 text-lg dark:text-gray-100">
              조회수: {data.viewCount}
            </p>
          </div>

          <article className="w-full p-4 overflow-y-auto bg-white border-2 border-gray-400 dark:bg-gray-700 dark:border-gray-600 rounded-lg max-h-40">
            {data.drawingAt && new Date(data.drawingAt) > new Date() ? (
              <>
                <p className="mb-2 text-lg dark:text-gray-100">
                  &lt;응모자 목록&gt;
                </p>
                {data.participants && Array.isArray(data.participants) ? (
                  data.participants.map((participant, index) => (
                    <dd
                      key={index}
                      className="m-2 text-gray-700 dark:text-gray-300"
                    >
                      {participant.name} ({participant.email}) -{" "}
                      {participant.phone}
                    </dd>
                  ))
                ) : (
                  <p>응모자 정보가 없습니다.</p>
                )}
              </>
            ) : (
              <>
                <p className="mb-2 text-lg dark:text-gray-100">
                  &lt;당첨자 목록&gt;
                </p>
                {winners.length > 0 ? (
                  winners.map((winner, index) => (
                    <dd
                      key={index}
                      className="m-2 text-gray-700 dark:text-gray-300"
                    >
                      {winner.name} ({winner.phone}) - 당첨자
                    </dd>
                  ))
                ) : (
                  <p>당첨자 정보가 없습니다.</p>
                )}
              </>
            )}
          </article>
        </section>
      </div>
      <div className="flex justify-end w-2/3 mt-6 mr-48">
        <Button
          text="목록"
          onClick={handleBackToList}
          className="px-4 text-white bg-black"
        />
      </div>
    </div>
  );
}
