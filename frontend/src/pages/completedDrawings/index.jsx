import React, { useState, useEffect } from "react";
import { usePagination, useTable } from "react-table";

export default function MyList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터를 위한 상태
  const [filterInput, setFilterInput] = useState("o");
  const [selectedFilter, setSelectedFilter] = useState("title");
  const [ownerFilter, setOwnerFilter] = useState("헬"); // owner 필터의 기본값 "헬"

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
      setFilteredData(result); // 초기 필터링 데이터 설정
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    let filtered = data;

    if (selectedFilter === "title") {
      filtered = data.filter((item) =>
        item.title.toLowerCase().includes(filterInput.toLowerCase())
      );
    } else if (selectedFilter === "owner") {
      filtered = data.filter((item) =>
        item.organizer.toLowerCase().includes(ownerFilter.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchData(); // 초기 렌더링 시 데이터 로드
  }, []);

  useEffect(() => {
    handleSearch(); // 필터 입력값이 변경될 때마다 필터링 적용
  }, [filterInput, ownerFilter, selectedFilter]);

  const columns = React.useMemo(
    () => [
      {
        accessor: "id",
        Header: "ID",
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
        Header: "추첨 회사",
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
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          placeholder="검색어 입력"
          className="p-2 mr-4 border border-gray-300 rounded"
        />

        <button
          onClick={handleSearch}
          className="p-2 text-white bg-blue-500 rounded"
        >
          검색
        </button>
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
