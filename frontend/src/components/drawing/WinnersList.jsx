import React from "react";

const WinnersList = ({ winners }) => (
  <article className="w-full p-4 overflow-y-auto bg-white border-2 border-gray-400 rounded-lg dark:bg-gray-700 dark:border-gray-600 max-h-40">
    <p className="mb-2 text-lg dark:text-gray-100">&lt;당첨자 목록&gt;</p>
    {winners.length > 0 ? (
      winners.map((winner, index) => (
        <dd key={index} className="m-2 text-gray-700 dark:text-gray-300">
          {winner.name} ({winner.phone}) - 당첨자
        </dd>
      ))
    ) : (
      <p>당첨자 정보가 없습니다.</p>
    )}
  </article>
);

export default WinnersList;
