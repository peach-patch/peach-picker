import Link from "next/link";
import React from "react";
import { usePagination, useTable } from "react-table";
import jsPDF from "jspdf";
import "jspdf-autotable";
import base64Font from "../../../fonts/base64font";
import ShortWhite from "@/components/button/ShortWhite";

TableComponent = () => {
  const columns = React.useMemo(
    () => [
      {
        accessor: "no",
        Header: "No",
        Cell: ({ value }) => <div>{value}번</div>,
      },
      { accessor: "date", Header: "추첨 일시" },
      {
        accessor: "name",
        Header: "이벤트 명",
        Cell: ({ value, row }) => (
          <Link href={`/mypage/mylist/${row.original.no}`}>{value}</Link>
        ),
      },
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

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.addFileToVFS("NotoSansKR-Regular.ttf", base64Font);
    doc.addFont("NotoSansKR-Regular.ttf", "NotoSansKR", "normal");
    doc.setFont("NotoSansKR");

    doc.text("나의 추첨 내역", 14, 10);
    doc.autoTable({
      startY: 20,
      head: [
        columns.map((col) =>
          typeof col.Header === "function"
            ? col.Header().props.children
            : col.Header
        ),
      ],
      body: data.map((row) => columns.map((col) => row[col.accessor])),
      styles: {
        font: "NotoSansKR",
      },
      headStyles: {
        fillColor: [0, 0, 0], // 헤더 배경색 (검정색)
        textColor: [255, 255, 255], // 헤더 글자색 (흰색)
        fontStyle: "bold",
      },
    });
    doc.save("나의 추첨 내역.pdf");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center content-end justify-between w-4/5">
        <div className="pb-1 pl-1 text-left ">나의 추첨 내역</div>
        <div onClick={downloadPdf} className="cursor-pointer ">
          <ShortWhite text={"출력"} />
        </div>
      </div>

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
              key={headerGroup.id} // key를 직접 지정
              {...headerGroup.getHeaderGroupProps()}
              className="border-t-2 border-b-2 border-black"
            >
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps()}
                  className="px-4 py-2"
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

            const isLastRow = rowIndex === page.length - 1;
            return (
              <tr
                key={row.id} // key를 직접 지정
                {...row.getRowProps()}
                className={` ${isLastRow ? "border-b-2 border-black" : ""}`}
              >
                {row.cells.map((cell) => {
                  const { key, ...cellProps } = cell.getCellProps(); // key를 분리
                  return (
                    <td
                      key={cell.column.id} // key를 직접 지정
                      {...cellProps}
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
};
