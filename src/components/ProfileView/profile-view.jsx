import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card, CardGroup, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/movie-card";

const ProfileView = ({ user, token, movies, setUser }) => {
  const [username, setUsername] = useState(user.username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email || "");
  const [birthdate, setBirthdate] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState(user.favoriteMovies || []);

  const toggleFavorite = (movieId) => {
    if (favoriteMovies.includes(movieId)) {
      const updatedFavorites = favoriteMovies.filter((id) => id !== movieId);
      setFavoriteMovies(updatedFavorites);
    } else {
      setFavoriteMovies([...favoriteMovies, movieId]);
    }
  };

  let result = [];
  if (user.favoriteMovies) {
    result = movies.filter((m) => user.favoriteMovies.includes(m.id));
  }

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      username,
      password,
      email,
      birthdate,
      favoriteMovies,
    };

    fetch(`https://primemovies-39075872fbeb.herokuapp.com/users/${user.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.ok) {
          alert("update successful");
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data));
          window.location.reload();
        } else {
          const errorText = await response.text();
          console.log("Error response body:", errorText);
          alert("update failed");
        }
      })
      .catch((err) => console.log("error", err));
  };

  const deleteAccount = () => {
    fetch(`https://primemovies-39075872fbeb.herokuapp.com/users/${user.username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          localStorage.clear();
          alert("Your account has been deleted");
          window.location.replace("/login");
        } else {
          alert("Could not delete account");
        }
      });
  };

  return (
    <>
      <Container className="">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <CardGroup>
              <Card className="mb-5 border border-0 card-custom">
                <Card.Body>
                  <Card.Title>My Profile</Card.Title>
                  <Card.Text>
                    <strong>Name:</strong> {user.username}
                    <br />
                    <strong>Birthdate:</strong>{" "}
                    {user.birthDate
                      ? new Date(user.birthDate).toLocaleDateString()
                      : "N/A"}
                  </Card.Text>
                  <Card.Text>Want to Update some info?</Card.Text>
                  <Form onSubmit={handleUpdate}>
                    <Form.Group>
                      <Form.Label>
                        Username:
                        <Form.Control
                          type="text"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          placeholder={user.username}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Password:
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          placeholder="*******"
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Email:
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          placeholder={user.email}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Birthdate:
                        <Form.Control
                          type="date"
                          value={birthdate}
                          onChange={(e) => {
                            setBirthdate(e.target.value);
                          }}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleUpdate}
                      className="text-white mt-4"
                    >
                      update profile
                    </Button>
                  </Form>
                  <Link to="/login">
                    <Button
                      variant="danger"
                      type=""
                      onClick={deleteAccount}
                      className="text-white mt-3"
                    >
                      delete your account
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-md-center align-items-center">
          {favoriteMovies.map((movieId) => {
            const movie = movies.find((movie) => movie.id === movieId);
            if (movie) {
              return (
                <Col key={movie._id} className="mb-4 justify-content-center align-items-center d-flex">
                  <MovieCard
                    movie={movie}
                    token={token}
                    setUser={setUser}
                    user={user}
                    toggleFavorite={toggleFavorite}
                  />
                </Col>
              );
            }
            return null;
          })}
        </Row>
      </Container>
    </>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  movies: PropTypes.array,
  setUser: PropTypes.func,
};

export default ProfileView;
