import React from "react";
import PropTypes from "prop-types";  // Import PropTypes from the correct location

// MovieCard Component
export const MovieCard = ({ movie, onMovieClick }) => {
  const { title } = movie;

  return (
    <div onClick={() => onMovieClick()}>
      <h2>Title: {title}</h2>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
