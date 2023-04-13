import React, { useState } from "react";
import "./Questionnaire.css";

function Questionnaire() {
  // Définir les questions et les réponses possibles
  const questions = [
    {
      id: 1,
      text: "Quelle occasion ?",
      options: ["Entre famille", "Entre amis", "Date", "Solo"],
    },
    {
      id: 2,
      text: "Quel genre de film ?",
      options: ["Action", "Comédie", "Horreur", "Romance"],
    },
    {
      id: 3,
      text: "Date de publication",
      options: ["-3 ans", "-5 ans", "-10 ans", "-20 ans", "+20 ans"],
    },
  ];

  // Définir l'état local pour l'index de la question actuelle et la réponse de l'utilisateur
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Gérer le changement de réponse de l'utilisateur
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  // Gérer le clic sur le bouton pour passer à la question suivante
  const handleNextClick = () => {
    if (selectedOption !== null && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  // Obtenir la question et les options pour l'index de la question actuelle
  const { text, options } = questions[currentQuestion];

  return (
    <div className="questionaire">
      <h2 className="Question">{text}</h2>
      <ul>
        {options.map((option) => (
          <li key={option}>
            <input
              type="radio"
              id={option}
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
            />
            <label htmlFor={option}>{option}</label>
          </li>
        ))}
      </ul>
      {currentQuestion === questions.length - 1 ? (
        <button type="button" className="button" onClick={handleNextClick}>
          Valider
        </button>
      ) : (
        <button type="button" className="button" onClick={handleNextClick}>
          Question suivante
        </button>
      )}
    </div>
  );
}

export default Questionnaire;
