import { useState, useEffect, useRef } from 'react';
import dataTyping from '../data/dataTyping.json';

const TypingPage = () => {
  const [lessons] = useState(dataTyping);
  const [currentLesson, setCurrentLesson] = useState(dataTyping[0]);
  const [typedText, setTypedText] = useState('');
  const [progress, setProgress] = useState(0);
  const [coverage, setCoverage] = useState(0); // Phần trăm diện tích được tô màu
  const textAreaRef = useRef(null);

  // Tính toán phần trăm tiến độ gõ và diện tích tô màu
  useEffect(() => {
    if (currentLesson && typedText.length > 0) {
      // Tính phần trăm dựa trên số ký tự đã gõ ĐÚNG
      const correctLength = getCorrectTypedLength();
      const percentage = Math.min(
        (correctLength / currentLesson.content.length) * 100,
        100,
      );
      setProgress(percentage);

      // Phần trăm diện tích được tô màu chính xác bằng phần trăm tiến độ
      // Ví dụ: 10% tiến độ = 10% diện tích hình được tô màu
      setCoverage(percentage);
    } else {
      setProgress(0);
      setCoverage(0);
    }
  }, [typedText, currentLesson]);

  // Xử lý khi chọn bài học
  const handleSelectLesson = (lesson) => {
    setCurrentLesson(lesson);
    setTypedText('');
    setProgress(0);
    setCoverage(0);
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  // Xử lý gõ phím
  const handleTyping = (e) => {
    const input = e.target.value;
    if (input.length <= currentLesson.content.length) {
      setTypedText(input);
    }
  };

  // Hàm render nội dung với định dạng xuống dòng
  const renderFormattedContent = () => {
    const content = currentLesson.content;
    const typed = typedText;

    // Tách nội dung thành các ký tự riêng biệt (bao gồm cả \n)
    const contentChars = content.split('');
    const typedChars = typed.split('');

    let result = [];
    let currentLine = [];
    let charIndex = 0;

    for (let i = 0; i < contentChars.length; i++) {
      const char = contentChars[i];
      const isTyped = charIndex < typedChars.length;
      const typedChar = isTyped ? typedChars[charIndex] : null;

      // Xử lý ký tự xuống dòng
      if (char === '\n') {
        // Thêm dòng hiện tại vào kết quả
        result.push(
          <div key={i} className="mb-2">
            {currentLine}
          </div>,
        );
        currentLine = [];

        // Nếu có ký tự gõ tại vị trí này
        if (isTyped) {
          if (typedChar === '\n') {
            // Gõ đúng xuống dòng - tăng index
            charIndex++;
          }
          // Nếu gõ sai (không phải \n), KHÔNG tăng index
        }
        continue;
      }

      // Xử lý ký tự thông thường
      let className = '';
      if (isTyped) {
        if (typedChar === char) {
          className = 'text-green-600 font-bold';
          charIndex++; // Tăng index khi gõ đúng
        } else {
          className = 'text-red-600 underline';
          // KHÔNG tăng index khi gõ sai - chờ gõ đúng
        }
      }

      currentLine.push(
        <span key={i} className={className}>
          {char}
        </span>,
      );
    }

    // Thêm dòng cuối cùng nếu còn
    if (currentLine.length > 0) {
      result.push(
        <div key="last-line" className="mb-2">
          {currentLine}
        </div>,
      );
    }

    return result;
  };

  // Hàm kiểm tra xem gõ đã đúng đến vị trí nào
  const getCorrectTypedLength = () => {
    const content = currentLesson.content;
    const typed = typedText;
    let correctCount = 0;

    for (let i = 0; i < typed.length; i++) {
      if (i < content.length && typed[i] === content[i]) {
        correctCount++;
      } else {
        break; // Dừng khi gặp lỗi đầu tiên
      }
    }

    return correctCount;
  };

  // Hàm tạo hiệu ứng tô màu dần - PHIÊN BẢN MỚI
  const renderGradualColoring = () => {
    return (
      <>
        {/* Hình ảnh màu hoàn chỉnh (lớp dưới) */}
        <img
          src={currentLesson.image}
          alt={currentLesson.title}
          className="h-full w-full object-cover"
          style={{
            filter: coverage === 100 ? 'none' : 'grayscale(100%)',
            opacity: coverage === 100 ? 1 : 0.3,
          }}
        />

        {/* Lớp phủ màu dần dần */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="h-full transition-all duration-1000 ease-out"
            style={{
              width: `${coverage}%`,
              backgroundImage: `url(${currentLesson.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'none',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            }}
          />
        </div>

        {/* Thông tin phần trăm che phủ */}
        <div className="absolute right-4 bottom-4 rounded-full bg-black/70 px-4 py-2 text-sm font-bold text-white">
          {Math.round(coverage)}% hình ảnh màu
        </div>

        {/* Hiệu ứng đường viền tiến độ */}
        <div
          className="pointer-events-none absolute inset-0 border-4 border-green-500/30"
          style={{
            clipPath: `inset(0 ${100 - coverage}% 0 0)`,
            transition: 'clip-path 0.5s ease-out',
          }}
        />
      </>
    );
  };

  // Hàm tạo hiệu ứng pixel ngẫu nhiên che phủ đều
  const renderRandomCoverage = () => {
    return (
      <>
        {/* Hình ảnh đen trắng (lớp dưới) */}
        <div className="absolute inset-0">
          <img
            src={currentLesson.image}
            alt={currentLesson.title}
            className="h-full w-full object-cover"
            style={{ filter: 'grayscale(100%)' }}
          />
        </div>

        {/* Lớp màu với mask ngẫu nhiên */}
        <div className="absolute inset-0">
          <img
            src={currentLesson.image}
            alt={currentLesson.title}
            className="h-full w-full object-cover"
            style={{
              filter: 'none',
              WebkitMaskImage: `linear-gradient(to right, black ${coverage}%, transparent ${coverage}%)`,
              maskImage: `linear-gradient(to right, black ${coverage}%, transparent ${coverage}%)`,
            }}
          />
        </div>

        {/* Thông tin phần trăm che phủ */}
        <div className="absolute right-4 bottom-4 rounded-full bg-black/70 px-4 py-2 text-sm font-bold text-white">
          {Math.round(coverage)}% hình ảnh màu
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-blue-800 md:text-4xl">
          Luyện Gõ Tiếng Việt - Tô Màu Theo Tiến Độ
        </h1>
        <p className="text-gray-600">
          Gõ đúng để tô màu dần lên hình ảnh! Mỗi 1% tiến độ = 1% diện tích hình
          được tô màu.
        </p>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:gap-8 lg:flex-row">
        {/* Cột bên trái - Danh sách bài học */}
        <div className="rounded-2xl bg-white p-4 shadow-lg md:p-6 lg:w-1/3">
          <h2 className="mb-4 border-b-2 border-green-200 pb-2 text-xl font-bold text-green-800">
            📚 Danh sách bài gõ
          </h2>
          <div className="max-h-[500px] space-y-3 overflow-y-auto pr-2">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => handleSelectLesson(lesson)}
                className={`w-full rounded-xl p-4 text-left transition-all duration-300 ${
                  currentLesson.id === lesson.id
                    ? 'border-2 border-blue-300 bg-gradient-to-r from-blue-100 to-green-100 shadow-md'
                    : 'border border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-300">
                    <img
                      src={lesson.image}
                      alt={lesson.title}
                      className="h-full w-full object-cover"
                      style={{ filter: 'grayscale(100%)' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-bold text-gray-800">
                      {lesson.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {lesson.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                        {lesson.level}
                      </span>
                      <span className="text-xs text-gray-500">
                        {lesson.content.length} ký tự
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
            <h3 className="mb-2 font-bold text-orange-800">
              🎨 Công thức tô màu
            </h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• 1% tiến độ = 1% diện tích hình được tô màu</li>
              <li>• 10% tiến độ = 10% hình ảnh có màu</li>
              <li>• 100% tiến độ = 100% hình ảnh có màu</li>
              <li>• Chỉ tính ký tự gõ đúng mới được tô màu</li>
              <li>• Gõ sai phải sửa lại mới tiếp tục được</li>
            </ul>
          </div>
        </div>

        {/* Cột bên phải - Khu vực gõ và hiển thị hình ảnh */}
        <div className="flex flex-col lg:w-2/3">
          <div className="mb-6 rounded-2xl bg-white p-4 shadow-lg md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {currentLesson.title}
                </h2>
                <p className="text-gray-600">{currentLesson.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round(progress)}%
                </div>
                <div className="text-sm text-gray-500">Tiến độ hoàn thành</div>
              </div>
            </div>

            {/* Thanh tiến độ */}
            <div className="mb-6">
              <div className="relative h-4 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
                  {Math.round(progress)}% tiến độ = {Math.round(coverage)}% diện
                  tích màu
                </div>
              </div>
              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>Bắt đầu (0%)</span>
                <span>
                  {getCorrectTypedLength()}/{currentLesson.content.length} ký tự
                  đúng
                </span>
                <span>Hoàn thành (100%)</span>
              </div>
            </div>

            {/* Hiển thị hình ảnh với hiệu ứng tô màu dần */}
            <div
              className="relative mb-6 overflow-hidden rounded-xl border-4 border-white shadow-lg"
              style={{ height: '400px' }}
            >
              {renderRandomCoverage()}

              {/* Hiển thị thông báo khi hoàn thành */}
              {progress === 100 && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-green-500/20 to-blue-500/20">
                  <div className="animate-pulse rounded-xl border-4 border-green-400 bg-white/95 p-6 text-center shadow-2xl">
                    <div className="mb-3 text-5xl">🏆</div>
                    <div className="mb-2 text-2xl font-bold text-green-600">
                      CHÍNH XÁC 100%!
                    </div>
                    <div className="text-gray-700">
                      Toàn bộ hình ảnh đã được tô màu hoàn chỉnh!
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Nội dung cần gõ với định dạng đa dòng */}
            <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 font-bold text-gray-700">Nội dung cần gõ:</h3>
              <div className="rounded-lg border border-gray-300 bg-white p-4 text-lg leading-relaxed whitespace-pre text-gray-800">
                {renderFormattedContent()}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <span className="text-green-600">● Xanh: </span>Gõ đúng |
                <span className="text-red-600"> ● Đỏ: </span>Gõ sai |
                <span className="text-gray-800"> ● Đen: </span>Chưa gõ
              </div>
            </div>

            {/* Ô nhập văn bản */}
            <div>
              <label className="mb-3 block font-bold text-gray-700">
                Ô gõ văn bản của bạn:
                <span className="ml-2 text-sm font-normal text-gray-500">
                  (Nhấn ENTER để xuống dòng)
                </span>
              </label>
              <textarea
                ref={textAreaRef}
                value={typedText}
                onChange={handleTyping}
                placeholder="Bắt đầu gõ tại đây... Mỗi ký tự đúng sẽ tô thêm màu lên hình ảnh!"
                className="h-40 w-full resize-none rounded-xl border-2 border-blue-300 p-4 text-lg whitespace-pre transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
                autoFocus
              />

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    setTypedText('');
                    setCoverage(0);
                  }}
                  className="rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-5 py-2 text-white transition hover:opacity-90"
                >
                  ↺ Bắt đầu lại
                </button>
                <div className="text-sm text-gray-600">
                  <span
                    className={`rounded-full px-3 py-1 ${
                      progress === 100
                        ? 'bg-green-100 text-green-800'
                        : getCorrectTypedLength() > 0
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {progress === 100
                      ? '🎉 Hoàn thành!'
                      : getCorrectTypedLength() > 0
                        ? `Đang gõ... ${Math.round(coverage)}% màu`
                        : 'Chưa bắt đầu'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (progress === 100) {
                      const nextIndex =
                        lessons.findIndex((l) => l.id === currentLesson.id) + 1;
                      if (nextIndex < lessons.length) {
                        handleSelectLesson(lessons[nextIndex]);
                      }
                    }
                  }}
                  disabled={progress !== 100}
                  className={`rounded-lg px-5 py-2 transition ${
                    progress === 100
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90'
                      : 'cursor-not-allowed bg-gray-200 text-gray-400'
                  }`}
                >
                  → Bài tiếp theo
                </button>
              </div>
            </div>
          </div>

          {/* Thống kê nhỏ */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-blue-100 bg-white p-4 text-center shadow">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(coverage)}%
              </div>
              <div className="text-sm text-gray-600">Diện tích màu</div>
            </div>
            <div className="rounded-xl border border-green-100 bg-white p-4 text-center shadow">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(
                  (getCorrectTypedLength() / typedText.length) * 100,
                ) || 0}
                %
              </div>
              <div className="text-sm text-gray-600">Độ chính xác</div>
            </div>
            <div className="rounded-xl border border-yellow-100 bg-white p-4 text-center shadow">
              <div className="text-2xl font-bold text-yellow-600">
                {Math.round(100 - coverage)}%
              </div>
              <div className="text-sm text-gray-600">Còn lại</div>
            </div>
            <div className="rounded-xl border border-purple-100 bg-white p-4 text-center shadow">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(progress) === 100
                  ? 'A+'
                  : progress >= 80
                    ? 'A'
                    : progress >= 60
                      ? 'B'
                      : 'C'}
              </div>
              <div className="text-sm text-gray-600">Đánh giá</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>© 2024 Luyện Gõ Tiếng Việt - Tô màu hình ảnh theo tiến độ</p>
        <p className="mt-1">Mỗi ký tự đúng = thêm một phần màu sắc lên hình!</p>
      </footer>
    </div>
  );
};

export default TypingPage;
