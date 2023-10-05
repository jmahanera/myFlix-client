import React, { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../loginView/login-view";
import { SignupView } from "../signupView/sign-up-view";


export const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch("https://primemovies-39075872fbeb.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log("movies from Api", movies)
        setMovies(movies);
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const onMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle submit logic
  };

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
        <SignupView handleSubmit={handleSubmit} />
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  // MainView Component
  // ...
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={() => onMovieClick(movie)}
        />
      ))}
      {selectedMovie && (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
// ...

