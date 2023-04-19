/* eslint-disable import/no-named-as-default */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movie from "./components/Movie";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
