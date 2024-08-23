import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function DrawId() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { drawId } = router.query;
  console.log(drawId);

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

      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // 초기 렌더링
  }, drawId);

  return (
    <div>
      <h1>
        <div>
          Current ID: {drawId} {data.title}
        </div>
        <div>{data.drawingAt}</div>
        {data.organizer}
        {data.winner}
      </h1>{" "}
    </div>
  );
}
