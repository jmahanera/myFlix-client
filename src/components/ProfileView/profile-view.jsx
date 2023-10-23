import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import MovieCard from "../MovieCard/movie-card";

const ProfileView = ({ user, token, setUser }) => {
  const [username, setUsername] = useState(user.username || "");
  const [name, setName] = useState(user.username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email || "");
  const [birthDate, setBirthdate] = useState(user.birthDate || "");
  const [FavoriteMovies, setFavoriteMovies] = useState([]);


  console.log("user.FavoriteMovies:", user.FavoriteMovies);
  // Fetch user's favorite movies when the component mounts
  useEffect(() => {
    if (user.FavoriteMovies && user.FavoriteMovies.length > 0) {
      const moviePromises = user.FavoriteMovies.map(async (movieId) => {
  try {
    const response = await fetch(`https://primemovies-39075872fbeb.herokuapp.com/movies/${movieId}`,);
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
});


      Promise.all(moviePromises).then((movies) => {
        // Filter out null values (failed requests)
        const filteredMovies = movies.filter((movie) => movie !== null);
        setFavoriteMovies(filteredMovies);
      });
    }
  }, [user.FavoriteMovies]);

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      username,
      birthDate,
      name,
      password,
      email,
      birthDate,
      FavoriteMovies: FavoriteMovies.map((movie) => movie.id),
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
          alert("Update successful");
          const updatedUser = await response.json();
          localStorage.setItem("user", JSON.stringify(updatedUser));
          window.location.reload();
        } else {
          const errorText = await response.text();
          console.log("Error response body:", errorText);
          alert("Update failed");
        }
      })
      .catch((err) => console.log("Error", err));
  };

  const handleDelete = () => {
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
          console.log("Result:", response);
        }
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mx-3 my-4">
        <h2 className="profile-title">Profile Name: {user.username}</h2>
        <h2 className="profile-title">Birthday: {user.birthDate}</h2>
      </Row>

      <Row className="justify-content-md-center mx-3 my-4">
        {FavoriteMovies && FavoriteMovies.length > 0 ? (
          FavoriteMovies.map((movie) => (
            <Col key={movie.id} className="m-3">
              <MovieCard movie={movie} user={user} token={token} />
            </Col>
          ))
        ) : (
          <p>No favorite movies selected.</p>
        )}
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="profile-title">Update info</h2>
          <Form className="my-profile" onSubmit={handleUpdate}>
            <Form.Group className="mb-2" controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBirthdate">
              <Form.Label>Birthdate:</Form.Label>
              <Form.Control
                type="date"
                value={birthDate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="update" type="submit">
              Update
            </Button>
            <Button className="delete" onClick={handleDelete}>
              Delete Account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  setUser: PropTypes.func,
};

export default ProfileView;
