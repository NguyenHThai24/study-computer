import { useState } from 'react';
import GameSettings from '../components/mouse-skills/GameSettings';
import GameModeSelector from '../components/mouse-skills/GameModeSelector';
import GameStats from '../components/mouse-skills/GameStats';

import DragGame from '../components/mouse-skills/DragGame';
import DoubleClickGame from '../components/mouse-skills/DoubleClickGame';
import ClickGame from '../components/mouse-skills/ClickGame';

const MouseSkillPage = () => {
  const [gameMode, setGameMode] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScores, setHighScores] = useState({
    drag: 0,
    doubleclick: 0,
    click: 0,
  });
  const [timeSetting, setTimeSetting] = useState(30);
  const [originalTime, setOriginalTime] = useState(30);
  const [showGameOver, setShowGameOver] = useState(false);

  // Format thời gian thành phút:giây
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGameOver = () => {
    setIsPlaying(false);
    setShowGameOver(true);

    // Cập nhật high score
    if (gameMode === 'drag' && score > highScores.drag) {
      setHighScores((prev) => ({ ...prev, drag: score }));
    } else if (gameMode === 'doubleclick' && score > highScores.doubleclick) {
      setHighScores((prev) => ({ ...prev, doubleclick: score }));
    } else if (gameMode === 'click' && score > highScores.click) {
      setHighScores((prev) => ({ ...prev, click: score }));
    }
  };

  const startGame = (mode) => {
    setGameMode(mode);
    setScore(0);
    setTimeLeft(timeSetting);
    setOriginalTime(timeSetting);
    setIsPlaying(true);
    setShowGameOver(false);
  };

  const stopGame = () => {
    setIsPlaying(false);
    setShowGameOver(true);
  };

  const handleRestart = () => {
    setShowGameOver(false);
    startGame(gameMode);
  };

  const handleExit = () => {
    setShowGameOver(false);
    setIsPlaying(false);
    setGameMode(null);
  };

  const handleTimeChange = (value) => {
    if (value >= 30) {
      setTimeSetting(value);
    }
  };

  return (
    <div className="">
      <div className="grid w-full grid-cols-12 gap-6">
        {/* Cột 1: Cài đặt và lựa chọn game mode */}
        <div className="col-span-4">
          <div className="grid grid-cols-2 gap-4">
            <GameSettings
              timeSetting={timeSetting}
              onTimeChange={handleTimeChange}
              isPlaying={isPlaying}
              formatTime={formatTime}
            />

            <GameModeSelector
              gameMode={gameMode}
              isPlaying={isPlaying}
              highScores={highScores}
              onDragGameStart={() => startGame('drag')}
              onDoubleClickGameStart={() => startGame('doubleclick')}
              onClickGameStart={() => startGame('click')}
            />
          </div>
        </div>

        {/* Cột 2: Khu vực hiển thị game */}
        <div className="col-span-8">
          {!gameMode ? (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border-4 border-blue-600 bg-white/5 p-8 backdrop-blur-sm">
              <div className="text-center">
                <h1
                  className="mb-4 text-5xl font-bold"
                  style={{
                    fontFamily: '"Tagesschrift", system-ui',
                    fontSize: '3.5rem',
                    fontWeight: 'bold',
                    color: '#b33100',
                  }}
                >
                  Luyện tập thao tác với chuột
                </h1>
                <p className="mb-8 text-2xl italic">
                  Hãy chọn một chế độ chơi để bắt đầu!
                </p>
              </div>
            </div>
          ) : (
            <div>
              <GameStats
                score={score}
                timeLeft={timeLeft}
                originalTime={originalTime}
                highScores={highScores}
                gameMode={gameMode}
                formatTime={formatTime}
              />

              {gameMode === 'drag' ? (
                <DragGame
                  score={score}
                  timeLeft={timeLeft}
                  isPlaying={isPlaying}
                  showGameOver={showGameOver}
                  onScoreUpdate={setScore}
                  onTimeUpdate={setTimeLeft}
                  onGameOver={handleGameOver}
                  onRestart={handleRestart}
                  onExit={handleExit}
                  formatTime={formatTime}
                />
              ) : gameMode === 'doubleclick' ? (
                <DoubleClickGame
                  score={score}
                  timeLeft={timeLeft}
                  isPlaying={isPlaying}
                  showGameOver={showGameOver}
                  onScoreUpdate={setScore}
                  onTimeUpdate={setTimeLeft}
                  onGameOver={handleGameOver}
                  onRestart={handleRestart}
                  onExit={handleExit}
                  formatTime={formatTime}
                />
              ) : (
                <ClickGame
                  score={score}
                  timeLeft={timeLeft}
                  isPlaying={isPlaying}
                  showGameOver={showGameOver}
                  onScoreUpdate={setScore}
                  onTimeUpdate={setTimeLeft}
                  onGameOver={handleGameOver}
                  onRestart={handleRestart}
                  onExit={handleExit}
                  formatTime={formatTime}
                />
              )}

              <div className="mt-4 text-center">
                <button
                  onClick={stopGame}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-8 py-3 font-bold text-white transition-colors hover:bg-red-600"
                >
                  Dừng Lại
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MouseSkillPage;
