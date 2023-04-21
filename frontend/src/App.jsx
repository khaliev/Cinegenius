import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import Movie from "./components/Movie";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/movie" element={<Movie />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
