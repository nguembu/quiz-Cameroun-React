import { useState, useEffect, useRef, useCallback } from "react";
import { questionsByLevel } from "./data/questionsByLevel";
import QuestionCard from "./components/QuestionCard";

const TIMER_DURATION = 15;
const PASS_SCORE = 12;
const LEVELS = ["easy", "medium", "hard"];

function App() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [questions, setQuestions] = useState([]);

  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);
  const timerRef = useRef(null);

  const level = LEVELS[levelIndex];
  const currentQuestion = questions.length > 0 ? questions[currentIndex] : null;

  // Charger les questions du niveau à chaque changement de niveau
  useEffect(() => {
    setQuestions(questionsByLevel[level] || []);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setShowSummary(false);
    setShowTransition(false);
  }, [level]);

  const handleAnswer = useCallback(
    (selected) => {
      if (timerRef.current) clearInterval(timerRef.current);

      if (currentQuestion && selected === currentQuestion.answer) {
        setScore((prev) => prev + 1);
        correctSoundRef.current?.play();
      } else {
        wrongSoundRef.current?.play();
      }

      const nextIndex = currentIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
      } else {
        setIsFinished(true);
      }
    },
    [currentIndex, currentQuestion, questions.length]
  );

  // Timer et fin automatique de question
  useEffect(() => {
    if (!currentQuestion) return;

    setTimeLeft(TIMER_DURATION);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentIndex, handleAnswer, currentQuestion]);

  const handleRestart = () => {
    if (score >= PASS_SCORE && levelIndex < LEVELS.length - 1) {
      setShowTransition(true);
      setTimeout(() => {
        setLevelIndex((prev) => prev + 1);
        setShowTransition(false);
      }, 3000);
    } else if (levelIndex === LEVELS.length - 1 && score >= PASS_SCORE) {
      setShowSummary(true);
    } else {
      // Recommence depuis le début
      setLevelIndex(0);
    }
  };

  return (
    <div className="app">
      <audio ref={correctSoundRef} src="/sounds/correct.mp3" preload="auto" />
      <audio ref={wrongSoundRef} src="/sounds/wrong.mp3" preload="auto" />

      <div className="quiz-container">
        <h1>🧠 Quiz Culture Générale</h1>
        <h2>Niveau : {level.toUpperCase()}</h2>

        {showSummary ? (
          <div className="final-summary fade-in">
            <h2>🏆 Quiz Terminé</h2>
            <p>Bravo, tu as complété tous les niveaux !</p>
            <button onClick={() => window.location.reload()}>Rejouer 🔁</button>
          </div>
        ) : showTransition ? (
          <div className="transition-screen fade-in">
            <h2>🚀 Bien joué !</h2>
            <p>Prochain niveau dans 3 secondes...</p>
          </div>
        ) : isFinished && currentQuestion ? (
          <div className="result fade-in">
            <h2>🎉 Résultat</h2>
            <p>
              Score : <strong>{score}</strong> / {questions.length}
            </p>
            <button onClick={handleRestart} className="restart-btn">
              {score >= PASS_SCORE && levelIndex < LEVELS.length - 1
                ? "Niveau Suivant 🔥"
                : "Recommencer 🔁"}
            </button>
          </div>
        ) : currentQuestion ? (
          <>
            <div className={`timer ${timeLeft <= 5 ? "urgent" : ""}`}>
              ⏳ Temps restant : {timeLeft}s
            </div>
            <QuestionCard questionData={currentQuestion} onAnswer={handleAnswer} />
          </>
        ) : (
          <p>Chargement des questions...</p>
        )}
      </div>
      

      <style>{`
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
        }

        .app {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 100%;
          min-height: 100vh;
          padding: 1rem;
        }

        .quiz-container {
          background-color: #fff;
          padding: 1rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          width: 90%;
          margin: auto;
          text-align: center;
        }


        .timer {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #4f46e5;
          transition: color 0.3s ease;
        }

        .timer.urgent {
          color: #ef4444;
        }

        .restart-btn {
          margin-top: 20px;
          padding: 12px 24px;
          font-size: 16px;
          border-radius: 8px;
          border: none;
          background-color: #4f46e5;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .restart-btn:hover {
          background-color: #3730a3;
        }

        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }

        .transition-screen {
          animation: zoomIn 0.6s ease;
          color: #10b981;
        }

        @keyframes zoomIn {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .final-summary {
          color: #2563eb;
        }
      `}</style>
    </div>
  );
}

export default App;
