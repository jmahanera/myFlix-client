import React, { useState, useEffect, useRef } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../loginView/login-view";
import { SignupView } from "../signupView/sign-up-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  // State for user information
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Refs for storing references to DOM elements
  const movieListRef = useRef(null);
  const movieViewRef = useRef(null);
  
  // Effect to run when the component mounts to retrieve stored user information
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  // Effect to fetch movies from the API when the token changes
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

  // Function to handle user logout
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  // Function to handle when a movie is clicked
  const onMovieClick = (movie) => {
    setSelectedMovie(movie);

    // Scroll to the selected movie title
    const selectedMovieElement = document.getElementById(`movie-${movie.id}`);
    if (selectedMovieElement) {
      selectedMovieElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Scroll to the top of the movie view
    if (movieViewRef.current) {
      movieViewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Function to handle form submission (currently empty)
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle submit logic
  };

 return (
    <Row className="justify-content-md-center">
      {user ? (
       <div>
         <h1>Movies Hot List</h1>
         <h1>************************Jula's List***********************</h1>
          <button onClick={handleLogout}>Logout</button>
          <Row>
            {movies.length === 0 ? (
              <div>API is not Rendering Response</div>
            ) : (
              movies.map((movie) => (
                <Col className="mb-5" key={movie.id} md={3}>
                  <MovieCard
                    key={movie.id}
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
        <Row>
          <Col md={5}>
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
        </Row>
      )}
    </Row>
  );
};