import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { NavigationBar } from '../Navigation-bar/navigation-bar';
import { LoginView } from '../loginView/login-view';
import { SignupView } from '../signupView/sign-up-view';
import { MovieView } from '../MovieView/movie-view';
import { MovieCard } from '../MovieCard/movie-card';
import ProfileView from '../ProfileView/profile-view';
import '../../index.scss';

const rootContainer = document.getElementById('root');

const App = () => {
  return (
    <div>
      <MainView />
    </div>
  );
};



export const MainView = () => {
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const [token, setToken] = useState(storedToken || null);
  const [user, setUser] = useState(JSON.parse(storedUser) || null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch('https://primemovies-39075872fbeb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log('API Response:', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((movies) => {
        console.log('Movies from API:', movies);
        const moviesFromApi = movies?.map((movie) => ({
          id: movie._id,
          title: movie.title,
          imageUrl: movie.imageUrl,
          description: movie.description,
          genre: movie.genre,
          director: movie.director,
          actors: movie.actors,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => console.error('Error fetching movies:', error));
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
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
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify(user));
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
          <Route path="/movies/:movieId" element={<MovieView movies={movies} />} />
         <Route
        path="/profile"
        element={
          <>
            {user ? (
              <Col md={8}>
                <ProfileView
                  user={user}
                  token={token}  // Pass token as a prop
                  movies={movies}
                  setUser={setUser}
                />
              </Col>
            ) : (
              <Navigate to="/login" replace />
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

export default App;
