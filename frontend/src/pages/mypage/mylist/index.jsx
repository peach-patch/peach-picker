import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePagination, useTable } from "react-table";
import Search from "@/components/list/Search";

export default function Index() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const userName = localStorage.getItem("userName");

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

        const now = new Date();
        const filtered = result
          .filter((item) => item.organizer === userName)
          .map((item) => ({
            ...item,
            state: new Date(item.drawingAt) > now ? "예정" : "완료",
          }));

        setData(filtered);
        setFilteredData(filtered);
        console.log(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        accessor: "title",
        Header: "이벤트 명",
        Cell: ({ value, row }) => (
          <Link href={`/drawings/${row.original.id}`}>{value}</Link>
        ),
      },
      {
        accessor: "drawingAt",
        Header: "추첨 일시",
        Cell: ({ value }) => (
          <span>
            {new Date(value).toLocaleString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        ),
      },
      {
        accessor: "winner",
        Header: () => <div className="text-right">당첨자 수</div>,
        Cell: ({ value }) => <div className="pr-4 text-right">{value}명</div>,
      },
      {
        accessor: "state",
        Header: "상태",
        Cell: ({ value }) => (
          <div className={`${value === "예정" ? "text-red-500" : ""}`}>
            {value}
          </div>
        ),
      },
      {
        accessor: "viewCount",
        Header: () => <div className="text-right">조회수</div>,
        Cell: ({ value }) => <div className="pr-4 text-right">{value}</div>,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data: filteredData }, usePagination);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Search />
      <div className="w-4/5 p-6 mt-8 bg-white rounded-lg shadow-lg bg-opacity-30 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-bold text-gray-800">추첨 목록</div>
        </div>

        <table {...getTableProps()} className="w-full text-gray-800">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                key={headerGroup.id}
                {...headerGroup.getHeaderGroupProps()}
                className="bg-white bg-opacity-40"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps()}
                    className="px-4 py-2 text-left text-gray-800"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  key={row.id}
                  {...row.getRowProps()}
                  className="transition bg-white bg-opacity-60 hover:bg-opacity-80"
                >
                  {row.cells.map((cell) => (
                    <td
                      key={cell.id}
                      {...cell.getCellProps()}
                      className="px-4 py-2 text-center text-gray-800"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Page {pageIndex + 1} of {pageOptions.length}
          </div>
          <div>
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="px-2 py-1 mr-2 text-gray-800 transition bg-white rounded bg-opacity-40 hover:bg-opacity-80"
            >
              {"<<"}
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="px-2 py-1 mr-2 text-gray-800 transition bg-white rounded bg-opacity-40 hover:bg-opacity-80"
            >
              {"<"}
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="px-2 py-1 mr-2 text-gray-800 transition bg-white rounded bg-opacity-40 hover:bg-opacity-80"
            >
              {">"}
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="px-2 py-1 text-gray-800 transition bg-white rounded bg-opacity-40 hover:bg-opacity-80"
            >
              {">>"}
            </button>
          </div>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="p-1 text-gray-800 bg-white rounded bg-opacity-40"
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                {size}개씩 보기
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
