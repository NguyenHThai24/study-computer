import { formatTime } from '../../data/typingLessons';

const TimeDisplay = ({ timeLeft }) => {
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-blue-500 bg-white shadow-lg">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default TimeDisplay;
