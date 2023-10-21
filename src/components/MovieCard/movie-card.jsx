import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, cardClassName, toggleFavorite }) => {
  const isFavorite = movie.isFavorite || false;

  return (
    <Card className={`movie-card ${cardClassName} h-100`}>
      <Card.Img variant="top" src={movie.imageUrl} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Link to={`/movies/${movie.id}`}>Click for more Info</Link>
        {isFavorite ? (
          <button onClick={() => toggleFavorite(movie.id)}>Remove from Favorites</button>
        ) : (
          <button onClick={() => toggleFavorite(movie.id)}>Add to Favorites</button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    genre: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        cardClassName: PropTypes.string,
        toggleFavorite: PropTypes.func, // Include the toggleFavorite prop
      }),
    ]),
    description: PropTypes.string.isRequired,
    director: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ]),
    actors: PropTypes.arrayOf(PropTypes.string),
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};
