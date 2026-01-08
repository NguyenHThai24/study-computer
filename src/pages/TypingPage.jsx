import LessonModal from '../components/typing-skills/LessonModal';
import ResultModal from '../components/typing-skills/ResultModal';
import ProgressScene from '../components/typing-skills/ProgressScene';
import TypingArea from '../components/typing-skills/TypingArea';
import StatsPanel from '../components/typing-skills/StatsPanel';
import TimeDisplay from '../components/typing-skills/TimeDisplay';
import ControlButtons from '../components/typing-skills/ControlButtons';
import { typingLessons } from '../data/typingLessons';
import { useTypingGame } from '../hooks/useTypingGame';

const TypingPage = () => {
  const {
    currentLesson,
    timeLimit,
    timeLeft,
    isTyping,
    userInput,
    stats,
    treeProgress,
    gameStarted,
    showLessonModal,
    gameFinished,
    selectedLessonId,
    timeUsed,
    inputRef,
    setTimeLimit,
    setShowLessonModal,
    setGameFinished,
    setSelectedLessonId,
    startGame,
    stopGame,
    resetGame,
    selectLessonAndStart,
    handleInputChange,
  } = useTypingGame(typingLessons);

  return (
    <section className="section-home">
      <div className="car__right"></div>
      <div className="mx-auto">
        {/* Modal chọn bài gõ */}
        {showLessonModal && (
          <LessonModal
            typingLessons={typingLessons}
            selectedLessonId={selectedLessonId}
            timeLimit={timeLimit}
            onSelectLesson={setSelectedLessonId}
            onTimeChange={setTimeLimit}
            onClose={() => setShowLessonModal(false)}
            onStart={selectLessonAndStart}
          />
        )}

        {/* Modal kết quả */}
        {gameFinished && (
          <ResultModal
            stats={stats}
            timeUsed={timeUsed}
            treeProgress={treeProgress}
            onClose={() => setGameFinished(false)}
            onRestart={() => {
              setGameFinished(false);
              resetGame();
              startGame();
            }}
            onReset={() => {
              setGameFinished(false);
              resetGame();
            }}
          />
        )}

        {/* Nội dung chính */}
        <div className="flex h-full justify-center gap-8">
          {/* Khung hiển thị tiến trình bên trái */}
          <div className="w-1/2">
            <div className="h-full overflow-hidden rounded-2xl border-4 border-blue-800 p-8">
              <h2 className="title mb-6 text-center text-2xl font-bold text-gray-800">
                Bức Tranh Hoàn Thiện
              </h2>

              {!gameStarted && !gameFinished && (
                <button
                  onClick={() => setShowLessonModal(true)}
                  className="mb-4 w-full rounded-full bg-green-600 py-3 font-bold text-white transition-all hover:cursor-pointer hover:bg-green-700"
                >
                  Chọn Bài Gõ
                </button>
              )}

              <ProgressScene treeProgress={treeProgress} />

              <div className="mt-4 rounded-2xl border-4 border-blue-600 bg-gradient-to-r from-purple-500/30 to-pink-500/30 p-4 text-center text-sm leading-relaxed font-medium text-gray-800">
                {treeProgress < 10 && 'Bắt đầu gõ để tạo nên bức tranh! ✨'}
                {treeProgress >= 10 &&
                  treeProgress < 40 &&
                  'Cây thông đã xuất hiện! Tiếp tục nào! 🌲'}
                {treeProgress >= 40 &&
                  treeProgress < 60 &&
                  'Mây đã xuất hiện! Tuyệt vời! ☁️'}
                {treeProgress >= 60 &&
                  treeProgress < 80 &&
                  'Chim đang bay! Xuất sắc! 🐦'}
                {treeProgress >= 80 &&
                  treeProgress < 100 &&
                  'Thỏ đã xuất hiện! Gần xong rồi! 🐰'}
                {treeProgress >= 100 &&
                  'Hoàn hảo! Bức tranh hoàn chỉnh! 🎉☀️🌸'}
              </div>
            </div>
          </div>

          {/* Phần luyện gõ bên phải */}
          <div className="flex w-1/2 flex-col gap-6">
            <div className="rounded-2xl border-4 border-blue-800 bg-white p-6">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {currentLesson.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-4">
                    <span
                      className={`rounded-full border-2 px-4 py-1 text-sm font-medium ${
                        currentLesson.difficulty === 'Dễ'
                          ? 'border-green-600 bg-green-100 text-green-700'
                          : currentLesson.difficulty === 'Trung bình'
                            ? 'border-yellow-500 bg-yellow-100 text-yellow-700'
                            : 'border-red-500 bg-red-100 text-red-700'
                      }`}
                    >
                      {currentLesson.difficulty}
                    </span>
                    <span className="rounded-full border-2 border-gray-400 bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700">
                      {currentLesson.content.length} ký tự
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <TimeDisplay timeLeft={timeLeft} />

                  {gameStarted && (
                    <ControlButtons
                      onStop={stopGame}
                      isTyping={isTyping}
                      gameStarted={gameStarted}
                    />
                  )}
                </div>
              </div>

              <TypingArea
                currentLesson={currentLesson}
                userInput={userInput}
                isTyping={isTyping}
                gameStarted={gameStarted}
                inputRef={inputRef}
                onInputChange={handleInputChange}
              />

              <StatsPanel stats={stats} treeProgress={treeProgress} />

              <div className="flex justify-center">
                {!gameStarted ? (
                  <button
                    className="w-full rounded-full bg-gradient-to-r from-green-500 to-green-600 px-12 py-4 text-xl font-bold text-white shadow-lg transition-all hover:cursor-pointer hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:hover:scale-100"
                    onClick={startGame}
                    disabled={gameFinished}
                  >
                    ▶ BẮT ĐẦU
                  </button>
                ) : (
                  <button
                    className="w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-12 py-4 text-xl font-bold text-white shadow-lg transition-all hover:cursor-pointer hover:from-orange-600 hover:to-orange-700"
                    onClick={resetGame}
                  >
                    🔄 CHƠI LẠI
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypingPage;
