const TypingArea = ({
  currentLesson,
  userInput,
  isTyping,
  gameStarted,
  inputRef,
  onInputChange,
}) => {
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
        charClass += ' bg-yellow-200 border-b-2 border-blue-500';
      }

      elements.push(
        <span key={i} className={charClass}>
          {originalText[i]}
        </span>,
      );
    }

    return elements;
  };

  return (
    <>
      <div className="mb-6 min-h-32 rounded-xl border-2 border-gray-300 bg-gray-50 p-6 text-lg leading-relaxed">
        {renderTextWithHighlights()}
      </div>

      <div className="mb-6">
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={onInputChange}
          className="w-full resize-none rounded-xl border-4 border-blue-500 bg-white p-4 text-lg text-gray-900 shadow-inner focus:border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
          placeholder={
            gameStarted ? 'Bắt đầu gõ...' : 'Chọn bài gõ và nhấn BẮT ĐẦU'
          }
          disabled={!gameStarted}
          rows="4"
        />
      </div>
    </>
  );
};

export default TypingArea;
