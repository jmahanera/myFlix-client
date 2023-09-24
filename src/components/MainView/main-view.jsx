import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://primemovies-39075872fbeb.herokuapp.com/42c4f879537430a5/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }
        return response.json();
      })
      .then((data) => {
        // Assuming data is an object with movie information
        const movieFromApi = {
          id: data.id,
          title: data.Title,
          image: data.Poster,
          director: data.Director
        };
        setMovies([movieFromApi]);
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
