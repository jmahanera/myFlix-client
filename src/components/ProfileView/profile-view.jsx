import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const ProfileView = ({ user, favoriteMovies, onDeleteAccount, onRemoveFavoriteMovie }) => {
  const [newProfileData, setNewProfileData] = useState({
    name: '',
    birthdate: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    setIsUpdating(true);

    const data = {
      name: newProfileData.name,
      birthdate: newProfileData.birthdate,
    };

    // Assume you have the correct API endpoint to update the profile
    fetch(`https://primemovies-39075872fbeb.herokuapp.com/users`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setIsUpdating(false);
        if (response.ok) {
          alert('Profile updated successfully!');
        } else {
          response.json().then((errorData) => {
            alert(`Failed to update profile: ${errorData.message}`);
          });
        }
      })
      .catch((error) => {
        setIsUpdating(false);
        console.error('Error updating profile:', error);
        alert('An error occurred while updating the profile.');
        console.log(typeof yourOnRemoveFavoriteMovieFunction);

      });
  };

  const handleRemoveFavoriteMovie = (movieId) => {
  onRemoveFavoriteMovie(movieId);
};


  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Birthday:</strong> {user.birthdate}
      </div>

      <Button variant="danger" onClick={onDeleteAccount}>
        Delete Account
      </Button>

      <h2>Favorite Movies</h2>
      <ul>
        {favoriteMovies.map((movie) => (
          <li key={movie.id}>
            Title: {movie.title}, Genre: {movie.genre ? movie.genre.name : 'Unknown genre'}
           <Button variant="link" onClick={() => handleRemoveFavoriteMovie(movie.id)}>
  Remove
</Button>

          </li>
        ))}
      </ul>

      {/* Update Profile Form */}
      <Form onSubmit={handleUpdateProfile}>
        <Form.Group controlId="name">
          <Form.Label>Update Name:</Form.Label>
          <Form.Control
            type="text"
            value={newProfileData.name}
            onChange={(e) => setNewProfileData((prevState) => ({ ...prevState, name: e.target.value }))}
            required
          />
        </Form.Group>
        <Form.Group controlId="birthday">
          <Form.Label>Update Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={newProfileData.birthdate}
            onChange={(e) =>
              setNewProfileData((prevState) => ({ ...prevState, birthdate: e.target.value }))
            }
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Profile'}
        </Button>
      </Form>
    </div>
  );
};

export default ProfileView;
