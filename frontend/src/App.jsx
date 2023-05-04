import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import Movie from "./components/Movie";
import Footer from "./components/Footer";
import Caroussel from "./components/Caroussel";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Caroussel />
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
