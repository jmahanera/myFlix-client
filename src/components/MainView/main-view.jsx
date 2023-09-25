import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
  fetch("https://primemovies-39075872fbeb.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((movie) => {
        return {
          image: movie.image,
          title: movie.title,
          description: movie.description,
          genre: movie.genre,
          director: movie.director, 
          actor: movie.actors.length > 0 ? movie.actors[0] : null,
        };
      });

      setMovies(moviesFromApi);
    });
}, []);


  const [selectedMovie, setSelectedMovie] = useState(null);


  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The Movie list is empty!</div>;
  }

   return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => setSelectedMovie(movie)} />
      ))}
    </div>
  );
};

export default MainView;






