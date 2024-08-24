import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function GridView({
  data,
  showOrganizer = true,
  showState = false,
}) {
  return (
    <div className="grid grid-cols-1 gap-6 m-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((data) => (
        <Link
          href={{
            pathname: "/drawings/[id]",
            query: { id: data.id, from: "drawings" },
          }}
          key={data.id}
        >
          <div
            key={data.id}
            className="relative p-4 overflow-hidden bg-gray-100 rounded-lg shadow-md transition transform hover:bg-gray-200 hover:shadow-lg hover:translate-y-[-2px] hover:scale-105"
          >
            <div className="relative w-full h-0 pb-[100%] mb-4">
              <Image
                src={data.thumbnailPath}
                alt={data.title}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 rounded"
              />
            </div>
            <h2 className="mb-2 ml-4 text-xl font-semibold">{data.title}</h2>
            {showOrganizer && (
              <p className="ml-2 text-gray-700">주최자: {data.organizer}</p>
            )}
            <p className="ml-2 text-gray-700">당첨자 수: {data.winner}명</p>
            <p className="ml-2 text-gray-700">
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
            {showState && (
              <p className="ml-2 text-gray-700">
                상태:{" "}
                <span className={data.state === "예정" ? "text-red-500" : ""}>
                  {data.state}
                </span>
              </p>
            )}
            <p className="ml-2 text-gray-700">조회: {data.viewCount}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
