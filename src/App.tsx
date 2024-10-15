import { useState, useEffect } from "react";
import Board from "./components/Board";
import GameInfo from "./components/GameInfo";
import { GithubIcon } from "lucide-react";

function App() {
  const [board, setBoard] = useState<string[]>(Array(225).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [lastMove, setLastMove] = useState<number | null>(null);

  useEffect(() => {
    if (lastMove !== null) {
      const timer = setTimeout(() => {
        setLastMove(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lastMove]);

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setLastMove(index);

    if (checkWinner(newBoard, index)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = (board: string[], lastMove: number): boolean => {
    const directions = [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, -1],
    ];
    const size = 15;
    const row = Math.floor(lastMove / size);
    const col = lastMove % size;
    const currentPlayer = board[lastMove];

    for (const [dx, dy] of directions) {
      let count = 1;
      for (let i = 1; i < 5; i++) {
        const newRow = row + i * dx;
        const newCol = col + i * dy;
        if (
          newRow < 0 ||
          newRow >= size ||
          newCol < 0 ||
          newCol >= size ||
          board[newRow * size + newCol] !== currentPlayer
        ) {
          break;
        }
        count++;
      }
      for (let i = 1; i < 5; i++) {
        const newRow = row - i * dx;
        const newCol = col - i * dy;
        if (
          newRow < 0 ||
          newRow >= size ||
          newCol < 0 ||
          newCol >= size ||
          board[newRow * size + newCol] !== currentPlayer
        ) {
          break;
        }
        count++;
      }
      if (count >= 5) {
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    setBoard(Array(225).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
    setLastMove(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-indigo-800 animate-fadeIn">
        It's MyGomoku!!!!!
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <Board board={board} onCellClick={handleCellClick} winner={winner} />
        <GameInfo
          currentPlayer={currentPlayer}
          winner={winner}
          onReset={resetGame}
        />
      </div>
      <footer className="mt-8 text-gray-600 flex items-center gap-2 animate-fadeIn">
        <GithubIcon size={20} className="animate-bounce" />
        <a
          href="https://github.com/shinoharaharuna/mygomoku"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-600 transition-colors"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;
