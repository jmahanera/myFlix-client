import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie, cardClassName }) => {
  return (
    <Card className={`movie-card ${cardClassName} h-100`}>
      <Card.Img variant="top" src={movie.imageUrl} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Link to={`/movies/${movie.id}`}>Click for more Info</Link>
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
  cardClassName: PropTypes.string,
};