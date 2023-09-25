import React, { useState } from "react";
import PropTypes from "prop-types";

// The BookCard function component 
export const MovieView = ({ movie, onBackClick }) => {
  const { title, description, genre, director, actor } = movie;

  return (
    <div>
      <h1>{title}</h1>
      <p>Description: {description}</p>
      <p>Genre: {genre}</p>
      <p>Director: {director}</p>
      <p>Actor: {actor}</p>
      <button onClick={onBackClick}>Back to Movie List</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string,
    director: PropTypes.string,
    actor: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};