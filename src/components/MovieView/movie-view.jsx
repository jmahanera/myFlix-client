import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  console.log("Received movies prop:", movies);
  console.log("Received movieId:", movieId);

  if (!movieId) {
    console.log("No movie ID provided.");
    return <div>No movie ID provided.</div>;
  }

  // Find the specific movie by movieId
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    console.log("No movie found with ID:", movieId);
    return <div>No movie found.</div>;
  }

  console.log("Selected movie:", movie);

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
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
