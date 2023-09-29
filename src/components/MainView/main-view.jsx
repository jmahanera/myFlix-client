import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../loginView/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://primemovies-39075872fbeb.herokuapp.com/movies",{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const moviesFromApi = data.map((movie) => {
        return {
          title: movie.title,
          description: movie.description,
          imageUrl: movie.image,
          genre: movie.genre,
          director: movie.director,
          actor: movie.actors.length > 0 ? movie.actors[0] : null,
        }
         .catch((error) => console.error("Error fetching movies:", error));
      });
      
      setMovies(moviesFromApi);
    });
    
  }, []);
  
  const [token, setToken] = useState(null);
  
  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  if (!user) {
    return <LoginView onLoggedIn={(user) => setUser(user)} />;
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
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};








