import { FaStar, FaClock, FaTrophy } from 'react-icons/fa';

const GameStats = ({
  score,
  timeLeft,
  originalTime,
  highScores,
  gameMode,
  formatTime,
}) => {
  return (
    <div className="mb-6 grid grid-cols-3 gap-4">
      <div className="rounded-xl border-4 border-blue-600 bg-white/10 p-4 backdrop-blur-md">
        <div className="mb-1 flex items-center gap-2 text-red-600">
          <FaStar />
          <span className="font-semibold">Điểm số</span>
        </div>
        <div className="text-4xl font-bold">{score}</div>
      </div>

      <div className="rounded-xl border-4 border-blue-600 bg-white/10 p-4 backdrop-blur-md">
        <div className="mb-1 flex items-center gap-2 text-blue-400">
          <FaClock />
          <span className="font-semibold">Thời gian còn lại</span>
        </div>
        <div
          className={`text-4xl font-bold ${timeLeft <= 10 ? 'animate-pulse text-red-500' : 'text-green-400'}`}
        >
          {formatTime(timeLeft)}
        </div>
        <div className="mt-2 text-sm text-gray-400">
          Tổng thời gian: {formatTime(originalTime)}
        </div>
      </div>

      <div className="rounded-xl border-4 border-blue-600 bg-white/10 p-4 backdrop-blur-md">
        <div className="mb-1 flex items-center gap-2 text-purple-400">
          <FaTrophy />
          <span className="font-semibold">Kỷ lục hiện tại</span>
        </div>
        <div className="text-4xl font-bold">
          {gameMode === 'drag' ? highScores.drag : highScores.click}
        </div>
      </div>
    </div>
  );
};

export default GameStats;
