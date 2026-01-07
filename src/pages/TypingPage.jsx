import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout bàn phím full size (104 phím)
const keyboardKeys = [
  // Hàng 1 - Function keys
  { id: 'esc', label: 'Esc', keyCode: 'Escape', size: 'small', row: 0 },
  { id: 'f1', label: 'F1', keyCode: 'F1', size: 'small', row: 0 },
  { id: 'f2', label: 'F2', keyCode: 'F2', size: 'small', row: 0 },
  { id: 'f3', label: 'F3', keyCode: 'F3', size: 'small', row: 0 },
  { id: 'f4', label: 'F4', keyCode: 'F4', size: 'small', row: 0 },
  { id: 'f5', label: 'F5', keyCode: 'F5', size: 'small', row: 0 },
  { id: 'f6', label: 'F6', keyCode: 'F6', size: 'small', row: 0 },
  { id: 'f7', label: 'F7', keyCode: 'F7', size: 'small', row: 0 },
  { id: 'f8', label: 'F8', keyCode: 'F8', size: 'small', row: 0 },
  { id: 'f9', label: 'F9', keyCode: 'F9', size: 'small', row: 0 },
  { id: 'f10', label: 'F10', keyCode: 'F10', size: 'small', row: 0 },
  { id: 'f11', label: 'F11', keyCode: 'F11', size: 'small', row: 0 },
  { id: 'f12', label: 'F12', keyCode: 'F12', size: 'small', row: 0 },

  // Hàng 2
  { id: 'backtick', label: '` ~', keyCode: 'Backquote', row: 1 },
  { id: '1', label: '1 !', keyCode: 'Digit1', row: 1 },
  { id: '2', label: '2 @', keyCode: 'Digit2', row: 1 },
  { id: '3', label: '3 #', keyCode: 'Digit3', row: 1 },
  { id: '4', label: '4 $', keyCode: 'Digit4', row: 1 },
  { id: '5', label: '5 %', keyCode: 'Digit5', row: 1 },
  { id: '6', label: '6 ^', keyCode: 'Digit6', row: 1 },
  { id: '7', label: '7 &', keyCode: 'Digit7', row: 1 },
  { id: '8', label: '8 *', keyCode: 'Digit8', row: 1 },
  { id: '9', label: '9 (', keyCode: 'Digit9', row: 1 },
  { id: '0', label: '0 )', keyCode: 'Digit0', row: 1 },
  { id: 'minus', label: '- _', keyCode: 'Minus', row: 1 },
  { id: 'equal', label: '= +', keyCode: 'Equal', row: 1 },
  {
    id: 'backspace',
    label: 'Backspace',
    keyCode: 'Backspace',
    size: 'large',
    row: 1,
  },

  // Hàng 3
  { id: 'tab', label: 'Tab', keyCode: 'Tab', size: 'medium', row: 2 },
  { id: 'q', label: 'Q', keyCode: 'KeyQ', row: 2 },
  { id: 'w', label: 'W', keyCode: 'KeyW', row: 2 },
  { id: 'e', label: 'E', keyCode: 'KeyE', row: 2 },
  { id: 'r', label: 'R', keyCode: 'KeyR', row: 2 },
  { id: 't', label: 'T', keyCode: 'KeyT', row: 2 },
  { id: 'y', label: 'Y', keyCode: 'KeyY', row: 2 },
  { id: 'u', label: 'U', keyCode: 'KeyU', row: 2 },
  { id: 'i', label: 'I', keyCode: 'KeyI', row: 2 },
  { id: 'o', label: 'O', keyCode: 'KeyO', row: 2 },
  { id: 'p', label: 'P', keyCode: 'KeyP', row: 2 },
  { id: 'bracket-open', label: '[ {', keyCode: 'BracketLeft', row: 2 },
  { id: 'bracket-close', label: '] }', keyCode: 'BracketRight', row: 2 },
  {
    id: 'backslash',
    label: '\\ |',
    keyCode: 'Backslash',
    size: 'medium',
    row: 2,
  },

  // Hàng 4
  {
    id: 'capslock',
    label: 'Caps Lock',
    keyCode: 'CapsLock',
    size: 'large',
    row: 3,
  },
  { id: 'a', label: 'A', keyCode: 'KeyA', row: 3 },
  { id: 's', label: 'S', keyCode: 'KeyS', row: 3 },
  { id: 'd', label: 'D', keyCode: 'KeyD', row: 3 },
  { id: 'f', label: 'F', keyCode: 'KeyF', row: 3 },
  { id: 'g', label: 'G', keyCode: 'KeyG', row: 3 },
  { id: 'h', label: 'H', keyCode: 'KeyH', row: 3 },
  { id: 'j', label: 'J', keyCode: 'KeyJ', row: 3 },
  { id: 'k', label: 'K', keyCode: 'KeyK', row: 3 },
  { id: 'l', label: 'L', keyCode: 'KeyL', row: 3 },
  { id: 'semicolon', label: '; :', keyCode: 'Semicolon', row: 3 },
  { id: 'quote', label: '\' "', keyCode: 'Quote', row: 3 },
  {
    id: 'enter',
    label: 'Enter',
    keyCode: 'Enter',
    size: 'extra-large',
    row: 3,
  },

  // Hàng 5
  {
    id: 'shift-left',
    label: 'Shift',
    keyCode: 'ShiftLeft',
    size: 'extra-large',
    row: 4,
  },
  { id: 'z', label: 'Z', keyCode: 'KeyZ', row: 4 },
  { id: 'x', label: 'X', keyCode: 'KeyX', row: 4 },
  { id: 'c', label: 'C', keyCode: 'KeyC', row: 4 },
  { id: 'v', label: 'V', keyCode: 'KeyV', row: 4 },
  { id: 'b', label: 'B', keyCode: 'KeyB', row: 4 },
  { id: 'n', label: 'N', keyCode: 'KeyN', row: 4 },
  { id: 'm', label: 'M', keyCode: 'KeyM', row: 4 },
  { id: 'comma', label: ', <', keyCode: 'Comma', row: 4 },
  { id: 'period', label: '. >', keyCode: 'Period', row: 4 },
  { id: 'slash', label: '/ ?', keyCode: 'Slash', row: 4 },
  {
    id: 'shift-right',
    label: 'Shift',
    keyCode: 'ShiftRight',
    size: 'extra-large',
    row: 4,
  },

  // Hàng 6
  {
    id: 'ctrl-left',
    label: 'Ctrl',
    keyCode: 'ControlLeft',
    size: 'medium',
    row: 5,
  },
  { id: 'win-left', label: 'Win', keyCode: 'MetaLeft', size: 'medium', row: 5 },
  { id: 'alt-left', label: 'Alt', keyCode: 'AltLeft', size: 'medium', row: 5 },
  {
    id: 'space',
    label: 'Space',
    keyCode: 'Space',
    size: 'extra-large',
    row: 5,
  },
  {
    id: 'alt-right',
    label: 'Alt',
    keyCode: 'AltRight',
    size: 'medium',
    row: 5,
  },
  {
    id: 'win-right',
    label: 'Win',
    keyCode: 'MetaRight',
    size: 'medium',
    row: 5,
  },
  { id: 'menu', label: 'Menu', keyCode: 'ContextMenu', size: 'medium', row: 5 },
  {
    id: 'ctrl-right',
    label: 'Ctrl',
    keyCode: 'ControlRight',
    size: 'medium',
    row: 5,
  },
];

const TypingPage = () => {
  // State cho game
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7);
  const [currentKey, setCurrentKey] = useState(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [message, setMessage] = useState('');
  const [keysPressed, setKeysPressed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  // Khởi tạo game
  const startGame = useCallback(() => {
    setIsGameActive(true);
    setScore(0);
    setTimeLeft(7);
    setKeysPressed(0);
    setAccuracy(100);
    setMessage('');
    selectRandomKey();
  }, []);

  // Chọn phím ngẫu nhiên
  const selectRandomKey = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * keyboardKeys.length);
    setCurrentKey(keyboardKeys[randomIndex]);
    setTimeLeft(7);
  }, []);

  // Xử lý khi người dùng nhấn phím
  const handleKeyPress = useCallback(
    (event) => {
      if (!isGameActive || !currentKey) return;

      const pressedKey = event.code;
      setKeysPressed((prev) => prev + 1);

      if (pressedKey === currentKey.keyCode) {
        // Đúng phím
        setScore((prev) => prev + 1);
        setMessage('✓ Đúng! +1 điểm');

        // Hiệu ứng visual cho phím đúng
        const keyElement = document.getElementById(currentKey.id);
        if (keyElement) {
          keyElement.classList.add('correct-key');
          setTimeout(() => {
            keyElement.classList.remove('correct-key');
          }, 300);
        }
      } else {
        // Sai phím
        setScore((prev) => prev - 1);
        setMessage('✗ Sai! -1 điểm');

        // Hiệu ứng visual cho phím sai (nếu tìm được phím người dùng nhấn)
        const pressedKeyData = keyboardKeys.find(
          (k) => k.keyCode === pressedKey,
        );
        if (pressedKeyData) {
          const keyElement = document.getElementById(pressedKeyData.id);
          if (keyElement) {
            keyElement.classList.add('wrong-key');
            setTimeout(() => {
              keyElement.classList.remove('wrong-key');
            }, 300);
          }
        }
      }

      // Tính độ chính xác
      const correctKeys = score + 1;
      const totalKeys = keysPressed + 1;
      const newAccuracy = Math.round((correctKeys / totalKeys) * 100);
      setAccuracy(newAccuracy);

      // Chọn phím mới
      setTimeout(() => {
        setMessage('');
        selectRandomKey();
      }, 500);
    },
    [currentKey, isGameActive, score, keysPressed, selectRandomKey],
  );

  // Hiệu ứng timer
  useEffect(() => {
    let timer;

    if (isGameActive && currentKey && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Hết thời gian
            setScore((prev) => prev - 1);
            setMessage('⏰ Hết thời gian! -1 điểm');
            setTimeout(() => {
              setMessage('');
              selectRandomKey();
            }, 1000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isGameActive, currentKey, timeLeft, selectRandomKey]);

  // Lắng nghe sự kiện bàn phím
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isGameActive) {
        if (event.code === 'Space') {
          startGame();
        }
        return;
      }
      handleKeyPress(event);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameActive, handleKeyPress, startGame]);

  // Chọn phím đầu tiên khi component mount
  useEffect(() => {
    selectRandomKey();
  }, [selectRandomKey]);

  // Render bàn phím theo hàng
  const renderKeyboardRows = () => {
    const rows = [];

    for (let row = 0; row <= 5; row++) {
      const rowKeys = keyboardKeys.filter((key) => key.row === row);

      rows.push(
        <div key={`row-${row}`} className="keyboard-row">
          {rowKeys.map((key) => {
            const isCurrentKey = currentKey?.id === key.id;
            const sizeClass = key.size || 'small';

            return (
              <motion.div
                key={key.id}
                id={key.id}
                className={`key ${sizeClass} ${isCurrentKey ? 'active-key' : ''}`}
                initial={{ scale: 1 }}
                animate={
                  isCurrentKey
                    ? {
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(34, 197, 94, 0)',
                          '0 0 0 10px rgba(34, 197, 94, 0.3)',
                          '0 0 0 0 rgba(34, 197, 94, 0)',
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <div className="key-label">{key.label}</div>
                {isCurrentKey && (
                  <div className="timer-indicator">
                    <div
                      className="timer-fill"
                      style={{
                        width: `${(timeLeft / 3) * 100}%`,
                        backgroundColor:
                          timeLeft <= 1
                            ? '#ef4444'
                            : timeLeft <= 2
                              ? '#f59e0b'
                              : '#22c55e',
                      }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>,
      );
    }

    return rows;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-white md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">⌨️ Tập Gõ Bàn Phím</h1>
          <p className="text-gray-300">
            Gõ phím màu xanh lá trong 7 giây để ghi điểm!
          </p>
        </div>

        {/* Game Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <motion.div
            className="rounded-xl bg-gray-800 p-4 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div
              className="text-3xl font-bold"
              style={{ color: score >= 0 ? '#22c55e' : '#ef4444' }}
            >
              {score}
            </div>
            <div className="mt-1 text-sm text-gray-400">ĐIỂM SỐ</div>
          </motion.div>

          <motion.div
            className="rounded-xl bg-gray-800 p-4 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-blue-400">{timeLeft}s</div>
            <div className="mt-1 text-sm text-gray-400">THỜI GIAN CÒN LẠI</div>
          </motion.div>

          <motion.div
            className="rounded-xl bg-gray-800 p-4 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-yellow-400">
              {keysPressed}
            </div>
            <div className="mt-1 text-sm text-gray-400">SỐ LẦN GÕ</div>
          </motion.div>

          <motion.div
            className="rounded-xl bg-gray-800 p-4 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-purple-400">
              {accuracy}%
            </div>
            <div className="mt-1 text-sm text-gray-400">ĐỘ CHÍNH XÁC</div>
          </motion.div>
        </div>

        {/* Current Key Display */}
        <AnimatePresence mode="wait">
          {isGameActive && currentKey && (
            <motion.div
              key="current-key-display"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-8 text-center"
            >
              <div className="mb-2 text-lg text-gray-300">Phím cần gõ:</div>
              <motion.div
                className="inline-block rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 text-4xl font-bold text-white shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {currentKey.label}
              </motion.div>
              <div className="mt-2 text-sm text-gray-400">
                Gõ phím{' '}
                <span className="font-mono text-green-400">
                  {currentKey.keyCode
                    .replace('Key', '')
                    .replace('Digit', '')
                    .replace('Arrow', '')}
                </span>{' '}
                trên bàn phím
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message Display */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`mb-6 rounded-lg p-3 text-center text-xl font-semibold ${
                message.includes('Đúng')
                  ? 'bg-green-900/30 text-green-400'
                  : message.includes('Sai')
                    ? 'bg-red-900/30 text-red-400'
                    : 'bg-yellow-900/30 text-yellow-400'
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Controls */}
        <div className="mb-8 text-center">
          {!isGameActive ? (
            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl"
            >
              🎮 Bắt đầu chơi (Nhấn Space)
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsGameActive(false)}
              className="rounded-xl bg-gradient-to-r from-red-500 to-pink-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl"
            >
              ⏸️ Tạm dừng
            </motion.button>
          )}

          <div className="mt-4 text-sm text-gray-400">
            <p>📌 Luật chơi: Gõ phím màu xanh lá trong 3 giây</p>
            <p>
              ✅ Gõ đúng: +1 điểm | ❌ Gõ sai: -1 điểm | ⏰ Hết giờ: -1 điểm
            </p>
          </div>
        </div>

        {/* Keyboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6 shadow-2xl backdrop-blur-sm"
        >
          <div className="keyboard-container">{renderKeyboardRows()}</div>
        </motion.div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .keyboard-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          user-select: none;
        }

        .keyboard-row {
          display: flex;
          justify-content: center;
          gap: 6px;
        }

        .key {
          background: linear-gradient(145deg, #2d3748, #1a202c);
          border-radius: 8px;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
          border: 1px solid #4a5568;
        }

        .key.small {
          width: 60px;
          height: 60px;
        }

        .key.medium {
          width: 80px;
          height: 60px;
        }

        .key.large {
          width: 100px;
          height: 60px;
        }

        .key.extra-large {
          width: 120px;
          height: 60px;
        }

        .key-label {
          font-size: 14px;
          font-weight: 600;
          text-align: center;
        }

        .active-key {
          background: linear-gradient(145deg, #22c55e, #16a34a);
          color: white;
          border-color: #22c55e;
          z-index: 10;
        }

        .timer-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 0 0 8px 8px;
          overflow: hidden;
        }

        .timer-fill {
          height: 100%;
          transition: width 1s linear;
        }

        .correct-key {
          background: linear-gradient(145deg, #22c55e, #16a34a) !important;
          transform: scale(0.95);
        }

        .wrong-key {
          background: linear-gradient(145deg, #ef4444, #dc2626) !important;
          transform: scale(0.95);
        }

        @media (max-width: 768px) {
          .key {
            padding: 8px 4px;
          }

          .key.small {
            width: 40px;
            height: 40px;
          }

          .key.medium {
            width: 50px;
            height: 40px;
          }

          .key.large {
            width: 60px;
            height: 40px;
          }

          .key.extra-large {
            width: 70px;
            height: 40px;
          }

          .key-label {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default TypingPage;
