import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://primemovies-39075872fbeb.herokuapp.com/api/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }
        return response.json();  
      })
      .then((data) => {
  const moviesFromApi = data.map((movie) => ({
    id: movie.id,
    title: movie.Title,
    image: movie.Poster,
    director: movie.Director
  }));
  setMovies(moviesFromApi);
})
      .catch((error) => {
        console.error("Error fetching the movie:", error);
      });
  }, []);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
    </div>
  );
};
