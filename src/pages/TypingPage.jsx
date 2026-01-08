import { useState, useEffect, useRef } from 'react';
import treeIMG from '../../public/images/tree.png';

const TypingPage = () => {
  // Danh sách bài tập gõ (có thể thêm nhiều bài hơn)
  const typingLessons = [
    {
      id: 1,
      title: 'Bài 1: Cơ bản',
      content:
        'Học gõ phím là kỹ năng quan trọng trong thời đại số. Luyện tập mỗi ngày giúp bạn thành thạo hơn.',
      difficulty: 'Dễ',
    },
    {
      id: 2,
      title: 'Bài 2: Câu dài',
      content:
        'Công nghệ thông tin phát triển nhanh chóng, đòi hỏi mọi người phải không ngừng học hỏi và trau dồi kiến thức mới.',
      difficulty: 'Trung bình',
    },
    {
      id: 3,
      title: 'Bài 3: Thử thách',
      content:
        'Trí tuệ nhân tạo và máy học đang thay đổi cách chúng ta làm việc, giao tiếp và sáng tạo trong thế kỷ 21.',
      difficulty: 'Khó',
    },
    {
      id: 4,
      title: 'Bài 4: Kỹ thuật số',
      content:
        'Chuyển đổi số không chỉ là xu hướng mà còn là yêu cầu tất yếu để phát triển trong kỷ nguyên công nghệ 4.0.',
      difficulty: 'Trung bình',
    },
    {
      id: 5,
      title: 'Bài 5: Lập trình',
      content:
        'Ngôn ngữ lập trình giúp con người giao tiếp với máy tính, tạo ra những ứng dụng thông minh phục vụ cuộc sống.',
      difficulty: 'Khó',
    },
    {
      id: 6,
      title: 'Bài 6: Internet',
      content:
        'Internet đã kết nối thế giới, biến hành tinh rộng lớn trở thành một ngôi làng toàn cầu nơi mọi người có thể tương tác.',
      difficulty: 'Dễ',
    },
  ];

  // State
  const [currentLesson, setCurrentLesson] = useState(typingLessons[0]);
  const [timeLimit, setTimeLimit] = useState(180); // Mặc định 3 phút
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [stats, setStats] = useState({
    correct: 0,
    total: 0,
    accuracy: 0,
    score: 0, // Thêm điểm số
  });
  const [treeProgress, setTreeProgress] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState(1);
  const [timeUsed, setTimeUsed] = useState(0); // Thêm thời gian đã sử dụng

  const inputRef = useRef(null);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  // Hàm tính điểm (thang điểm 10) - ĐÃ LOẠI BỎ WPM
  const calculateScore = (accuracy, progress) => {
    // Công thức tính điểm mới:
    // - Độ chính xác: 70%
    // - Tiến độ: 30%
    let score = 0;

    if (accuracy > 0) {
      score = accuracy * 0.7 + progress * 0.3;
    }

    // Chuẩn hóa về thang điểm 10
    return Math.min(Math.round((score / 10) * 100) / 10, 10);
  };

  // Hàm bắt đầu game
  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setIsTyping(true);
      setGameFinished(false);
      setUserInput('');
      setTimeLeft(timeLimit);
      setTimeUsed(0); // Reset thời gian đã sử dụng
      setStats({ correct: 0, total: 0, accuracy: 0, score: 0 });
      setTreeProgress(0);
      startTimeRef.current = Date.now();

      if (inputRef.current) {
        inputRef.current.focus();
      }

      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });

        // Cập nhật thời gian đã sử dụng
        if (startTimeRef.current) {
          const usedSeconds = Math.floor(
            (Date.now() - startTimeRef.current) / 1000,
          );
          setTimeUsed(usedSeconds);
        }
      }, 1000);
    }
  };

  // Hàm kết thúc game
  const endGame = () => {
    clearInterval(intervalRef.current);
    setIsTyping(false);
    setGameStarted(false);
    setGameFinished(true);

    // Cập nhật thời gian đã sử dụng cuối cùng
    if (startTimeRef.current) {
      const finalTimeUsed = Math.floor(
        (Date.now() - startTimeRef.current) / 1000,
      );
      setTimeUsed(finalTimeUsed);
    }

    // Tính điểm cuối cùng
    const finalScore = calculateScore(stats.accuracy, treeProgress);
    setStats((prev) => ({
      ...prev,
      score: finalScore,
    }));
  };

  // Hàm dừng game
  const stopGame = () => {
    clearInterval(intervalRef.current);
    setIsTyping(false);
    setGameStarted(false);
    setGameFinished(true);

    // Cập nhật thời gian đã sử dụng khi dừng
    if (startTimeRef.current) {
      const finalTimeUsed = Math.floor(
        (Date.now() - startTimeRef.current) / 1000,
      );
      setTimeUsed(finalTimeUsed);
    }

    // Tính điểm khi dừng
    const finalScore = calculateScore(stats.accuracy, treeProgress);
    setStats((prev) => ({
      ...prev,
      score: finalScore,
    }));
  };

  // Hàm reset game
  const resetGame = () => {
    clearInterval(intervalRef.current);
    setGameStarted(false);
    setIsTyping(false);
    setGameFinished(false);
    setUserInput('');
    setTimeLeft(timeLimit);
    setTimeUsed(0); // Reset thời gian đã sử dụng
    setStats({ correct: 0, total: 0, accuracy: 0, score: 0 });
    setTreeProgress(0);
  };

  // Hàm chọn bài và đóng modal
  const selectLessonAndStart = () => {
    const selectedLesson = typingLessons.find(
      (lesson) => lesson.id === selectedLessonId,
    );
    setCurrentLesson(selectedLesson);
    setShowLessonModal(false);
    resetGame();
  };

  // Xử lý thay đổi input - ĐÃ LOẠI BỎ TÍNH WPM
  const handleInputChange = (e) => {
    if (!isTyping || timeLeft <= 0) return;

    const newInput = e.target.value;
    setUserInput(newInput);

    let correctCount = 0;
    for (let i = 0; i < newInput.length; i++) {
      if (
        i < currentLesson.content.length &&
        newInput[i] === currentLesson.content[i]
      ) {
        correctCount++;
      }
    }

    const totalTyped = newInput.length;
    const accuracy = totalTyped > 0 ? (correctCount / totalTyped) * 100 : 0;

    // Tính điểm tạm thời
    const progress = (correctCount / currentLesson.content.length) * 100;
    const currentProgress = Math.min(progress, 100);
    const tempScore = calculateScore(accuracy, currentProgress);

    setStats({
      correct: correctCount,
      total: totalTyped,
      accuracy: Math.round(accuracy),
      score: tempScore,
    });

    setTreeProgress(currentProgress);
  };

  // So sánh từng ký tự để tô màu
  const renderTextWithHighlights = () => {
    const originalText = currentLesson.content;
    const elements = [];

    for (let i = 0; i < originalText.length; i++) {
      let charClass = 'inline px-0.5 rounded';

      if (i < userInput.length) {
        if (userInput[i] === originalText[i]) {
          charClass += ' text-green-500 bg-green-500/10';
        } else {
          charClass += ' text-red-500 bg-red-500/10 line-through';
        }
      } else if (i === userInput.length && isTyping) {
        charClass += ' bg-white/20 border-b-2 border-blue-500';
      }

      elements.push(
        <span key={i} className={charClass}>
          {originalText[i]}
        </span>,
      );
    }

    return elements;
  };

  // Định dạng thời gian
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Vẽ cây thông với gradient dựa trên progress
  const treeLights = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: `${treeProgress}%`,
    background: `linear-gradient(to top, 
      rgba(0, 200, 0, 0) 0%,
      rgba(0, 255, 0, 0.3) ${Math.max(0, treeProgress - 70)}%,
      rgba(0, 255, 100, 0.7) ${Math.max(0, treeProgress - 20)}%,
      rgba(100, 255, 100, 0.9) 100%)`,
    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
    transition: 'height 0.5s ease',
  };

  // Cập nhật thời gian khi thay đổi setting
  useEffect(() => {
    if (!gameStarted) {
      setTimeLeft(timeLimit);
    }
  }, [timeLimit]);

  return (
    <div className="mx-auto">
      {/* Modal chọn bài gõ */}
      {showLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Chọn Bài Gõ</h2>
              <button
                onClick={() => setShowLessonModal(false)}
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
                    onClick={() => setSelectedLessonId(lesson.id)}
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
                onChange={(e) => setTimeLimit(+e.target.value)}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
              />
              <div className="mt-2 flex justify-between text-sm text-gray-400">
                <span>1 phút</span>
                <span>60 phút</span>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLessonModal(false)}
                className="rounded-xl bg-gray-700 px-6 py-3 font-bold text-white hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                onClick={selectLessonAndStart}
                className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-8 py-3 font-bold text-white hover:from-green-600 hover:to-green-700"
              >
                Bắt đầu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kết quả sau khi hoàn thành */}
      {gameFinished && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mb-6">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-green-500/20 p-3">
                <div className="text-4xl">🏆</div>
              </div>
              <h2 className="text-2xl font-bold">Hoàn thành!</h2>
              <p className="mt-2">Bạn đã hoàn thành bài tập</p>
            </div>

            <div className="mb-6 space-y-4">
              <div className="rounded-xl bg-gray-100 p-4">
                <div className="">Điểm số</div>
                <div className="mt-2 text-5xl font-bold text-yellow-500">
                  {stats.score.toFixed(1)}
                  <span className="text-2xl text-yellow-400">/10</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-100 p-3">
                  <div className="">Thời gian đã sử dụng</div>
                  <div className="text-xl font-bold text-blue-500">
                    {formatTime(timeUsed)}
                  </div>
                </div>
                <div className="rounded-xl bg-gray-100 p-3">
                  <div className="">Độ chính xác</div>
                  <div className="text-xl font-bold text-green-500">
                    {stats.accuracy}%
                  </div>
                </div>
                <div className="rounded-xl bg-gray-100 p-3">
                  <div className="">Ký tự đúng</div>
                  <div className="text-xl font-bold text-purple-500">
                    {stats.correct}/{stats.total}
                  </div>
                </div>
                <div className="rounded-xl bg-gray-100 p-3">
                  <div className="">Tiến độ</div>
                  <div className="text-xl font-bold text-orange-500">
                    {Math.round(treeProgress)}%
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setGameFinished(false);
                  resetGame();
                }}
                className="flex-1 rounded-xl bg-gray-700 px-6 py-3 font-bold text-white hover:bg-gray-600"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setGameFinished(false);
                  resetGame();
                  startGame();
                }}
                className="flex-1 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 font-bold text-white hover:from-green-600 hover:to-green-700"
              >
                Chơi lại
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 flex flex-col gap-8 lg:flex-row">
        {/* Cây thông bên trái */}
        <div className="flex flex-col items-center lg:w-1/3">
          <h1 className="title text-center text-3xl drop-shadow-lg md:text-4xl">
            Luyện Gõ Phím
          </h1>

          {/* Nút chọn bài gõ */}
          {!gameStarted && !gameFinished && (
            <button
              onClick={() => setShowLessonModal(true)}
              className="my-4 flex w-full max-w-xs items-center justify-center gap-3 rounded-full bg-green-400 py-3 font-bold text-black transition-all hover:scale-105 hover:from-blue-600 hover:to-blue-700"
            >
              Chọn Bài Gõ
            </button>
          )}

          <div className="relative mb-5 h-112.5 w-100">
            <div className="absolute inset-0">
              <img
                src={treeIMG}
                alt=""
                className="absolute bottom-0 left-1/2 w-72 -translate-x-1/2"
              />
            </div>

            {/* Phần sáng của cây */}
            <div className="absolute inset-0" style={treeLights}></div>
          </div>

          {/* Tiến độ */}
          <div className="w-full max-w-xs text-center">
            <div className="mb-2 h-3 w-full overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full bg-linear-to-r from-green-500 to-green-400 transition-all duration-500"
                style={{ width: `${treeProgress}%` }}
              ></div>
            </div>
            <span className="text-2xl font-bold text-green-600">
              {Math.round(treeProgress)}%
            </span>
          </div>

          {/* Thông báo động viên */}
          <div className="mt-6 flex min-h-15 w-full items-center justify-center rounded-xl bg-white/40 p-4 text-center italic">
            {treeProgress < 30 &&
              'Cố lên! Gõ chính xác để thắp sáng cây thông!'}
            {treeProgress >= 30 &&
              treeProgress < 60 &&
              'Tuyệt vời! Cây thông đang dần sáng lên!'}
            {treeProgress >= 60 &&
              treeProgress < 90 &&
              'Xuất sắc! Cây thông rực sáng!'}
            {treeProgress >= 90 && 'Hoàn hảo! Cây thông tỏa sáng rực rỡ! 🎉'}
          </div>
        </div>

        {/* Phần luyện gõ bên phải */}
        <div className="flex flex-col gap-6 lg:w-2/3">
          {/* Thông tin bài đang chọn */}
          <div className="">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-bold">{currentLesson.title}</h3>
                <div className="mt-2 flex items-center gap-4">
                  <span
                    className={`w-40 rounded-full border bg-white py-1 text-center text-lg font-medium ${
                      currentLesson.difficulty === 'Dễ'
                        ? 'border-green-700 text-green-700'
                        : currentLesson.difficulty === 'Trung bình'
                          ? 'border-yellow-400 text-yellow-400'
                          : 'border-red-500 text-red-500'
                    }`}
                  >
                    {currentLesson.difficulty}
                  </span>
                  <span className="w-40 rounded-full bg-white py-1 text-center text-lg font-medium">
                    {currentLesson.content.length} ký tự
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Đồng hồ */}
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-blue-400 bg-white">
                  <strong className="text-3xl font-bold text-blue-600">
                    {formatTime(timeLeft)}
                  </strong>
                </div>

                {/* Nút dừng khi đang chơi */}
                {gameStarted && (
                  <button
                    onClick={stopGame}
                    className="rounded-xl bg-linear-to-r from-red-500 to-red-600 px-6 py-3 font-bold text-white hover:from-red-600 hover:to-red-700"
                  >
                    ⏸ Dừng
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Hiển thị bài gõ */}
          <div className="min-h-40 rounded-lg bg-white p-4 text-lg">
            {renderTextWithHighlights()}
          </div>

          {/* Ô nhập liệu */}
          <div className="input-area">
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              className="w-full resize-none rounded-2xl border-4 border-blue-600 bg-white/90 p-4 text-lg text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-white/50"
              placeholder={
                gameStarted ? 'Bắt đầu gõ...' : 'Chọn bài gõ và nhấn BẮT ĐẦU'
              }
              disabled={!gameStarted}
              rows="3"
            />
          </div>

          {/* Thống kê - ĐÃ LOẠI BỎ WPM */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border-4 border-blue-600 bg-white/10 p-4 text-center transition-transform hover:scale-[1.02] hover:bg-white/15">
              <div className="mb-2 text-sm opacity-80">Điểm số</div>
              <div className="text-2xl font-bold text-yellow-500">
                {stats.score.toFixed(1)}
                <span className="text-lg text-yellow-400">/10</span>
              </div>
            </div>
            <div className="rounded-2xl border-4 border-blue-600 bg-white/10 p-4 text-center transition-transform hover:scale-[1.02] hover:bg-white/15">
              <div className="mb-2 text-sm opacity-80">Độ chính xác</div>
              <div className="text-2xl font-bold text-green-500">
                {stats.accuracy}%
              </div>
            </div>
            <div className="rounded-2xl border-4 border-blue-600 bg-white/10 p-4 text-center transition-transform hover:scale-[1.02] hover:bg-white/15">
              <div className="mb-2 text-sm opacity-80">Ký tự đúng</div>
              <div className="text-2xl font-bold text-purple-500">
                {stats.correct}/{stats.total}
              </div>
            </div>
            <div className="rounded-2xl border-4 border-blue-600 bg-white/10 p-4 text-center transition-transform hover:scale-[1.02] hover:bg-white/15">
              <div className="mb-2 text-sm opacity-80">Tiến độ</div>
              <div className="text-2xl font-bold text-orange-500">
                {Math.round(treeProgress)}%
              </div>
            </div>
          </div>

          {/* Nút điều khiển */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            {!gameStarted ? (
              <button
                className="flex flex-1 items-center justify-center gap-3 rounded-full bg-linear-to-r from-green-500 to-green-600 px-8 py-3 text-lg font-bold text-white transition-all hover:scale-105 hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:hover:scale-100"
                onClick={startGame}
                disabled={gameFinished}
              >
                BẮT ĐẦU
              </button>
            ) : (
              <button
                className="flex flex-1 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 text-lg font-bold text-white transition-all hover:scale-105 hover:from-orange-600 hover:to-orange-700"
                onClick={resetGame}
              >
                CHƠI LẠI
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingPage;
