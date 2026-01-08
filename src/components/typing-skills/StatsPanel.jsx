const StatsPanel = ({ stats, treeProgress }) => {
  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="rounded-xl border-2 border-yellow-400 bg-yellow-50 p-4 text-center">
        <div className="mb-1 text-sm font-semibold text-gray-600">Điểm số</div>
        <div className="text-2xl font-bold text-yellow-600">
          {stats.score.toFixed(1)}
          <span className="text-lg">/10</span>
        </div>
      </div>
      <div className="rounded-xl border-2 border-green-400 bg-green-50 p-4 text-center">
        <div className="mb-1 text-sm font-semibold text-gray-600">
          Độ chính xác
        </div>
        <div className="text-2xl font-bold text-green-600">
          {stats.accuracy}%
        </div>
      </div>
      <div className="rounded-xl border-2 border-purple-400 bg-purple-50 p-4 text-center">
        <div className="mb-1 text-sm font-semibold text-gray-600">
          Ký tự đúng
        </div>
        <div className="text-2xl font-bold text-purple-600">
          {stats.correct}/{stats.total}
        </div>
      </div>
      <div className="rounded-xl border-2 border-orange-400 bg-orange-50 p-4 text-center">
        <div className="mb-1 text-sm font-semibold text-gray-600">Tiến độ</div>
        <div className="text-2xl font-bold text-orange-600">
          {Math.round(treeProgress)}%
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
