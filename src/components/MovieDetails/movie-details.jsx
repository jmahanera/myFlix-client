// MovieDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === movieId);

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      {/* Display other movie details here */}
    </div>
  );
};

export default MovieDetails;
