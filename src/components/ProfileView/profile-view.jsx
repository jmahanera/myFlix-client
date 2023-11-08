import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import MovieCard from "../MovieCard/movie-card"; // Make sure you have this component.

const ProfileView = ({ user, token, setUser, movies }) => {

  const [name, setName] = useState(user.name || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email || "");
  const [birthDate, setBirthDate] = useState(user.birthDate || "");


  const favMov = user.FavoriteMovies
    ? movies.filter((movie) => user.FavoriteMovies.includes(movie.id))
    : [];


  const handleUpdate = (event) => {
  event.preventDefault();

  const data = {
    name: name,
    password: password,
    email: email,
    birthdate: birthDate,
    };
    
    

  fetch(`https://primemovies-39075872fbeb.herokuapp.com/users/${user.username}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage); // Fix the 'throw' statement here
      }
    })
    .then((updatedUser) => {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("Profile updated!");
    })
    .catch((error) => {
      alert(`Update failed: ${error}`);
    });
};

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (shouldDelete) {
      fetch(`https://primemovies-39075872fbeb.herokuapp.com/users/${user.username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
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
          Profile Name: {name || user.username}
        </h2>
        <h2 className="profile-title">Birthday: {birthDate}</h2>
        <h2 className="profile-title">Email: {user.email}</h2>
        <h2 className="profile-title">Favorite movies: </h2>
        {favMov.map((movie) => {
     return (
      
      <Col
        key={movie.id}
       className="m-3"
      >
        <MovieCard
  movie={movie}
  user={user}  // Pass user and token as props
  token={token}
  setUser={setUser}
/>

      </Col>
    );
  })}
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
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="update" type="submit" onClick={handleUpdate}>
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
