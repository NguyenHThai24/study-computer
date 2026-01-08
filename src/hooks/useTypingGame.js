import { useState, useEffect, useRef } from 'react';

export const useTypingGame = (typingLessons) => {
  const [currentLesson, setCurrentLesson] = useState(typingLessons[0]);
  const [timeLimit, setTimeLimit] = useState(180);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [stats, setStats] = useState({
    correct: 0,
    total: 0,
    accuracy: 0,
    score: 0,
  });
  const [treeProgress, setTreeProgress] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState(1);
  const [timeUsed, setTimeUsed] = useState(0);

  const inputRef = useRef(null);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  const calculateScore = (accuracy, progress) => {
    let score = 0;
    if (accuracy > 0) {
      score = accuracy * 0.7 + progress * 0.3;
    }
    return Math.min(Math.round((score / 10) * 100) / 10, 10);
  };

  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setIsTyping(true);
      setGameFinished(false);
      setUserInput('');
      setTimeLeft(timeLimit);
      setTimeUsed(0);
      setStats({ correct: 0, total: 0, accuracy: 0, score: 0 });
      setTreeProgress(0);
      startTimeRef.current = Date.now();

      if (inputRef.current) {
        inputRef.current.focus();
      }

      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });

        if (startTimeRef.current) {
          const usedSeconds = Math.floor(
            (Date.now() - startTimeRef.current) / 1000,
          );
          setTimeUsed(usedSeconds);
        }
      }, 1000);
    }
  };

  const endGame = () => {
    clearInterval(intervalRef.current);
    setIsTyping(false);
    setGameStarted(false);
    setGameFinished(true);

    if (startTimeRef.current) {
      const finalTimeUsed = Math.floor(
        (Date.now() - startTimeRef.current) / 1000,
      );
      setTimeUsed(finalTimeUsed);
    }

    const finalScore = calculateScore(stats.accuracy, treeProgress);
    setStats((prev) => ({ ...prev, score: finalScore }));
  };

  const stopGame = () => {
    clearInterval(intervalRef.current);
    setIsTyping(false);
    setGameStarted(false);
    setGameFinished(true);

    if (startTimeRef.current) {
      const finalTimeUsed = Math.floor(
        (Date.now() - startTimeRef.current) / 1000,
      );
      setTimeUsed(finalTimeUsed);
    }

    const finalScore = calculateScore(stats.accuracy, treeProgress);
    setStats((prev) => ({ ...prev, score: finalScore }));
  };

  const resetGame = () => {
    clearInterval(intervalRef.current);
    setGameStarted(false);
    setIsTyping(false);
    setGameFinished(false);
    setUserInput('');
    setTimeLeft(timeLimit);
    setTimeUsed(0);
    setStats({ correct: 0, total: 0, accuracy: 0, score: 0 });
    setTreeProgress(0);
  };

  const selectLessonAndStart = () => {
    const selectedLesson = typingLessons.find(
      (lesson) => lesson.id === selectedLessonId,
    );
    setCurrentLesson(selectedLesson);
    setShowLessonModal(false);
    resetGame();
  };

  const handleInputChange = (e) => {
    if (!isTyping || timeLeft <= 0) return;

    const newInput = e.target.value;
    setUserInput(newInput);

    let correctCount = 0;
    for (let i = 0; i < newInput.length; i++) {
      if (
        i < currentLesson.content.length &&
        newInput[i] === currentLesson.content[i]
      ) {
        correctCount++;
      }
    }

    const totalTyped = newInput.length;
    const accuracy = totalTyped > 0 ? (correctCount / totalTyped) * 100 : 0;
    const progress = (correctCount / currentLesson.content.length) * 100;
    const currentProgress = Math.min(progress, 100);
    const tempScore = calculateScore(accuracy, currentProgress);

    setStats({
      correct: correctCount,
      total: totalTyped,
      accuracy: Math.round(accuracy),
      score: tempScore,
    });

    setTreeProgress(currentProgress);
  };

  useEffect(() => {
    if (!gameStarted) {
      setTimeLeft(timeLimit);
    }
  }, [timeLimit, gameStarted]);

  return {
    currentLesson,
    timeLimit,
    timeLeft,
    isTyping,
    userInput,
    stats,
    treeProgress,
    gameStarted,
    showLessonModal,
    gameFinished,
    selectedLessonId,
    timeUsed,
    inputRef,
    setCurrentLesson,
    setTimeLimit,
    setShowLessonModal,
    setGameFinished,
    setSelectedLessonId,
    startGame,
    stopGame,
    resetGame,
    selectLessonAndStart,
    handleInputChange,
    endGame,
  };
};
