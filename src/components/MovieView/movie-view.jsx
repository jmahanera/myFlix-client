import React from "react";
import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";


export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === movieId);

  if (!movie) {
    return <div>Loading...</div>;  // or display an error message
  }

  const directorName = movie.director ? movie.director.name : "Unknown";
  const genreName = movie.genre ? movie.genre.name : "Unknown";
  const actorsList = movie.actors && movie.actors.length > 0 ? movie.actors.join(", ") : "No actors listed";

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

      {/* Navigate back to the home page */}
      <Link to="/">
        <button className="btn btn-primary" style={{ cursor: "pointer" }}>
          Back
        </button>
      </Link>
    </div>
  );
};
