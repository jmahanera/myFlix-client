import React, { useState } from "react";
import PropTypes from "prop-types";

// The BookCard function component 
// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  const [count, setCount] = useState(O);

  return (
    <div
      onClick={() => {
        onMovieClick(movie);
        setCount(count + 1);
      }}
    >
      {movie.title}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired, // Add this line
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
