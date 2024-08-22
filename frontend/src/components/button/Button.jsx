import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ text, onClick, className }) => {
  return (
    <button className={twMerge("py-2 rounded-md", className)} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
