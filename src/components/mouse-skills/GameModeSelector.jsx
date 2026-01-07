import { FaTrophy } from 'react-icons/fa';
import dartsIMG from '../../../public/images/darts.png';
import doubleClickIMG from '../../../public/images/double-click.png';
import clickIMG from '../../../public/images/click.png';

const GameModeSelector = ({
  gameMode,
  isPlaying,
  highScores,
  onDragGameStart,
  onDoubleClickGameStart,
  onClickGameStart,
}) => {
  return (
    <>
      <div
        className={`cursor-pointer rounded-2xl border-2 ${gameMode === 'drag' ? 'border-yellow-400' : 'border-white'} bg-white/10 p-8 backdrop-blur-md transition-all hover:scale-105 hover:border-yellow-400/50`}
        onClick={!isPlaying ? onDragGameStart : undefined}
      >
        <div className="text-center">
          <img src={dartsIMG} alt="Darts" className="mx-auto mb-4 h-24 w-24" />
          <h2 className="mb-3 text-2xl font-bold">Kéo Thả</h2>
          <p className="mb-4">
            Nhấn giữ <b>chuột trái</b> vào mũi tên và kéo đến mục tiêu
          </p>
          <div className="flex items-center justify-center gap-2 text-red-600">
            <FaTrophy />
            <span className="font-semibold">
              Kỷ lục: {highScores.drag} điểm
            </span>
          </div>
        </div>
      </div>

      <div
        className={`cursor-pointer rounded-2xl border-2 ${gameMode === 'doubleclick' ? 'border-yellow-400' : 'border-white'} bg-white/10 p-8 backdrop-blur-md transition-all hover:scale-105 hover:border-yellow-400/50`}
        onClick={!isPlaying ? onDoubleClickGameStart : undefined}
      >
        <div className="text-center">
          <img
            src={doubleClickIMG}
            alt="doubleClickIMG"
            className="mx-auto mb-4 h-24 w-24"
          />
          <h2 className="mb-3 text-2xl font-bold">Double Click</h2>
          <p className="mb-4">
            Nháy đúp <b>chuột trái</b> để phá vỡ các hình tròn xuất hiện!
          </p>
          <div className="flex items-center justify-center gap-2 text-red-600">
            <FaTrophy />
            <span className="font-semibold">
              Kỷ lục: {highScores.doubleclick} điểm
            </span>
          </div>
        </div>
      </div>

      <div
        className={`cursor-pointer rounded-2xl border-2 ${gameMode === 'click' ? 'border-yellow-400' : 'border-white'} bg-white/10 p-8 backdrop-blur-md transition-all hover:scale-105 hover:border-yellow-400/50`}
        onClick={!isPlaying ? onClickGameStart : undefined}
      >
        <div className="text-center">
          <img
            src={clickIMG}
            alt="clickIMG"
            className="mx-auto mb-4 h-24 w-24"
          />
          <h2 className="mb-3 text-2xl font-bold">Click</h2>
          <p className="mb-4">
            Nhấn <b>chuột trái</b> để phá vỡ các hình tròn xuất hiện!
          </p>
          <div className="flex items-center justify-center gap-2 text-red-600">
            <FaTrophy />
            <span className="font-semibold">
              Kỷ lục: {highScores.click} điểm
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameModeSelector;
