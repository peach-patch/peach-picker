import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import darkModeStore from "@/store/darkModeStore";

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = darkModeStore();

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
