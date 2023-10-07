import React, { useState, useEffect, useRef } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../loginView/login-view";
import { SignupView } from "../signupView/sign-up-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const movieViewRef = useRef(null);

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
        console.log("movies from Api", movies);
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

    const selectedMovieElement = document.getElementById(`movie-${movie.id}`);
    if (selectedMovieElement) {
      selectedMovieElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (movieViewRef.current) {
      movieViewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      {user ? (
        <div>
          <h1>Movies Hot List</h1>
          <h1>************************Jula's List***********************</h1>
          <div style={{ paddingBottom: "20px" }}>
            <button
              onClick={handleLogout}
              className="logout-button"
              style={{ cursor: "pointer" }}
            >
              Logout
            </button>
          </div>
          <Row>
            {movies.length === 0 ? (
              <div>API is not Rendering Response</div>
            ) : (
             movies.map((movie) => (
  <Col className="mb-5" key={movie.id} md={3}>
    <MovieCard
      movie={movie}
      onMovieClick={() => onMovieClick(movie)}
    />
  </Col>
              ))
            )}
          </Row>
          {selectedMovie && (
            <Row>
              <Col md={8} className="mx-auto">
                <MovieView
                  movie={selectedMovie}
                  onBackClick={() => setSelectedMovie(null)}
                  movieViewRef={movieViewRef}
                />
              </Col>
            </Row>
          )}
        </div>
      ) : (
        <Col md={5} className="login-signup-col">
          <h1>The Movie Database</h1>
          <h3>Login</h3>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <h3>Signup (New User)</h3>
          <SignupView handleSubmit={handleSubmit} />
        </Col>
      )}
    </Row>
  );
};


