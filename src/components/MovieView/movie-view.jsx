import React, { useEffect } from "react";  // Ensure useEffect is imported from React

// MovieView component
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
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre.name}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director.name}</span>
        </div>
        <div>
          <span>Biography: </span>
          <span>{movie.director.director_bio}</span>
        </div>
        <div>
          <span>Birthyear: </span>
          <span>{movie.director.birthyear}</span>
        </div>
        <div>
          <span>Actors: </span>
          <span>{movie.actors}</span>
        </div>
        {/* Add other movie details you want to display */}
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
