import React from "react";
import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === movieId);

  return (
    <div>
      {movie ? (
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
        </div>
      ) : (
        <div>No movie found.</div>
      )}

      {/* Always provide a "Back" button */}
      <Link to="/movies">
        <button className="btn btn-primary">Back</button>
      </Link>
    </div>
  );
};
