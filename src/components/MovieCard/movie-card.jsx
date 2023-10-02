import React from "react";
import PropTypes from "prop-types";


// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  const { title, director, genre } = movie;

 return (
    <div onClick={() => onMovieClick()}>
      <h2>Title: {title}</h2>
      <p>Director: {director}</p>
      <p>Genre: {genre}</p>
      
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
