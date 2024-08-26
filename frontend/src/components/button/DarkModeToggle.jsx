import React, { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded"
    >
      {isDarkMode ? <FiMoon size={24} /> : <FiSun size={24} />}
    </button>
  );
}

export default DarkModeToggle;
