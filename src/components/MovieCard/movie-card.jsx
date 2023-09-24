import React, { useState } from "react";
import PropTypes from "prop-types";

// The BookCard function component 
export const MovieCard = ({ movie, onMovieClick }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleMovieClick = () => {
    setShowDetails(!showDetails);
    onMovieClick(movie);
  };

  return (
    <div onClick={handleMovieClick}>
      <div>{movie.title}</div>
      {showDetails && (
        <div>
          <img src={movie.image} alt={movie.title} />
          <div>Director: {movie.director}</div>
          <div>Genre: {movie.genre}</div>
        </div>
      )}
    </div>
  );
};

// Here is where we define all the props constraints for the BookCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string,
    genre: PropTypes.shape({
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};