// ProfileView.js
import React from 'react';

const ProfileView = ({ user, favoriteMovies }) => {
  return (
    <div>
      <h2>Profile Information</h2>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Birthday:</strong> {user.birthday}
      </div>

      <h2>Favorite Movies</h2>
      <ul>
        {favoriteMovies.map((movie) => (
          <li key={movie.id}>
            {movie.title} - {movie.genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileView;
