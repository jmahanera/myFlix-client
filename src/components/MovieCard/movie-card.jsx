import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../MovieView/movie-view";


export const MovieCard = ({ movie, cardClassName }) => {
  return (
    <Card className={`movie-card ${cardClassName}`}>
      <Card.Img variant="top" src={movie.imageUrl} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        {/* Add Link to navigate to movie details page */}
        <Link to={`/movies/${movie.id}`}>
          Click for more Info
        </Link>

      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};
