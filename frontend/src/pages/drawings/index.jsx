import Search from "@/components/list/Search";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useDrawingStore from "@/store/drawingStore";

export default function Index() {
  const { data, fetchData } = useDrawingStore();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    const upcomingDrawings = data.filter(
      (item) => new Date(item.drawingAt) > fiveMinutesAgo
    );

    const sortedDrawings = upcomingDrawings.sort((a, b) => b.id - a.id);
    setFilteredData(sortedDrawings);
  }, [data]);

  return (
    <>
      <Search />
      <div className="grid grid-cols-1 gap-6 m-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredData.map((data) => (
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
              <p className="ml-2 text-gray-700">주최자: {data.organizer}</p>
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
              <p className="ml-2 text-gray-700">조회: {data.viewCount}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
