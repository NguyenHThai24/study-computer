import { FaClock } from 'react-icons/fa';

const GameSettings = ({ timeSetting, onTimeChange, isPlaying, formatTime }) => {
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    onTimeChange(value);
  };

  return (
    <div className="rounded-2xl border-2 border-white bg-white p-4 backdrop-blur-md">
      <h3 className="mb-4 text-xl font-bold">Cài đặt thời gian</h3>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block">Thời gian luyện tập (giây)</label>
          <input
            type="number"
            min="30"
            value={timeSetting}
            onChange={handleChange}
            className="w-full rounded-lg border-4 border-amber-400 p-3 text-center text-2xl font-bold outline-0"
            disabled={isPlaying}
          />
          <p className="mt-2 text-sm">Ít nhất 30 giây</p>
        </div>
        <div className="rounded-lg bg-white/5 p-2">
          <div className="mb-2 flex items-center gap-2">
            <FaClock className="text-blue-400" />
            <span className="font-semibold">Thời gian đã cài:</span>
            <span className="text-3xl font-bold text-red-600">
              {formatTime(timeSetting)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSettings;
