import React, { useState, useEffect } from "react";
import "./Movie.css";
import { useLocation } from "react-router-dom";

function Movie() {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
      const pagesToFetch = 100;

      const fetchPage = async (pageNumber) => {
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
        }&page=${pageNumber}`;

        const response = await fetch(url);
        const data = await response.json();
        return data;
      };

      const fetchedPages = await Promise.all(
        Array.from({ length: pagesToFetch }, (_, i) => fetchPage(i + 1))
      );

      const allMovies = fetchedPages.flatMap((page) => page.results);

      const sortedMovies = allMovies.sort(
        (a, b) => a.genre_ids.length - b.genre_ids.length
      );
      const filteredMoviesG = sortedMovies.filter((movie) => {
        const mainGenre = movie.genre_ids[0];
        return mainGenre === quizResponses.genre;
      });

      setFilteredMovies(filteredMoviesG);
      setIsLoading(false);
    };

    fetchMovies();
  }, [quizResponses]);

  function refreshPage() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * filteredMovies.length);
    } while (newIndex === index && filteredMovies.length > 1);
    setIndex(newIndex);

    const movie = filteredMovies[newIndex];

    (async () => {
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
    })();
  }

  return (
    <div>
      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : (
        filteredMovies &&
        filteredMovies[index] && (
          <div key={filteredMovies[index].id} className="text">
            <h2>{filteredMovies[index].title}</h2>
            <img
              className="img"
              src={`https://image.tmdb.org/t/p/w500${filteredMovies[index].poster_path}`}
              alt={filteredMovies[index].title}
            />
            <p>{filteredMovies[index].overview}</p>
            <button type="button" onClick={refreshPage}>
              <span>autre suggestion</span>
            </button>
            {trailer && (
              <div>
                <h3>Trailer:</h3>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
export default Movie;
