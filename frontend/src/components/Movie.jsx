import React, { useState, useEffect } from "react";
import "./Movie.css";
import { useLocation } from "react-router-dom";

function Movie() {
  const [randomMovie, setRandomMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const location = useLocation();
  const { quizResponses } = location.state;
  const getRuntimeFilter = (runtimeId) => {
    // runtime range generator
    switch (runtimeId) {
      case 10:
        return [0, 90];
      case 11:
        return [90, 120];
      case 12:
        return [120, 180];
      case 13:
        return [180, Infinity];
      default:
        return [0, Infinity];
    }
  };
  const getReleaseDateRange = (releaseDate) => {
    const currentYear = new Date().getFullYear();
    let startYear;
    let endYear;
    switch (releaseDate) {
      case "-3 ans":
        startYear = currentYear - 3;
        endYear = currentYear;
        break;
      case "-5 ans":
        startYear = currentYear - 5;
        endYear = currentYear;
        break;
      case "-10 ans":
        startYear = currentYear - 10;
        endYear = currentYear;
        break;
      case "-20 ans":
        startYear = currentYear - 20;
        endYear = currentYear;
        break;
      case "+20 ans":
        startYear = 1900;
        endYear = currentYear - 20;
        break;
      default:
        startYear = 1900;
        endYear = currentYear;
        break;
    }
    return `${startYear}-01-01,${endYear}-12-31`;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const runtimeRange = getRuntimeFilter(quizResponses.runtime);
      const releaseDateRange = getReleaseDateRange(quizResponses.releaseDate);
      const pagesToFetch = 50;
      const randomPageIndex = 1 + Math.floor(Math.random() * pagesToFetch);

      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=fr-FR&sort_by=popularity.desc&with_genres=${
        quizResponses.genre
      }&primary_release_date.gte=${
        releaseDateRange.split(",")[0]
      }&primary_release_date.lte=${
        releaseDateRange.split(",")[1]
      }&with_runtime.gte=${runtimeRange[0]}&with_runtime.lte=${
        runtimeRange[1]
      }&page=${randomPageIndex}`;

      // then
      const response = await fetch(url);
      const page = await response.json();

      const filteredMovies = page.results.filter(
        (movie) =>
          movie.genre_ids.includes(quizResponses.genre) &&
          movie.genre_ids.length <= 3
      );

      const randomMovieIndex = Math.floor(
        Math.random() * filteredMovies.length
      );
      const movie = filteredMovies[randomMovieIndex];
      setRandomMovie(movie);

      const trailerResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&language=fr-FR`
      );
      const trailerData = await trailerResponse.json();

      const youtubeTrailer = trailerData.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      if (youtubeTrailer) {
        setTrailer(youtubeTrailer.key);
      } else {
        setTrailer(null);
      }
    };
    fetchMovies();
  }, [quizResponses]);

  function refreshPage() {
    window.location.href = "/movie";
  }

  return (
    <div className="main">
      {randomMovie && (
        <div className="text">
          <h2>{randomMovie.title}</h2>
          <div className="n">
            <img
              className="img"
              src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
              alt={randomMovie.title}
            />
            <p>{randomMovie.overview}</p>
          </div>
          <button type="button" onClick={refreshPage}>
            {" "}
            <span>Autre suggestion</span>{" "}
          </button>
          {trailer && (
            <div>
              <h3>Trailer:</h3>
              <iframe
                src={`https://www.youtube.com/embed/${trailer}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Movie;
