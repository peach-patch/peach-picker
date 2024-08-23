import Search from "@/components/list/Search";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function index() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/drawing`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorText}`
        );
      }

      const result = await response.json();
      setData(result);
      setFilteredData(result); // 초기 필터링
      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // 초기 렌더링
  }, []);

  return (
    <>
      <Search />
      <div className="grid grid-cols-1 gap-6 m-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((data) => (
          <Link
            href={{
              pathname: "/drawings/[id]",
              query: { id: data.id },
            }}
            key={data.id}
          >
            <div
              key={data.id}
              className="relative p-4 overflow-hidden bg-gray-100 rounded-lg shadow-md"
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
              <h2 className="mb-2 text-xl font-semibold">{data.title}</h2>
              <p className="text-gray-700">추첨자: {data.organizer}</p>
              <p className="text-gray-700">당첨자 수: {data.winner}</p>
              <p className="text-gray-700">
                추첨 일시: {new Date(data.drawingAt).toLocaleString()}
              </p>
              <p className="text-gray-700">조회: {data.viewCount}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
