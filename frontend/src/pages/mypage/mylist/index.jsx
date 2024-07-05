import React from "react";
import { usePagination, useTable } from "react-table";

const TableComponent = () => {
  const columns = React.useMemo(
    () => [
      {
        accessor: "no",
        Header: "No",
        Cell: ({ value }) => <div>{value}번</div>,
      },
      { accessor: "date", Header: "추첨 일시" },
      { accessor: "name", Header: "이벤트 명" },
      {
        accessor: "winner",
        Header: () => <div className="text-right ">당첨자 수</div>,
        Cell: ({ value }) => <div className="pr-4 text-right">{value}명</div>,
      },
      {
        accessor: "state",
        Header: "진행 현황",
        Cell: ({ value }) => (
          <div className={`${value === "예정" ? "text-red-500" : ""}`}>
            {value}
          </div>
        ),
      },
    ],
    []
  );
  const data = React.useMemo(
    () => [
      { no: 12, name: "SOSO", date: "2024-07-05", winner: 5, state: "예정" },
      {
        no: 11,
        name: "SOSO",
        date: "2024-07-05 08:07",
        winner: 5,
        state: "예정",
      },
      {
        no: 10,
        name: "SOSO",
        date: "2024-07-05 08:07",
        winner: 5,
        state: "예정",
      },
      {
        no: 9,
        name: "SOSO",
        date: "2024-07-05 08:07",
        winner: 5,
        state: "예정",
      },
      {
        no: 8,
        name: "SOSO",
        date: "2024-07-05 08:07",
        winner: 5,
        state: "완료",
      },
      {
        no: 7,
        name: "SOSO",
        date: "2024-07-05 08:07",
        winner: 5,
        state: "완료",
      },
      {
        no: 6,
        name: "SOSO",
        date: "2024-07-05 08:07",
        winner: 5,
        state: "예정",
      },
      {
        no: 5,
        name: "SOSO",
        date: "2024-07-05 08:07",
        winner: 5,
        state: "예정",
      },
      {
        no: 4,
        name: "SOSO",
        date: "2024-07-05 08:07",
        winner: 5,
        state: "예정",
      },
      {
        no: 3,
        name: "SOSO",
        date: "2024-07-05 08:07",
        winner: 5,
        state: "예정",
      },
      {
        no: 2,
        name: "SOSO",
        date: "2024-07-05 08:07",
        winner: 5,
        state: "예정",
      },
      {
        no: 1,
        name: "SOSO",
        date: "2024-07-05 08:07",
        winner: 5,
        state: "예정",
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
  } = useTable({ columns, data }, usePagination);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-4/5 pb-1 pl-1 text-left">나의 추첨 내역</div>
      <table {...getTableProps()} className="w-4/5">
        <colgroup>
          <col style={{ width: "5%", minWidth: "100px" }} />
          <col style={{ width: "10%", minWidth: "200px" }} />
          <col style={{ width: "15%", minWidth: "150px" }} />
          <col style={{ width: "60%", minWidth: "100px" }} />
          <col style={{ width: "10%", minWidth: "150px" }} />
        </colgroup>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="border-t-2 border-b-2 border-black"
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-4 py-2">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            // 페이지의 마지막 행 확인
            const isLastRow = rowIndex === page.length - 1;
            return (
              <tr
                {...row.getRowProps()}
                className={`border-b ${
                  isLastRow ? "border-b-2 border-black" : ""
                }`}
              >
                {row.cells.map((cell) => (
                  <td
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
};

export default TableComponent;
