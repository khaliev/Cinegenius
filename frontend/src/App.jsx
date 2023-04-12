import { useState } from "react";
import Home from "./pages/Home";

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

  return (
    <div className="App">
      <Home />
      <p>coucou</p>
      <button type="button" onClick={fetchOneTime}>
        click me
      </button>
      {fetchedData.map((questions) => (
        <p key={questions.id}>{questions.name}</p>
      ))}
    </div>
  );
}

export default App;
