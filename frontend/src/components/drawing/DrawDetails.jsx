import React from "react";
import Image from "next/image";
import present from "../../images/present.png";
import DarkModeToggle from "@/components/button/DarkModeToggle";

const DrawDetails = ({ data }) => (
  <div
    key={data.id}
    className="relative flex w-full max-w-4xl p-6 overflow-hidden bg-gray-100 rounded-lg shadow-md dark:bg-gray-800"
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
        <div className="flex justify-between mb-2 ml-4 text-2xl font-bold dark:text-gray-100">
          <div className="flex">
            <Image src={present} height={30} width={30} className="mr-2" />
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
        <p className="mb-2 ml-2 text dark:text-gray-100">
          조회수: {data.viewCount}
        </p>
      </div>
    </section>
  </div>
);

export default DrawDetails;
