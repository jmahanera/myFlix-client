import React, { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../loginView/login-view";
import { SignupView } from "../signupView/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // State variables for signup form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthday] = useState("");

  const handleSubmit = (event) => {
  event.preventDefault();
  
  const signupData = {
    username: username,
    password: password,
    email: email,
    birthDate: birthDate
  };

  fetch("https://primemovies-39075872fbeb.herokuapp.com/movies", {
    method: "POST",
    body: JSON.stringify(signupData), 
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => {
    if (response.ok) {
      alert("Signup successful");
      window.location.reload();
    } else {
      alert("Signup failed");
    }
  })
  .catch((error) => {
    console.error("Error signing up:", error);
  });
};

  useEffect(() => {
    if (token) {
      fetch("https://primemovies-39075872fbeb.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((movies) => {
          setMovies(movies);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, [token]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
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
  );
};
