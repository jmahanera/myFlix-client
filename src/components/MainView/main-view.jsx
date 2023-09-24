import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  

  useEffect(() => {
    fetch("https://primemovies-39075872fbeb.herokuapp.com/api/movies/")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            image: movie.image,
            director: movie.director,
            genre: movie.genre,           
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






