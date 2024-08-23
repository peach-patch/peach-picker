import Button from "@/components/button/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import present from "../../images/present.png";

export default function DrawId() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const { drawId, from } = router.query;
  const handleBackToList = () => {
    if (from === "mylist") {
      router.push("/mypage/mylist");
    } else {
      router.push("/drawings");
    }
  };

  useEffect(() => {
    if (drawId) {
      console.log(router.query.from);
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/drawing/${drawId}`,
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
          console.log(result, from);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [drawId]);

  if (!data) {
    return <p>Loading...</p>;
  }
  console.log(data);

  return (
    <div className="flex flex-col items-center center1">
      <div
        key={data.id}
        className="relative flex w-full max-w-4xl p-6 overflow-hidden bg-gray-100 rounded-lg shadow-md"
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
            <div className="flex mb-2 ml-4 text-2xl font-bold">
              <Image src={present} height={30} width={30} className="mr-2" />
              {data.title}
            </div>
            <p className="mb-2 ml-2 text-lg">주최자: {data.organizer}</p>
            <p className="ml-2 text-lg">
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
            <p className="mb-2 ml-2 text-lg">당첨자 수: {data.winner}명</p>
            <p className="mb-2 ml-2 text-lg">조회수: {data.viewCount}</p>
          </div>

          <article className="w-full p-4 overflow-y-auto bg-white border-2 border-gray-400 rounded-lg max-h-40">
            <dt className="mb-2 text-xl font-semibold">&lt;응모자 목록&gt;</dt>
            {data.participants && data.participants.length > 0 ? (
              data.participants.map((participant, index) => (
                <dd key={index} className="m-2 text-gray-700 ">
                  {participant.name} ({participant.phone})
                </dd>
              ))
            ) : (
              <p>응모자 정보가 없습니다.</p>
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
