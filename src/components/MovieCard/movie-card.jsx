import React, { useState } from "react";
import PropTypes from "prop-types";

// The BookCard function component 
// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  const [count, setCount] = useState(null);

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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};