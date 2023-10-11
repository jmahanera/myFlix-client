import { NavigationBar } from "../Navigation-bar/navigation-bar"; // Update the import path
import React, { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../loginView/login-view";
import { SignupView } from "../signupView/sign-up-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedToken = localStorage.getItem("token"); // Retrieve the token from localStorage
  const storedUser = localStorage.getItem("user"); // Retrieve the user from localStorage
  const [token, setToken] = useState(storedToken || null); // Initialize token state with stored token
  const [user, setUser] = useState(JSON.parse(storedUser) || null); // Initialize user state with stored user
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) return; // If there is no token, don't bother

    fetch("https://primemovies-39075872fbeb.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }, // Send the token in the Authorization header
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies?.map((movie) => ({
          id: movie._id, // The ID in the API is called "_id"
          title: movie.title,
          imageUrl: movie.imageUrl, // fixed typo
          description: movie.description,
        }));
        setMovies(moviesFromApi);
      });
  }, [setMovies]); // Don't add movies to dependencies, as it would cause an infinite loop

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={() => {
        setUser(null);
        setToken(null); // removes token from localStorage on logout
        localStorage.clear(); // clears localStorage on logout
      }} />{" "}
      {/* Step 5 */}
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => { // Added token as an argument to onLoggedIn
                        setUser(user); // Set the user state to the user object received
                        setToken(token); //  Set the token state to the token received
                        localStorage.setItem("token", token); // Store the token in localStorage on login
                        localStorage.setItem("user", JSON.stringify(user)); // Store the user in localStorage on login
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The movie list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
