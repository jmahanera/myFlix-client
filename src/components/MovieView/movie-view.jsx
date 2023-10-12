import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === movieId);

  if (!movie) {
    return <div>Loading...</div>; // Handle loading state or display an error message
  }

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

      {/* Back button to navigate to the home page */}
      <Link to="/">
        <button className="btn btn-primary">Back</button>
      </Link>
    </div>
  );
};
