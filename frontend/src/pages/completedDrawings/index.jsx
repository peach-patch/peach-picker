import Button from "@/components/button/Button";
import React, { useState, useEffect } from "react";
import { usePagination, useTable } from "react-table";

export default function MyList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("title");
  const [inputError, setInputError] = useState(false); // 입력 필드 에러

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    if (filterInput.trim() === "") {
      setInputError(true);

      setTimeout(() => {
        setInputError(false);
      }, 1000);

      return;
    }

    let filtered = data;

    if (selectedFilter === "title") {
      filtered = data.filter((item) =>
        item.title.toLowerCase().includes(filterInput.toLowerCase())
      );
    } else if (selectedFilter === "owner") {
      filtered = data.filter((item) =>
        item.organizer.toLowerCase().includes(filterInput.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchData(); // 초기 렌더링
  }, []);

  const inputClassName = inputError
    ? "p-2 mr-4 border border-red-500 rounded"
    : "p-2 mr-4 border border-gray-300 rounded";

  const columns = React.useMemo(
    () => [
      {
        accessor: "id",
        Header: "NO",
        Cell: ({ value }) => <div>{value}</div>,
      },
      {
        accessor: "title",
        Header: "제목",
        Cell: ({ value }) => <div>{value}</div>,
      },
      {
        accessor: "drawingAt",
        Header: "추첨 일시",
        Cell: ({ value }) => <div>{new Date(value).toLocaleString()}</div>,
      },
      {
        accessor: "winner",
        Header: "당첨자 수",
        Cell: ({ value }) => <div>{value}명</div>,
      },
      {
        accessor: "drawingType",
        Header: "추첨 유형",
        Cell: ({ value }) => <div>{value}</div>,
      },
      {
        accessor: "organizer",
        Header: "추첨자",
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
    page, // 현재 페이지의 행들
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
    <div className="flex flex-col items-center justify-center">
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
          className={inputClassName}
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
      <div className="flex items-center content-end justify-between w-4/5">
        <div className="pb-1 pl-1 text-left">완료된 추첨 내역</div>
      </div>
      <table {...getTableProps()} className="w-4/5">
        <colgroup>
          <col style={{ width: "5%", minWidth: "100px" }} />
          <col style={{ width: "10%", minWidth: "50px" }} />
          <col style={{ width: "20%", minWidth: "10px" }} />
          <col style={{ width: "35%", minWidth: "150px" }} />
          <col style={{ width: "10%", minWidth: "10px" }} />
        </colgroup>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr
                key={key}
                {...restHeaderGroupProps}
                className="border-t-2 border-b-2 border-black"
              >
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumnProps } = column.getHeaderProps();
                  return (
                    <th key={key} {...restColumnProps} className="px-4 py-2">
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);

            const isLastRow = rowIndex === page.length - 1;
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr
                key={key}
                {...restRowProps}
                className={` ${isLastRow ? "border-b-2 border-black" : ""}`}
              >
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td
                      key={key}
                      {...restCellProps}
                      className="px-4 py-2 text-center"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-10">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}개씩 보기
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
