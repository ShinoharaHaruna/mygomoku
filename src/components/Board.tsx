import React from "react";
import Cell from "./Cell";

interface BoardProps {
  board: string[];
  onCellClick: (index: number) => void;
  winner: string | null;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, winner }) => {
  return (
    <div className="grid grid-cols-15 gap-px bg-gray-300 p-px rounded-lg shadow-lg animate-fadeIn">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          disabled={!!winner}
        />
      ))}
    </div>
  );
};

export default Board;
