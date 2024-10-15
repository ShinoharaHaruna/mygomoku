import React from "react";

interface CellProps {
  value: string;
  onClick: () => void;
  disabled: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, disabled }) => {
  return (
    <button
      className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-white hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {value && (
        <span
          className={`text-xl font-bold ${
            value === "X" ? "text-blue-600" : "text-red-600"
          } animate-pop`}
        >
          {value}
        </span>
      )}
    </button>
  );
};

export default Cell;
