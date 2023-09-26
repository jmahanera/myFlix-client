import React, { useState } from "react";
import PropTypes from "prop-types";

// The BookCard function component 
export const MovieCard = ({ movie, onMovieClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    onMovieClick(movie);
  };


  return (
    <div>
      <h2>{movie.title}</h2>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre.name}</p>
      <p>
        <strong>Director:</strong> {movie.director.name} (Born: {movie.director.birthyear})
      </p>
      <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
      <img src={movie.imageUrl} alt={movie.title} />
    </div>
  );
};



MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string,
    actors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};