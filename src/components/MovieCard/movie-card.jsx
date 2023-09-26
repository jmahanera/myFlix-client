import React, { useState } from "react";
import PropTypes from "prop-types";

// The BookCard function component 
export const MovieCard = ({ movie, onMovieClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    onMovieClick(movie.imageUrl);
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <p>{movie.title}</p>
      <p>{movie.image}</p>
      {isClicked && (
        <div>
          <p>imageUrl: {movie.image}</p>
          <p>Genre: {movie.genre}</p>
          {movie.actors && (
            <p>Actors: {movie.actors.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string,
    actors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};