import React from "react";
import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === movieId);

  return (
    <div>
      {movie && (
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
      )}

      {/* Navigate back to the home page */}
      <Link to="/">
  <button className="btn btn-primary"  style={{ cursor: "pointer" }}>Back</button>
</Link>
    </div>
  );
};
