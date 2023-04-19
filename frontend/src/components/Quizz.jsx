import React, { useState } from "react";
import "./Quizz.css";

function Quizz() {
  const [fetchedData, setFetchedData] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  const fetchOneTime = () => {
    fetch("http://localhost:5001/questions")
      .then((response) => response.json())
      .then((data) => {
        setFetchedData(data);
      });
  };
  const currentQuestion = fetchedData.find(
    (question) => question.id === currentQuestionId
  );
  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      setCurrentQuestionId(currentQuestionId + 1);
      setSelectedOption(null);
    }
  };

  return (
    <div className="Quizz">
      <button type="button" onClick={fetchOneTime}>
        click me
      </button>
      {currentQuestion != null && (
        <>
          <p>{currentQuestion.name}</p>
          {currentQuestion.options.map((option) => (
            <div key={option.id}>
              <input
                type="radio"
                id={`${option.id}`}
                name={`${currentQuestion.id}`}
                value={option.value}
                onChange={() => setSelectedOption(option.value)}
              />
              <label htmlFor={`${option.id}`}>{option.value}</label>
            </div>
          ))}
          <button type="button" onClick={handleNextQuestion}>
            Valider
          </button>
        </>
      )}
    </div>
  );
}
export default Quizz;
