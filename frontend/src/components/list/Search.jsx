import React from "react";

const Search = ({ selectOnChange, selectValue, inputValue, inputOnChange }) => {
  return (
    <div className="flex items-center p-6 rounded-lg shadow-lg backdrop-blur-lg bg-white/30">
      <select
        className="p-2 mr-4 text-gray-900 border border-gray-300 rounded shadow-inner bg-white/40 focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={selectValue}
        onChange={selectOnChange}
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow:
            "inset 2px 2px 5px rgba(255, 255, 255, 0.6), inset -2px -2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <option value="title">제목</option>
        <option value="owner">추첨 회사</option>
      </select>
      <input
        className="p-2 text-gray-900 border border-gray-300 rounded shadow-inner bg-white/40 focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={inputValue}
        onChange={inputOnChange}
        placeholder="검색어 입력"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow:
            "inset 2px 2px 5px rgba(255, 255, 255, 0.6), inset -2px -2px 5px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};

export default Search;
