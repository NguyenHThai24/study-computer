import { useState, useEffect, useRef } from 'react';
import GameOverModal from './GameOverModal';
import fireworkIMG from '../../../public/images/firework.png';
// Hàm xáo trộn mảng (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const DoubleClickGame = ({
  score,
  timeLeft,
  isPlaying,
  showGameOver,
  onScoreUpdate,
  onTimeUpdate,
  onGameOver,
  onRestart,
  onExit,
  formatTime,
}) => {
  const [clickCircles, setClickCircles] = useState([]);
  const [nextTarget, setNextTarget] = useState(1); // Số thứ tự cần click tiếp theo
  const [baseNumber, setBaseNumber] = useState(0);
  const gameAreaRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        onTimeUpdate((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            onGameOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, timeLeft, onTimeUpdate, onGameOver]);

  useEffect(() => {
    if (isPlaying) {
      setBaseNumber(0);
      setNextTarget(1);
      generateClickCircles(0);
    }
  }, [isPlaying]);

  const generateClickCircles = (base = baseNumber) => {
    const area = gameAreaRef.current?.getBoundingClientRect();
    if (!area) return;

    const circles = [];
    const numCircles = 10;
    const circleSize = 70;
    const radius = circleSize / 2;
    const padding = 50;
    const gap = 8;
    const maxAttempts = 100;

    const numbers = shuffleArray(
      Array.from({ length: numCircles }, (_, i) => base + i + 1),
    );

    for (let i = 0; i < numCircles; i++) {
      let attempts = 0;
      let validPosition = false;
      let x, y;

      while (!validPosition && attempts < maxAttempts) {
        x = Math.random() * (area.width - circleSize - padding * 2) + padding;
        y = Math.random() * (area.height - circleSize - padding * 2) + padding;

        validPosition = circles.every((circle) => {
          const dx = x + radius - (circle.x + radius);
          const dy = y + radius - (circle.y + radius);
          return Math.hypot(dx, dy) >= radius * 2 + gap;
        });

        attempts++;
      }

      if (!validPosition) continue;

      circles.push({
        id: Date.now() + i,
        x,
        y,
        size: circleSize,
        number: numbers[i],
        isClickable: numbers[i] === base + 1,
      });
    }

    setClickCircles(circles);
  };

  const handleCircleClick = (circleId, circleNumber) => {
    if (timeLeft <= 0 || !isPlaying) return;

    // Kiểm tra xem có click đúng số thứ tự không
    if (circleNumber === nextTarget) {
      setClickCircles((prev) => prev.filter((c) => c.id !== circleId));
      onScoreUpdate((s) => s + 1);

      const newNextTarget = nextTarget + 1;
      setNextTarget(newNextTarget);

      // Nếu hoàn thành 1 vòng (10 số)
      if (newNextTarget > baseNumber + 10) {
        setTimeout(() => {
          const newBase = baseNumber + 10;
          setBaseNumber(newBase);
          setNextTarget(newBase + 1);
          generateClickCircles(newBase);
        }, 500);
      } else {
        setClickCircles((prev) =>
          prev.map((circle) => ({
            ...circle,
            isClickable: circle.number === newNextTarget,
          })),
        );
      }
    } else {
      // Xử lý khi click sai: trừ điểm và thời gian
      onScoreUpdate((s) => Math.max(0, s - 1));
      onTimeUpdate((t) => Math.max(0, t - 2)); // Trừ 2 giây khi click sai

      // Hiệu ứng feedback khi click sai
      const clickedCircle = clickCircles.find((c) => c.id === circleId);
      if (clickedCircle) {
        setClickCircles((prev) =>
          prev.map((circle) =>
            circle.id === circleId ? { ...circle, isWrong: true } : circle,
          ),
        );

        setTimeout(() => {
          setClickCircles((prev) =>
            prev.map((circle) =>
              circle.id === circleId ? { ...circle, isWrong: false } : circle,
            ),
          );
        }, 300);
      }
    }
  };

  return (
    <>
      <div
        ref={gameAreaRef}
        className="relative overflow-hidden rounded-2xl border-4 border-blue-600 bg-white/5 backdrop-blur-sm"
        style={{ height: '500px' }}
      >
        {showGameOver && (
          <GameOverModal
            score={score}
            onRestart={onRestart}
            onExit={onExit}
            formatTime={formatTime}
          />
        )}

        {clickCircles.map((circle) => (
          <div
            key={circle.id}
            className={`absolute transition-all duration-300 ${
              circle.isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
            style={{
              left: circle.x,
              top: circle.y,
              width: circle.size,
              height: circle.size,
            }}
            onDoubleClick={() => handleCircleClick(circle.id, circle.number)}
          >
            {/* Hình ảnh nền */}
            <img
              src={fireworkIMG}
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
            />

            {/* Hình tròn bên trong */}
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${
                circle.isWrong
                  ? 'bg-linear-to-br from-yellow-600 to-yellow-700 ring-4 ring-yellow-400'
                  : 'bg-linear-to-br from-yellow-400 to-yellow-500'
              } ${circle.isClickable ? 'hover:scale-110' : ''}`}
              style={{
                width: '60%',
                height: '60%',
                margin: 'auto',
                // opacity: getOpacity(circle.number, nextTarget),
                transform: circle.isWrong ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <span className="text-3xl font-bold text-red-600">
                {circle.number}
              </span>
            </div>

            {/* Tick đúng */}
            {circle.number === nextTarget && (
              <div className="absolute top-1 right-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-green-500">
                <span className="text-xs font-bold">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default DoubleClickGame;
