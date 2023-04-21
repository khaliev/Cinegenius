import React, { useState, useEffect } from "react";
import "./Movie.css";

function Movie() {
  const [randomMovie, setRandomMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const pagesToFetch = 100;
      const randomPageIndex = 1 + Math.floor(Math.random() * pagesToFetch);

      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&language=fr-FR&page=${randomPageIndex}`
      )
        .then((response) => response.json())
        .then((page) => {
          const randomMovieIndex = Math.floor(
            Math.random() * page.results.length
          );
          const movie = page.results[randomMovieIndex];

          setRandomMovie(movie);

          fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${
              import.meta.env.VITE_TMDB_API_KEY
            }&language=fr-FR`
          )
            .then((response) => response.json())
            .then((data) => {
              const youtubeTrailer = data.results.find(
                (video) => video.site === "YouTube" && video.type === "Trailer"
              );
              if (youtubeTrailer) {
                setTrailer(youtubeTrailer.key);
              } else {
                setTrailer(null);
              }
            });
        });
    };

    fetchMovies();
  }, []);

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
