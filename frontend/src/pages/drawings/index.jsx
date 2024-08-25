import React, { useEffect, useState } from "react";
import { usePagination, useTable } from "react-table";
import Button from "@/components/button/Button";
import useDrawingStore from "@/store/drawingStore";
import GridView from "@/components/list/GridView";
import SortSelector from "@/components/list/SortSelector";
import ViewSelector from "@/components/list/ViewSelector";
import Link from "next/link";

export default function Index() {
  const { data, fetchData } = useDrawingStore();
  const [filteredData, setFilteredData] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("title");
  const [inputError, setInputError] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [sortOrder, setSortOrder] = useState("등록일순");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    const upcomingDrawings = data.filter(
      (item) => new Date(item.drawingAt) > fiveMinutesAgo
    );

    let sortedDrawings = upcomingDrawings;
    if (sortOrder === "등록일순") {
      sortedDrawings = upcomingDrawings.sort((a, b) => b.id - a.id);
    } else if (sortOrder === "추첨일시순") {
      sortedDrawings = upcomingDrawings.sort(
        (a, b) => new Date(b.drawingAt) - new Date(a.drawingAt)
      );
    }

    setFilteredData(sortedDrawings);
  }, [data, sortOrder]);
  const handleSortChange = (event) => {
    console.log("Selected sort order:", event.target.value);
    setSortOrder(event.target.value);
  };
  const handleSearch = () => {
    if (filterInput.trim() === "") {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 1000);
      return;
    }

    let filtered = filteredData;

    if (selectedFilter === "title") {
      filtered = filteredData.filter((item) =>
        item.title.toLowerCase().includes(filterInput.toLowerCase())
      );
    } else if (selectedFilter === "owner") {
      filtered = filteredData.filter((item) =>
        item.organizer.toLowerCase().includes(filterInput.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const columns = React.useMemo(
    () => [
      {
        accessor: "id",
        Header: <div className="text-center">NO</div>,
        Cell: ({ value }) => <div>{value}</div>,
      },
      {
        accessor: "title",
        Header: <div className="text-center">제목</div>,
        Cell: ({ value, row }) => (
          <Link
            href={{
              pathname: "/drawings/[id]",
              query: { id: row.original.id, from: "drawings" },
            }}
            passHref
          >
            <div className="font-bold hover:underline">{value}</div>
          </Link>
        ),
      },
      {
        accessor: "drawingAt",
        Header: <div className="text-center">추첨 일시</div>,
        Cell: ({ value }) => (
          <div>
            {new Date(value).toLocaleString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
        ),
      },
      {
        accessor: "winner",
        Header: <div className="text-center">당첨자 수</div>,
        Cell: ({ value }) => <div>{value}명</div>,
      },
      {
        accessor: "drawingType",
        Header: <div className="text-center">추첨 유형</div>,
        Cell: ({ value }) => <div>{value}</div>,
      },
      {
        accessor: "organizer",
        Header: <div className="text-center">주최자</div>,
        Cell: ({ value }) => <div>{value}</div>,
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex mb-4">
        <select
          className="p-2 mr-4 border border-gray-300 rounded"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="owner">추첨 회사</option>
        </select>

        <input
          className={
            inputError
              ? "p-2 mr-4 border border-red-500 rounded"
              : "p-2 mr-4 border border-gray-300 rounded"
          }
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          placeholder="검색어 입력"
        />
        <Button
          text="검색"
          onClick={handleSearch}
          className="text-white px-4 bg-[#fb5e67]"
        />
      </div>
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
          showOrganizer={true}
          from="drawings"
          category="실시간 추첨 및 추첨 예정"
        />
      ) : (
        <div className="w-4/5 p-6 mt-8 bg-white rounded-lg shadow-lg bg-opacity-30 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-bold text-gray-800">
              실시간 추첨 및 추첨 예정
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
