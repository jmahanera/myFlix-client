import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movie-view.scss';

const MovieView = ({ movie }) => {
  if (!movie) {
    return <div>Loading...</div>;
  }

  const directorName = movie.director ? movie.director.name : 'Unknown';
  const genreName = movie.genre ? movie.genre.name : 'Unknown';
  const actorsList = movie.actors && movie.actors.length > 0 ? movie.actors.join(', ') : 'No actors listed';

  return (
    <div>
      <div>
        <img className="w-100" src={movie.imageUrl} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{directorName}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{genreName}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>{actorsList}</span>
      </div>

      <Link to="/">
        <button className="btn btn-primary" style={{ cursor: 'pointer' }}>
          Back
        </button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    actors: PropTypes.arrayOf(PropTypes.string),
    imageUrl: PropTypes.string.isRequired,
  }),
};

export default MovieView;
