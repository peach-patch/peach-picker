import React, { useEffect, useState } from "react";
import useDrawingStore from "@/store/drawingStore";
import GridView from "@/components/list/GridView";
import { usePagination, useTable } from "react-table";
import Link from "next/link";
import SortSelector from "@/components/list/SortSelector";
import ViewSelector from "@/components/list/ViewSelector";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const { data, fetchData } = useDrawingStore();
  const [filteredData, setFilteredData] = useState([]);
  const [viewType, setViewType] = useState(router.query.viewType || "table");
  const [sortOrder, setSortOrder] = useState("등록일순");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const now = new Date();

    let userDrawings = data.filter((item) => item.organizer === userName);

    userDrawings = userDrawings.map((item) => ({
      ...item,
      state: new Date(item.drawingAt) > now ? "예정" : "완료",
    }));

    if (sortOrder === "등록일순") {
      userDrawings = userDrawings.sort((a, b) => b.id - a.id);
    } else if (sortOrder === "추첨일시순") {
      userDrawings = userDrawings.sort(
        (a, b) => new Date(b.drawingAt) - new Date(a.drawingAt)
      );
    }

    setFilteredData(userDrawings);
  }, [data, sortOrder]);

  const handleSortChange = (event) => {
    console.log("Selected sort order:", event.target.value);
    setSortOrder(event.target.value);
  };

  const columns = React.useMemo(
    () => [
      {
        accessor: "title",
        Header: <div className="text-center">이벤트명</div>,
        Cell: ({ value, row }) => (
          <Link
            href={{
              pathname: `/drawings/${row.original.id}`,
              query: { from: "mylist", viewType },
            }}
          >
            <div className="font-semibold hover:underline">{value}</div>
          </Link>
        ),
      },
      {
        accessor: "drawingAt",
        Header: <div className="text-center">추첨 일시</div>,
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
        Header: <div className="text-center">상태</div>,
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
    [viewType]
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
    <div className="center1">
      <div className="flex justify-end w-4/5 gap-2 px-16 mt-2">
        <SortSelector
          sortOrder={sortOrder}
          handleSortChange={handleSortChange}
        />
        <ViewSelector viewType={viewType} handleViewChange={setViewType} />
      </div>
      {viewType === "grid" ? (
        <GridView
          data={filteredData}
          showOrganizer={false}
          showState={true}
          from="mylist"
          category="나의 추첨 내역"
        />
      ) : (
        <div className="w-4/5 p-6 mt-8 bg-white rounded-lg shadow-lg bg-opacity-30 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-bold text-gray-800">
              나의 추첨 내역
            </div>
          </div>
          <table {...getTableProps()} className="w-full text-gray-800">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  {...headerGroup.getHeaderGroupProps()}
                  className="bg-white border-t-2 border-b-2 border-black bg-opacity-40"
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
                    className="transition bg-white bg-opacity-60 hover:bg-rose-50 hover:shadow-lg hover:translate-y-[-2px] hover:scale-105"
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
      )}
    </div>
  );
}
