import React, { useState } from "react";
import PropTypes from "prop-types";

// The BookCard function component 
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
        {movie.title}
        {movie.director}
        {movie.genre}
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