import React, { useId } from "react";

const CheckBox = ({ checked, onChange, text }) => {
  const checkboxId = useId();
  return (
    <div className="flex items-center mt-2">
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={checkboxId} className="ml-2 text-sm">
        {text}
      </label>
    </div>
  );
};

export default CheckBox;
