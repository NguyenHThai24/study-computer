import { formatTime } from '../../data/typingLessons';

const ResultModal = ({ stats, timeUsed, treeProgress, onRestart, onReset }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        <div className="mb-6">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-green-500/20 p-3">
            <div className="text-4xl">🏆</div>
          </div>
          <h2 className="text-2xl font-bold">Hoàn thành!</h2>
          <p className="mt-2 text-gray-600">Bạn đã hoàn thành bài tập</p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="rounded-xl bg-gray-100 p-4">
            <div className="text-gray-600">Điểm số</div>
            <div className="mt-2 text-5xl font-bold text-yellow-500">
              {stats.score.toFixed(1)}
              <span className="text-2xl text-yellow-400">/10</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-gray-100 p-3">
              <div className="text-sm text-gray-600">Thời gian</div>
              <div className="text-xl font-bold text-blue-500">
                {formatTime(timeUsed)}
              </div>
            </div>
            <div className="rounded-xl bg-gray-100 p-3">
              <div className="text-sm text-gray-600">Độ chính xác</div>
              <div className="text-xl font-bold text-green-500">
                {stats.accuracy}%
              </div>
            </div>
            <div className="rounded-xl bg-gray-100 p-3">
              <div className="text-sm text-gray-600">Ký tự đúng</div>
              <div className="text-xl font-bold text-purple-500">
                {stats.correct}/{stats.total}
              </div>
            </div>
            <div className="rounded-xl bg-gray-100 p-3">
              <div className="text-sm text-gray-600">Tiến độ</div>
              <div className="text-xl font-bold text-orange-500">
                {Math.round(treeProgress)}%
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onReset}
            className="flex-1 rounded-xl bg-gray-700 px-6 py-3 font-bold text-white hover:bg-gray-600"
          >
            Đóng
          </button>
          <button
            onClick={onRestart}
            className="flex-1 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 font-bold text-white hover:from-green-600 hover:to-green-700"
          >
            Chơi lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
