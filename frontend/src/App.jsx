import { useState } from "react";
import Header from "./components/Header";

import "./App.css";

function App() {
  const [fetchedData, setFetchedData] = useState([]);

  const fetchOneTime = () => {
    fetch("http://localhost:5001/questions")
      .then((response) => response.json())
      .then((data) => {
        setFetchedData(data);
      });
  };
  const currentQuestion = fetchedData.find((question) => question.id === 1);

  return (
    <div className="App">
      <Header />
      <button type="button" onClick={fetchOneTime}>
        click me
      </button>
      {currentQuestion != null && <p>{currentQuestion.name}</p>}
    </div>
  );
}

export default App;
