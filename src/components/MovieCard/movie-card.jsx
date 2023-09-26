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
      {isClicked && (
        <div>
          <p>title: {movie.title}</p>
          <p>description: {movie.description}</p>
          <p>img src: {movie.imageUrl}</p>
          <p>Genre: {movie.genre}</p>
          <p>director: {movie.director}</p>
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