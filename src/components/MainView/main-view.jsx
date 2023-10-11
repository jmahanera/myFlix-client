import { NavigationBar } from "../Navigation-bar/navigation-bar"; // Update the import path
import React, { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../loginView/login-view";
import { SignupView } from "../signupView/sign-up-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);

  const getToken = () => {
  // Logic to retrieve the token from a secure source, such as local storage
  return localStorage.getItem('token'); // Assuming you've stored the token in local storage
};

  
  useEffect(() => {
    fetch("https://primemovies-39075872fbeb.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data);
        const moviesFromApi = data.movies.map((movie) => ({
          id: movie.key,
          title: movie.title,
          image: movie.imageUrl,
          description: movie.description?.[0]
        }));
        setMovies(moviesFromApi);
      });
  }, []);

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={() => setUser(null)} /> {/* Step 5 */}
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
                    <LoginView onLoggedIn={(user) => setUser(user)} />
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
