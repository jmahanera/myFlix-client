import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import MovieCard from "../MovieCard/movie-card";

const ProfileView = ({ user, token, setUser }) => {
  // Modify the birthDate to remove the time part
  if (user.birthDate) {
    const dateParts = user.birthDate.split('T');
    user.birthDate = dateParts[0];
  }
  const [username] = useState(user.username || "");
  const [firstName] = useState(user.firstName || "");
  const [lastName] = useState(user.lastName || "");
  const [name, setName] = useState(user.name || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email || "");
  const [birthDate, setBirthdate] = useState(user.birthDate || "");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const [selectedFavoriteMovies, setSelectedFavoriteMovies] = useState([]);

  // Function to handle selecting and deselecting favorite movies
  const handleSelectFavorite = (movieId) => {
    const isFavorite = selectedFavoriteMovies.includes(movieId);
    if (isFavorite) {
      // Deselect the movie
      setSelectedFavoriteMovies(selectedFavoriteMovies.filter(id => id !== movieId));
    } else {
      // Select the movie
      setSelectedFavoriteMovies([...selectedFavoriteMovies, movieId]);
    }
  };


 const fetchUserFavoriteMovies = () => {
  fetch(`https://primemovies-39075872fbeb.herokuapp.com/users/${username}/favoriteMovies`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error fetching favorite movies: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    setFavoriteMovies(data);
  })
  .catch((error) => {
    console.error("Fetch Error:", error);
  });
};


  useEffect(() => {
  fetchUserFavoriteMovies();
}, [user.username, token]);




  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      username,
      birthDate,
      name,
      password,
      email,
      birthDate,
      FavoriteMovies: favoriteMovies.map((movie) => movie.id),
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
  const shouldDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

  if (shouldDelete) {
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
          alert("Account deleted. You will be logged out.");
          window.location.replace("/login");
        } else {
          alert("Could not delete account");
          console.log("Result:", response);
        }
      });
  }
};


  return (
    <Container>
     <Row className="justify-content-md-center mx-3 my-4">
        <h2 className="profile-title">
          Profile Name: {firstName && lastName ? `${firstName} ${lastName}` : username}
        </h2>
        <h2 className="profile-title">Birthday: {user.birthDate}</h2>
      </Row>

<Row className="justify-content-md-center mx-3 my-4">
        {favoriteMovies && favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <Col key={movie._id} className="m-3">
              <MovieCard
                movie={movie}
                user={user}
                token={token}
                toggleFavorite={fetchUserFavoriteMovies}
                onSelectFavorite={handleSelectFavorite}
                isSelected={selectedFavoriteMovies.includes(movie.id)}
              />
            </Col>
  ))
) : (
          <p>......................................................................................................................................................</p>
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
