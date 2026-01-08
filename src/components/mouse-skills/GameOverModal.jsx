import React from 'react';
import { FaTrophy, FaStar, FaRedo, FaTimes } from 'react-icons/fa';

const GameOverModal = ({ score, onRestart, onExit }) => {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-md rounded-2xl border-2 border-white/20 bg-white p-8">
        <h2 className="mb-4 text-center text-4xl font-bold text-red-500">
          HẾT GIỜ!
        </h2>

        <div className="mb-8 space-y-4">
          <div className="rounded-xl bg-white/10 p-4">
            <div className="mb-2 flex items-center justify-center gap-2">
              <FaTrophy className="text-yellow-400" />
              <span className="text-xl font-semibold">Điểm số của bạn</span>
            </div>
            <div className="text-center text-5xl font-bold text-green-400">
              {score}
            </div>
          </div>

          <div className="rounded-xl bg-white/10 p-4">
            <div className="mb-2 flex items-center justify-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="text-xl font-semibold">Kỷ lục cao nhất</span>
            </div>
            <div className="text-center text-3xl font-bold text-amber-400">
              {score}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onRestart}
            className="mx-auto flex w-36 items-center justify-center gap-2 rounded-full bg-green-500 py-2 text-center font-bold hover:scale-105"
          >
            <FaRedo />
            Chơi Lại
          </button>
          <button
            onClick={onExit}
            className="mx-auto flex w-36 items-center justify-center gap-2 rounded-full bg-red-500 py-2 text-center font-bold hover:scale-105"
          >
            <FaTimes />
            Thoát
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
