import React, { useEffect } from "react";
import './movie-view.scss';

export const MovieView = ({ movie, onBackClick, movieViewRef }) => {
  useEffect(() => {
    // Scroll to the top of the movie view
    if (movieViewRef.current) {
      movieViewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [movieViewRef]);

  return (
    <div ref={movieViewRef}>
      <div key={movie.id}>
        <div>
          <img src={movie.imageUrl} alt={movie.title} />
        </div>
        <div>
          <span className="movie-title">Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span className="movie-description">Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span className="movie-genre">Genre: </span>
          <span>{movie.genre.name}</span>
        </div>
        <div>
          <span className="movie-director">Director: </span>
          <span>{movie.director.name}</span>
        </div>
        <div>
          <span className="movie-biography">Biography: </span>
          <span>{movie.director.director_bio}</span>
        </div>
        <div>
          <span className="movie-birthyear">Birthyear: </span>
          <span>{movie.director.birthyear}</span>
        </div>
        <div>
          <span className="movie-actors">Actors: </span>
          <span>{movie.actors}</span>
        </div>
        {/* Add other movie details you want to display */}
      </div>
      <button
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer" }}>
        Back
      </button>
    </div>
  );
};
