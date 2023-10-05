import React from "react";
import PropTypes from "prop-types";  // Import PropTypes from the correct location

// MovieCard Component
export const MovieCard = ({ movie, onMovieClick }) => {
  // Destructure the 'movie' object to get the 'title' property
  const { title } = movie;

  return (
    <div onClick={() => onMovieClick()}>
      {/* Display the movie title */}
      <h2>Title: {title}</h2>
    </div>
  );
};

// Define the prop types for MovieCard component
MovieCard.propTypes = {
  // movie prop should be an object with specific properties
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,  // Title should be a required string
    genre: PropTypes.shape({
      id: PropTypes.string.isRequired,  // Genre ID should be a required string
      name: PropTypes.string.isRequired,  // Genre name should be a required string
    }).isRequired,  // Genre should be a required object
  }).isRequired,  // Movie prop should be a required object

  // onMovieClick prop should be a function and is required
  onMovieClick: PropTypes.func.isRequired,
};
