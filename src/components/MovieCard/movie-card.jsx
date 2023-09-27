import React, { useState } from "react";
import PropTypes from "prop-types";

// The BookCard function component 
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
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.any.isRequired
    })
  }).isRequired,
  onBookClick: PropTypes.func.isRequired
};