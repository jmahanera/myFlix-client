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
      <div>
        <img src={movie.image} alt={movie.title} />
        <h3>Title: {movie.title}</h3>
        <p>Director: {movie.director}</p>
        <p>Genre: {movie.genre}</p>
      </div>
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