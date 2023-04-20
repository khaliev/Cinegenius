import React, { useState, useEffect } from "react";
import "./Movie.css";

function Movie() {
  const [randomMovie, setRandomMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const pagesToFetch = 100;
      const requests = Array.from({ length: pagesToFetch }, (_, index) =>
        fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=4376a0d52370c8fe44da849d510c9a86&language=fr-FR&page=${
            index + 1
          }`
        ).then((response) => response.json())
      );

      const results = await Promise.all(requests);
      const allResults = results.flatMap((result) => result.results);
      const randomIndex = Math.floor(Math.random() * allResults.length);
      setRandomMovie(allResults[randomIndex]);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (randomMovie) {
      fetch(
        `https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?api_key=4376a0d52370c8fe44da849d510c9a86&language=fr-FR`
      )
        .then((response) => response.json())
        .then((data) => {
          const youtubeTrailer = data.results.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
          );
          if (youtubeTrailer) {
            setTrailer(youtubeTrailer.key);
          }
        });
    }
  }, [randomMovie]);

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
