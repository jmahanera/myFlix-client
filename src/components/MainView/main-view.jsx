import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch movies and set them to the state
    fetch("https://primemovies-39075872fbeb.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            image: movie.image,
            title: movie.title,
            description: movie.description,
            genre: movie.genre,
            actors: movie.actors,
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.image} movie={movie} onMovieClick={() => setSelectedMovie(movie)} />
      ))}

      {selectedMovie && (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};







