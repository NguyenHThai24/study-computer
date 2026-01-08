import { formatTime } from '../data/typingLessons';

const LessonModal = ({
  typingLessons,
  selectedLessonId,
  timeLimit,
  onSelectLesson,
  onTimeChange,
  onClose,
  onStart,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Chọn Bài Gõ</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-300">
            Danh sách bài gõ
          </h3>
          <div className="grid max-h-80 grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
            {typingLessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`cursor-pointer rounded-xl border-2 p-4 transition-all hover:scale-[1.02] ${
                  selectedLessonId === lesson.id
                    ? 'border-green-500 bg-green-500/20'
                    : 'border-gray-700 bg-gray-800/50 hover:border-green-400'
                }`}
                onClick={() => onSelectLesson(lesson.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white">{lesson.title}</h4>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          lesson.difficulty === 'Dễ'
                            ? 'bg-green-500/20 text-green-400'
                            : lesson.difficulty === 'Trung bình'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {lesson.difficulty}
                      </span>
                      <span className="text-sm text-gray-400">
                        {lesson.content.length} ký tự
                      </span>
                    </div>
                  </div>
                  {selectedLessonId === lesson.id && (
                    <div className="text-green-500">✓</div>
                  )}
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                  {lesson.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <label className="font-bold text-gray-300">Thời gian:</label>
            <span className="text-2xl font-bold text-green-500">
              {formatTime(timeLimit)}
            </span>
          </div>
          <input
            type="range"
            min="60"
            max="3600"
            step="30"
            value={timeLimit}
            onChange={(e) => onTimeChange(+e.target.value)}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
          />
          <div className="mt-2 flex justify-between text-sm text-gray-400">
            <span>1 phút</span>
            <span>60 phút</span>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-xl bg-gray-700 px-6 py-3 font-bold text-white hover:bg-gray-600"
          >
            Hủy
          </button>
          <button
            onClick={onStart}
            className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-8 py-3 font-bold text-white hover:from-green-600 hover:to-green-700"
          >
            Bắt đầu
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
