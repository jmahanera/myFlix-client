import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import MovieCard from "../MovieCard/movie-card";

const ProfileView = ({ user, token, setUser, movies }) => {
  const [userInfo, setUserInfo] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const storedToken = localStorage.getItem("token");
  const [storedUser, setStoredUser] = useState(user || {});
  const [name, setName] = useState(storedUser.name || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(storedUser.email || "");
  const [birthDate, setBirthDate] = useState(formatDate(storedUser.birthDate) || "");

  // Function to format date to "yyyy-MM-dd"
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-CA", options);
  }

  // Fetch user's favorite movies
  useEffect(() => {
    if (!storedToken || !user || !user.username) {
      return;
    }

    const fetchFavoriteMovies = async () => {
      try {
        const url = `https://primemovies-39075872fbeb.herokuapp.com/users/${user.username}/movies`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        if (!response.ok) {
          console.error(`Server error: ${response.status} ${response.statusText}`);
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setFavoriteMovies(data);
      } catch (error) {
        console.error("Error fetching favorite movies:", error.message);
      }
    };

    fetchFavoriteMovies();
  }, [storedToken, user]);

  const updateUser = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      password: password,
      email: email,
      birthDate: birthDate,
    };

    fetch(`https://primemovies-39075872fbeb.herokuapp.com/users/${user.username}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      method: "PUT",
    })
      .then((response) => {
        if (response.ok) {
          alert("User Info Successfully Updated! Please Logout to See the Updated Information Reflected in Your Account");
        } else {
          alert("User Update Failed");
        }
      });
  };

  const deregister = (e) => {
    e.preventDefault();
    let response = window.confirm(
      "Are you sure, you want to delete this account. This action is not reversible!"
    );

    if (response) {
      fetch(`https://primemovies-39075872fbeb.herokuapp.com/users/${user.username}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${storedToken}` },
      });
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <Form onSubmit={updateUser}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={storedUser.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </Form.Group>

          <Button className="update-user--button" variant="success" type="submit">
            Update User
          </Button>
        </Form>

        <Button className="delete-user--button" variant="danger" onClick={deregister}>
          Delete User
        </Button>

        <h3>Favorite Movies</h3>
        <Row>
          {favoriteMovies.map((movie) => (
            <Col key={movie._id} md={4} className="mb-4">
              <MovieCard movie={movie} user={user} token={token} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    favoriteMovies: PropTypes.array,
  }),
  token: PropTypes.string,
  setUser: PropTypes.func,
  movies: PropTypes.array,
};

export default ProfileView;
