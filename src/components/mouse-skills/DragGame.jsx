import { useState, useEffect, useRef, useCallback } from 'react';
import { GiFireworkRocket } from 'react-icons/gi';
import GameOverModal from './GameOverModal';
import dartsIMG from '../../../public/images/darts.png';

const DragGame = ({
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
  const [dragCircle, setDragCircle] = useState(null);
  const [targetPos, setTargetPos] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const gameAreaRef = useRef(null);
  const dragCircleRef = useRef(null);
  const timerRef = useRef(null);

  // Sử dụng useRef để lưu vị trí chuột hiện tại
  const mousePosRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const targetPosRef = useRef(null); // Thêm ref để lưu targetPos
  const circlePosRef = useRef({ x: 0, y: 0 }); // Thêm ref để lưu vị trí hình tròn

  useEffect(() => {
    targetPosRef.current = targetPos; // Cập nhật ref khi targetPos thay đổi
  }, [targetPos]);

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
    return () => {
      clearInterval(timerRef.current);
    };
  }, [isPlaying, timeLeft, onTimeUpdate, onGameOver]);

  useEffect(() => {
    if (isPlaying) {
      generateDragTarget();
    }
  }, [isPlaying]);

  const generateDragTarget = () => {
    const area = gameAreaRef.current?.getBoundingClientRect();
    if (!area) return;

    const circleSize = 60;
    const padding = 50;

    const startX =
      Math.random() * (area.width - circleSize - padding * 2) + padding;
    const startY =
      Math.random() * (area.height - circleSize - padding * 2) + padding;

    let targetX, targetY;
    do {
      targetX =
        Math.random() * (area.width - circleSize - padding * 2) + padding;
      targetY =
        Math.random() * (area.height - circleSize - padding * 2) + padding;
    } while (Math.hypot(targetX - startX, targetY - startY) < 150);

    setDragCircle({ x: startX, y: startY, size: circleSize });
    setTargetPos({ x: targetX, y: targetY, size: circleSize });
    setShowSuccess(false);
  };

  // Animation loop để cập nhật vị trí vật kéo
  const updateDragPosition = useCallback(() => {
    if (!isDraggingRef.current || !dragCircleRef.current || !dragCircle) return;

    const rect = gameAreaRef.current.getBoundingClientRect();
    const mouseX = mousePosRef.current.x - rect.left;
    const mouseY = mousePosRef.current.y - rect.top;

    const newX = mouseX - offsetRef.current.x;
    const newY = mouseY - offsetRef.current.y;

    const area = gameAreaRef.current.getBoundingClientRect();
    const maxX = area.width - dragCircle.size;
    const maxY = area.height - dragCircle.size;
    const clampedX = Math.max(0, Math.min(newX, maxX));
    const clampedY = Math.max(0, Math.min(newY, maxY));

    // Lưu vị trí hiện tại vào ref
    circlePosRef.current = { x: clampedX, y: clampedY };

    // Cập nhật DOM trực tiếp cho mượt mà
    dragCircleRef.current.style.transform = `translate(${clampedX}px, ${clampedY}px)`;

    // Kiểm tra khoảng cách với mục tiêu
    if (targetPosRef.current) {
      const distance = Math.hypot(
        clampedX +
          dragCircle.size / 2 -
          (targetPosRef.current.x + targetPosRef.current.size / 2),
        clampedY +
          dragCircle.size / 2 -
          (targetPosRef.current.y + targetPosRef.current.size / 2),
      );

      const isNear = distance < 40;

      if (dragCircleRef.current) {
        if (isNear) {
          dragCircleRef.current.style.background =
            'linear-gradient(to bottom right, #4ade80, #22c55e)';
        } else {
          dragCircleRef.current.style.background =
            'linear-gradient(to bottom right, #60a5fa, #8b5cf6)';
        }
      }
    }

    // Cập nhật state vị trí
    setDragCircle((prev) => ({ ...prev, x: clampedX, y: clampedY }));

    // Yêu cầu frame tiếp theo
    requestAnimationFrame(updateDragPosition);
  }, [dragCircle]);

  const handleMouseDown = useCallback(
    (e) => {
      if (!dragCircle || timeLeft <= 0 || isDragging) return;

      const rect = gameAreaRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const distance = Math.hypot(
        mouseX - (dragCircle.x + dragCircle.size / 2),
        mouseY - (dragCircle.y + dragCircle.size / 2),
      );

      if (distance <= dragCircle.size / 2) {
        e.preventDefault();

        // Lưu vị trí chuột hiện tại
        mousePosRef.current = { x: e.clientX, y: e.clientY };

        // Tính offset giữa chuột và tâm hình tròn
        offsetRef.current = {
          x: mouseX - dragCircle.x,
          y: mouseY - dragCircle.y,
        };

        // Bắt đầu kéo
        isDraggingRef.current = true;
        setIsDragging(true);

        // Bắt đầu animation loop
        requestAnimationFrame(updateDragPosition);

        // Thêm event listeners
        const handleGlobalMouseMove = (e) => {
          mousePosRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleGlobalMouseUp = (e) => {
          isDraggingRef.current = false;
          setIsDragging(false);

          // Kiểm tra khoảng cách trực tiếp khi thả chuột
          if (targetPosRef.current && e.button === 0) {
            const currentCirclePos = circlePosRef.current;
            const currentTargetPos = targetPosRef.current;

            const distance = Math.hypot(
              currentCirclePos.x +
                dragCircle.size / 2 -
                (currentTargetPos.x + currentTargetPos.size / 2),
              currentCirclePos.y +
                dragCircle.size / 2 -
                (currentTargetPos.y + currentTargetPos.size / 2),
            );

            if (distance < 40) {
              handleTargetClick();
            }
          }

          document.removeEventListener('mousemove', handleGlobalMouseMove);
          document.removeEventListener('mouseup', handleGlobalMouseUp);
        };

        document.addEventListener('mousemove', handleGlobalMouseMove);
        document.addEventListener('mouseup', handleGlobalMouseUp);
      }
    },
    [dragCircle, timeLeft, isDragging, updateDragPosition],
  );

  const handleTargetClick = () => {
    if (timeLeft <= 0) return;

    setShowSuccess(true);
    onScoreUpdate((s) => s + 1);

    setTimeout(() => {
      setShowSuccess(false);
      generateDragTarget();
    }, 200);
  };

  // Cập nhật vị trí ban đầu khi không kéo
  useEffect(() => {
    if (dragCircleRef.current && dragCircle && !isDragging) {
      dragCircleRef.current.style.transform = `translate(${dragCircle.x}px, ${dragCircle.y}px)`;
      circlePosRef.current = { x: dragCircle.x, y: dragCircle.y };
    }
  }, [dragCircle, isDragging]);

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

        {targetPos && (
          <>
            <div
              className="absolute flex items-center justify-center rounded-full border-4 border-dashed border-yellow-400 bg-yellow-400/20"
              style={{
                left: targetPos.x,
                top: targetPos.y,
                width: targetPos.size,
                height: targetPos.size,
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400">
                <img src={dartsIMG} alt="Target" className="h-8 w-8" />
              </div>
            </div>

            <div
              className="absolute rounded-full border-2 border-green-400/50"
              style={{
                left: targetPos.x - 20,
                top: targetPos.y - 20,
                width: targetPos.size + 40,
                height: targetPos.size + 40,
              }}
            />

            {showSuccess && (
              <div
                className="absolute z-10 flex items-center justify-center rounded-full bg-green-500/50"
                style={{
                  left: targetPos.x - 30,
                  top: targetPos.y - 30,
                  width: targetPos.size + 60,
                  height: targetPos.size + 60,
                }}
              >
                <div
                  className="animate-ping rounded-full bg-green-400"
                  style={{
                    width: targetPos.size + 40,
                    height: targetPos.size + 40,
                  }}
                />
              </div>
            )}
          </>
        )}

        {dragCircle && (
          <>
            <div
              ref={dragCircleRef}
              className={`absolute top-0 left-0 flex cursor-grab items-center justify-center rounded-full shadow-2xl ${isDragging ? 'scale-110 cursor-grabbing ring-4 ring-blue-300/50' : ''}`}
              style={{
                width: dragCircle.size,
                height: dragCircle.size,
                transform: `translate(${dragCircle.x}px, ${dragCircle.y}px)`,
              }}
              onMouseDown={handleMouseDown}
            >
              <GiFireworkRocket className="rotate-270 text-2xl text-white" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DragGame;
