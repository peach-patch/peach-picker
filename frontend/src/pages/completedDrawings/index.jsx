import React, { useEffect, useState } from "react";
import { usePagination, useTable } from "react-table";
import Button from "@/components/button/Button";
import useDrawingStore from "@/store/drawingStore";
import GridView from "@/components/list/GridView";
import SortSelector from "@/components/list/SortSelector";
import ViewSelector from "@/components/list/ViewSelector";
import Link from "next/link";
import { useRouter } from "next/router";
import DarkModeToggle from "@/components/button/DarkModeToggle";
import SearchComponent from "@/components/list/Search";
import darkModeStore from "@/store/darkModeStore";

export default function Index() {
  const router = useRouter();
  const { data, fetchData, loading, error } = useDrawingStore();
  const [filteredData, setFilteredData] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("title");
  const [inputError, setInputError] = useState(false);
  const [viewType, setViewType] = useState(router.query.viewType || "table");
  const [sortOrder, setSortOrder] = useState("등록일순");
  const [searchTerm, setSearchTerm] = useState("");
  const { darkMode } = darkModeStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const now = new Date();
    const pastDrawings = data.filter((item) => new Date(item.drawingAt) < now);

    let sortedDrawings = pastDrawings;
    if (sortOrder === "등록일순") {
      sortedDrawings = sortedDrawings.sort((a, b) => b.id - a.id);
    } else if (sortOrder === "추첨일시순") {
      sortedDrawings = sortedDrawings.sort(
        (a, b) => new Date(a.drawingAt) - new Date(b.drawingAt)
      );
    } else if (sortOrder === "조회수순") {
      sortedDrawings = sortedDrawings.sort((a, b) => b.viewCount - a.viewCount);
    }

    if (searchTerm.trim()) {
      if (selectedFilter === "title") {
        sortedDrawings = sortedDrawings.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (selectedFilter === "owner") {
        sortedDrawings = sortedDrawings.filter((item) =>
          item.organizer.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }

    setFilteredData(sortedDrawings);
  }, [data, sortOrder, searchTerm, selectedFilter]);

  const handleSortChange = (event) => {
    console.log("Selected sort order:", event.target.value);
    setSortOrder(event.target.value);
  };

  const handleSearch = (term, filter) => {
    setSearchTerm(term);
    setSelectedFilter(filter);
  };

  const columns = React.useMemo(
    () => [
      {
        accessor: "id",
        Header: (
          <div className="text-center text-gray-800 dark:text-gray-100">NO</div>
        ),
        Cell: ({ value }) => <div>{value}</div>,
      },
      {
        accessor: "title",
        Header: (
          <div className="text-center text-gray-800 dark:text-gray-100">
            제목
          </div>
        ),
        Cell: ({ value, row }) => (
          <Link
            href={{
              pathname: "/drawings/[drawId]",
              query: {
                drawId: row.original.id,
                from: "completedDrawings",
                viewType,
              },
            }}
            as={`/drawings/${row.original.id}`}
            passHref
          >
            <div className="font-bold text-gray-900 hover:underline dark:text-gray-200">
              {value}
            </div>
          </Link>
        ),
      },
      {
        accessor: "drawingAt",
        Header: (
          <div className="text-center text-gray-800 dark:text-gray-100">
            추첨 일시
          </div>
        ),
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
        Header: (
          <div className="text-center text-gray-800 dark:text-gray-100">
            당첨자 수
          </div>
        ),
        Cell: ({ value }) => <div>{value}명</div>,
      },
      {
        accessor: "organizer",
        Header: (
          <div className="text-center text-gray-800 dark:text-gray-100">
            주최자
          </div>
        ),
        Cell: ({ value }) => <div>{value}</div>,
      },
      {
        accessor: "viewCount",
        Header: (
          <div className="text-center text-gray-800 dark:text-gray-100">
            조회
          </div>
        ),
        Cell: ({ value }) => <div>{value}</div>,
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
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex w-full mb-4 center1">
        <SearchComponent onSearch={handleSearch} />
      </div>
      <div className="flex justify-end w-4/5 gap-2 px-16 mt-2">
        <SortSelector
          sortOrder={sortOrder}
          handleSortChange={handleSortChange}
        />
        <ViewSelector viewType={viewType} handleViewChange={setViewType} />
        <DarkModeToggle />
      </div>
      {viewType === "grid" ? (
        <GridView
          data={filteredData}
          showOrganizer={true}
          from="completedDrawings"
          category="완료된 추첨 내역"
        />
      ) : (
        <div
          className={`w-4/5 p-6 mt-8 rounded-lg shadow-lg bg-opacity-30 backdrop-blur-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
              완료된 추첨 내역
            </div>
          </div>

          <table
            {...getTableProps()}
            className="w-full text-gray-800 dark:text-gray-100"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  {...headerGroup.getHeaderGroupProps()}
                  className="bg-white border-t-2 border-b-2 border-black dark:bg-gray-700 bg-opacity-40 dark:bg-opacity-60"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      key={column.id}
                      {...column.getHeaderProps()}
                      className="px-4 py-2 text-left"
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
                    className="transition bg-white dark:bg-gray-800 bg-opacity-60 hover:bg-rose-50 dark:hover:bg-rose-400 hover:shadow-lg hover:translate-y-[-2px] hover:scale-105"
                  >
                    {row.cells.map((cell) => (
                      <td
                        key={cell.id}
                        {...cell.getCellProps()}
                        className="px-4 py-2 text-center"
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
