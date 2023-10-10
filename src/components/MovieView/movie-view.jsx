import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import MovieCard from "./movie-card"; 

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  if (!movieId) {
    return <div>No movie ID provided.</div>;
  }

  // Find the specific movie by movieId
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div>No movie found.</div>;
  }

  // Sample similar movies array
  const similarMovies = [
    { id: '1', title: 'Movie A' },
    { id: '2', title: 'Movie B' },
    { id: '3', title: 'Movie C' }
  ];

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

      {/* Display similar movies */}
      <div>
        <span>Similar Movies:</span>
        <ul>
          {similarMovies.map((similarMovie) => (
            <li key={similarMovie.id}>
              <Link to={`/movies/${similarMovie.id}`}>{similarMovie.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
