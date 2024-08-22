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

  return <div>index</div>;
}
