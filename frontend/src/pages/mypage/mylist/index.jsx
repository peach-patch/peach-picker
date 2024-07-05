import React from "react";
import { usePagination, useTable } from "react-table";

const TableComponent = () => {
  const columns = React.useMemo(
    () => [
      { accessor: "no", Header: "No" },
      { accessor: "date", Header: "추첨 일시" },
      { accessor: "name", Header: "이벤트 명" },
      { accessor: "winner", Header: "당첨자 수" },
      { accessor: "state", Header: "진행 현황" },
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
      <table {...getTableProps()} className="w-full table-fixed">
        <colgroup>
          <col style={{ width: "5%", minWidth: "50px" }} />
          <col style={{ width: "10%", minWidth: "300px" }} />
          <col style={{ width: "15%", minWidth: "150px" }} />
          <col style={{ width: "70%", minWidth: "100px" }} />
          <col style={{ width: "10%", minWidth: "200px" }} />
        </colgroup>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="border-b-2 border-black"
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
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-4 py-2 text-left">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
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
