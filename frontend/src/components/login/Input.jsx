import React from "react";

const Input = ({
  title,
  type,
  placeholder,
  readOnly = false,
  value,
  onChange,
}) => {
  return (
    <>
      <div className="mt-4">{title}</div>
      <div className="mb-1 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
        <input
          type={type}
          className="bg-[#f8f8f8] ml-3 text-[20px] outline-none"
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default Input;
