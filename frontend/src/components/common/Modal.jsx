import React from "react";

export default function Modal({ isOpen, onClose, message, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="mb-4 text-lg font-semibold">{message}</div>
        <div>{children}</div>{" "}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
