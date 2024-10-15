import React from "react";
import { RefreshCw } from "lucide-react";

interface GameInfoProps {
  currentPlayer: string;
  winner: string | null;
  onReset: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({
  currentPlayer,
  winner,
  onReset,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-slideIn">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Game Info</h2>
      {winner ? (
        <div className="mb-4 animate-bounce">
          <p className="text-2xl font-bold text-green-600">Winner:</p>
          <p className="text-4xl font-bold text-center mt-2">
            <span
              className={`${winner === "X" ? "text-blue-600" : "text-red-600"}`}
            >
              {winner}
            </span>
          </p>
        </div>
      ) : (
        <p className="text-xl mb-4">
          Current Player:{" "}
          <span
            className={`font-bold ${
              currentPlayer === "X" ? "text-blue-600" : "text-red-600"
            } animate-pulse`}
          >
            {currentPlayer}
          </span>
        </p>
      )}
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 w-full justify-center"
        onClick={onReset}
      >
        <RefreshCw size={20} className="animate-spin-slow" />
        New Game
      </button>
    </div>
  );
};

export default GameInfo;
