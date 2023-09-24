import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://primemovies-39075872fbeb.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            director: movie.director,
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);


  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The Movie list is empty!</div>;
  }

   return (
    <div>
      {movies.map((movie) => (
        <div key={movie._id} className="movie-card">
          <h3>{movie.title}</h3>
          <p>Director: {movie.director}</p>
          <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
          <button onClick={() => setSelectedMovie(movie)}>View Details</button>
        </div>
      ))}
    </div>
  );
};