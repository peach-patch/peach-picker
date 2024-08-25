import React from "react";

export default function SortSelector({ sortOrder, handleSortChange }) {
  return (
    <select
      value={sortOrder}
      onChange={handleSortChange}
      className="p-2 text-gray-800 border rounded"
    >
      <option value="등록일순">등록일순</option>
      <option value="추첨일시순">추첨일시순</option>
    </select>
  );
}
