import React, { useState, useEffect } from "react";
import "./Movie.css";
import { useLocation } from "react-router-dom";

function Movie() {
  const [randomMovie, setRandomMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const location = useLocation();
  const { quizResponses } = location.state;
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
      const releaseDateRange = getReleaseDateRange(quizResponses.releaseDate);
      const pagesToFetch = 50;
      const randomPageIndex = 1 + Math.floor(Math.random() * pagesToFetch);
      const genreMapping = {
        Action: 28,
        Comédie: 35,
        Drame: 18,
        Horreur: 27,
        Romance: 10749,
        "Science-fiction": 878,
      };
      const genreId = genreMapping(quizResponses.genre);

      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=fr-FR&sort_by=popularity.desc&with_genres=${genreId}&primary_release_date.gte=${
        releaseDateRange.split(",")[0]
      }&primary_release_date.lte=${
        releaseDateRange.split(",")[1]
      }&page=${randomPageIndex}`;
      // then
      const response = await fetch(url);
      const page = await response.json();
      const randomMovieIndex = Math.floor(Math.random() * page.results.length);
      const movie = page.results[randomMovieIndex];
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

  return (
    <div>
      {randomMovie && (
        <div className="text">
          <h2>{randomMovie.title}</h2>
          <img
            className="img"
            src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
            alt={randomMovie.title}
          />
          <p>{randomMovie.overview}</p>
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
      )}
    </div>
  );
}
export default Movie;
