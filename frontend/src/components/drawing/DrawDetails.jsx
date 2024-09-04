import React from "react";
import Image from "next/image";
import present from "../../images/present.png";

export default function DrawDetails({ data, darkMode, DarkModeToggle }) {
  return (
    <section className="flex flex-col justify-center w-full pl-8">
      <div>
        <div className="flex justify-between mb-2 ml-4 text-2xl font-bold dark:text-gray-100">
          <div className="flex">
            <Image
              src={present}
              alt="Present"
              height={30}
              width={30}
              className="mr-2"
            />
            <div className="mt-2">{data.title}</div>
          </div>
          <DarkModeToggle />
        </div>
        <p className="mb-2 ml-2 text-lg dark:text-gray-100">
          주최자: {data.organizer}
        </p>
        <p className="ml-2 text-lg dark:text-gray-100">
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
    </section>
  );
}
