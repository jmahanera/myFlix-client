import React, { useState } from "react";
import PropTypes from "prop-types";

// The BookCard function component 
export const MovieCard = ({ movie, onMovieClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    onMovieClick(movie);
  };

  // Display genre based on whether it's a string or an object
  let genreDisplay;
  if (typeof movie.genre === 'string') {
    genreDisplay = <p>Genre: {movie.genre}</p>;
  } else if (typeof movie.genre === 'object' && movie.genre.name) {
    genreDisplay = <p>Genre: {movie.genre.name}</p>;
  } else {
    genreDisplay = <p>Genre: Unknown</p>;
  }

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <p>{movie.title}</p>
      {isClicked && (
        <div>
          <p>Description: {movie.description}</p>
          {genreDisplay}
          {movie.actors && (
            <p>Actors: {movie.actors.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ name: PropTypes.string })
    ]),
    actors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
