import React, { useState, useEffect } from "react";

function SearchComponent({ onSearch, initialFilter = "title" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    onSearch(debouncedTerm, filter);
  }, [debouncedTerm, filter, onSearch]);

  return (
    <div className="flex w-2/5">
      <select
        className="p-2 mr-4 border border-gray-300 dark:border-gray-600 rounded"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="title">제목</option>
        <option value="owner">추첨 회사</option>
      </select>
      <input
        className="p-2 mr-4 w-full flex-grow border border-gray-300 dark:border-gray-600 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어 입력"
      />
    </div>
  );
}

export default SearchComponent;
