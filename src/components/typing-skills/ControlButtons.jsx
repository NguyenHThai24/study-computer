const ControlButtons = ({ onStop, isTyping, gameStarted }) => {
  if (!gameStarted) return null;

  return (
    <button
      onClick={onStop}
      className="rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 font-bold text-white hover:from-red-600 hover:to-red-700"
    >
      ⏸ Dừng
    </button>
  );
};

export default ControlButtons;
