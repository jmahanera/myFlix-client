import React from "react";
import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";


export const MovieView = ({ movies }) => {
  console.log("Movies:", movies);  // Add this line to log the movies array
  

  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === movieId);

  if (!movie) {
    return <div>Loading...</div>;  // or display an error message
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
      <div>
        <span>Director: </span>
        <span>{movie.director ? movie.director.name : "Unknown"}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre ? movie.genre.name : "Unknown"}</span>
      </div>
      <div>
        <span>Actors: </span>
        {movie.actors && movie.actors.length > 0 ? (
          <span>{movie.actors.join(", ")}</span>
        ) : (
          <span>No actors listed</span>
        )}
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
