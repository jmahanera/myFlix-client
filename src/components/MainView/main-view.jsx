import React, { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../loginView/login-view";
import { SignupView } from "../signupView/sign-up-view";

const handleLogout = () => {
      setUser(null);
      setToken(null);
  };
  
  // Define handleMovieClick outside MainView
const handleMovieClick = (movie) => {
  setSelectedMovie(movie);
};

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

   const handleSubmit = (event) => {
    event.preventDefault();

  
    useEffect(() => {
   if (!token) return;

   fetch("https://primemovies-39075872fbeb.herokuapp.com/movies", {
     headers: { Authorization: `Bearer ${token}` },
   })
     .then((response) => response.json())
     .then((movies) => {
       setMovies(movies);

     });
 }, [token])
      .catch((error) => console.error("Error fetching movies:", error));
 

    

    if (!user) {
      return (
        <>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
          or
          <SignupView handleSubmit={handleSubmit} /> {/* Added handleSubmit prop */}
        </>
      );
    }

    if (movies.length === 0) {
      return <div>The list is empty!</div>;
    }

    return (
      <div>
        <button onClick={handleLogout}>Logout</button> {/* Use handleLogout here */}
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={() => handleMovieClick(movie)}
          />
        ))}

        {/* Display MovieView when a movie is selected */}
        {selectedMovie && <MovieView movie={selectedMovie} />}
      </div>
    )
  };
};
