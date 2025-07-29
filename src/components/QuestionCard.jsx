import { useState, useEffect } from "react";

const QuestionCard = ({ questionData, onAnswer }) => {
  const { question, options, answer } = questionData;

  const [selected, setSelected] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  // Reset selected & disabled quand questionData change
  useEffect(() => {
    setSelected(null);
    setIsDisabled(false);
  }, [questionData]);

  const handleClick = (option) => {
    if (isDisabled) return;

    setSelected(option);
    setIsDisabled(true);

    setTimeout(() => {
      onAnswer(option);
    }, 1200);
  };

  const getButtonStyle = (option) => {
    if (!selected) {
      return {
        background:
          "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        color: "white",
        cursor: "pointer",
        boxShadow:
          "0 4px 15px rgba(99, 102, 241, 0.4)",
      };
    }

    if (option === selected) {
      if (option === answer) {
        return {
          background:
            "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          color: "white",
          cursor: "default",
          boxShadow:
            "0 4px 15px rgba(34, 197, 94, 0.6)",
          transform: "scale(1.05)",
          transition: "transform 0.3s ease",
        };
      } else {
        return {
          background:
            "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
          color: "white",
          cursor: "default",
          boxShadow:
            "0 4px 15px rgba(239, 68, 68, 0.6)",
          transform: "scale(1.05)",
          transition: "transform 0.3s ease",
        };
      }
    }

    return {
      background:
        "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
      color: "#6b7280",
      cursor: "default",
      boxShadow: "none",
    };
  };

  return (
    <div
      style={{
        border: "2px solid #4f46e5",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 4px 10px rgba(79, 70, 229, 0.3)",
        backgroundColor: "#eef2ff",
        animation: "slideIn 0.5s ease",
      }}
    >
      <h2 style={{ color: "#3730a3", marginBottom: "1rem" }}>{question}</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {options.map((opt, index) => (
          <li key={index} style={{ margin: "8px 0" }}>
            <button
              onClick={() => handleClick(opt)}
              disabled={isDisabled}
              style={{
                width: "100%",
                padding: "12px 18px",
                borderRadius: "12px",
                border: "none",
                fontWeight: "700",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                ...getButtonStyle(opt),
              }}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px);}
          to { opacity: 1; transform: translateX(0);}
        }
      `}</style>
    </div>
  );
};

export default QuestionCard;
