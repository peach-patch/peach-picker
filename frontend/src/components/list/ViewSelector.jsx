import React from "react";
import Image from "next/image";
import gridIcon from "../../images/001.png";
import tableIcon from "../../images/002.png";

export default function ViewSelector({ viewType, handleViewChange }) {
  return (
    <div className="flex items-center p-2 space-x-2 rounded bg-rose-100">
      <button
        onClick={() => handleViewChange("grid")}
        className={`p-1 rounded ${
          viewType === "grid" ? "bg-rose-300" : "bg-rose-100"
        }`}
      >
        <Image src={gridIcon} alt="Grid View" width={18} height={18} />
      </button>
      <button
        onClick={() => handleViewChange("table")}
        className={`p-1 rounded ${
          viewType === "table" ? "bg-rose-300" : "bg-rose-100"
        }`}
      >
        <Image src={tableIcon} alt="Table View" width={18} height={18} />
      </button>
    </div>
  );
}
