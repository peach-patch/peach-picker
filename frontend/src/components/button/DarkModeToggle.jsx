import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import darkModeStore from "@/store/darkModeStore";
function DarkModeToggle() {
  const { darkMode, toggleDarkMode, initializeDarkMode } = darkModeStore();
  useEffect(() => {
    initializeDarkMode(); // 초기 로드 시 상태 초기화
  }, [initializeDarkMode]);
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded"
    >
      {darkMode ? <FiMoon size={24} /> : <FiSun size={24} />}
    </button>
  );
}

export default DarkModeToggle;
